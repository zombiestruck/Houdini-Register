"use strict";

const Displays = require('./Displays');

const md5 = require('md5');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

class Register{
    constructor(details, response, engine){
        this.id = details.params.id;
        this.username = details.body.username;
        this.password = details.body.password;
        this.email = details.body.email;
        this.color = details.body.penguinColor;
        this.database = engine.database;
        this.activation = engine.activation;
        this.gmail_user = engine.gmail_user;
        this.gmail_pass = engine.gmail_pass;
        this.cpps_name = engine.cpps_name;
        this.sub_domain = engine.sub_domain;
        this.approval = 1; /* Change to 0 if you want to approve usernames upon registration */
        this.badNames = ['Rockhopper', 'fuck'] /* Add mascot names, swear words etc whatever you don't want users to have as a username */
        this.response = response;
    }

    async createUser(){
        if(await this.checkRow(`Username`, this.username)){
            this.response.render('index', new Displays('username_taken').displaySite());
        }

        else if(await this.checkRow(`Email`, this.email)){
            this.response.render('index', new Displays('email_taken').displaySite());
        }
        
        else if(this.badNames.includes(this.username)){
            this.response.render('index', new Displays('bad_name').displaySite());
        }

        else{
            let password = await this.bcrypt();
            this.color = this.color.replace('/colors/', '');
            await this.database.penguin.create({ID: null, Username: this.username, Nickname: this.username, Approval: this.approval, Password: password, Email: this.email, Active: !this.activation, Color: this.color});
            let user = await this.database.penguin.findOne({where: {Username: this.username}});
            this.handleActivation(user);
            await this.database.inventory.create({PenguinID: user.ID, ItemID: this.color});
            this.response.render('index', new Displays('success').displaySite());
        }
    }

    async handleActivation(user){
        if(this.activation == 1){
            let id = Math.random().toString(26).slice(2);
            let transporter = nodemailer.createTransport({service: 'Gmail', auth: {user: this.gmail_user, pass: this.gmail_pass}});
            await transporter.sendMail({to: this.email, subject: `Activate your account for ${this.cpps_name}`, text: `Thank you for registering to ${this.cpps_name}. Please head over to http://${this.sub_domain}/activate/${id} to activate your penguin.`, }); /* Change to a more professional written email if you like */
            await this.database.activation.create({PenguinID: user.ID, ActivationKey: id});
        }
    }

    async activateUser(){
        let user = await this.database.activation.findOne({where: {ActivationKey: this.id}});
        if(user){
            await this.database.penguin.update({Active: 1}, {where: {ID: user.PenguinID}});
            await this.database.activation.destroy({where: {ActivationKey: this.id}});
            this.response.render('success', new Displays('activated').displaySite());
        }
        else{
            this.response.render('success', new Displays('not_found').displaySite());
        }
    }


    async checkRow(row, value){
        let userCount = await this.database.penguin.count({ where: {[`${row}`]: [`${value}`]} });
        if (userCount != 0){ 
            return true; 
        }
        else{
            return false;  
        }
    }

    async bcrypt(){
        let MD5 = md5(this.password).toUpperCase(); 
        let password = MD5.substr(16, 16) + MD5.substr(0, 16);  
        password += 'houdini'; 
        password += 'Y(02.>\'H}t":E1';
        password = md5(password);
        password = password.substr(16, 16) + password.substr(0, 16);
        let bcrypt_pw = await bcrypt.hash(password, 12);
        return bcrypt_pw;
    }
}

module.exports = Register;
