"use strict";

const Displays = require('./Displays');

const md5 = require('md5');
const bcrypt = require('bcrypt');

class Register{
    constructor(details, response, database){
        this.username = details.body.username;
        this.password = details.body.password;
        this.email = details.body.email;
        this.color = details.body.penguinColor;
        this.response = response;
        this.database = database;
        this.createUser();
    }

    async createUser(){
        if(await this.checkRow(`Username`, this.username)){
            this.response.render('index', new Displays('username_taken').displaySite());
        }

        else if(await this.checkRow(`Email`, this.email)){
            this.response.render('index', new Displays('email_taken').displaySite());
        }

        else{
            let password = await this.bcrypt();
            this.color = this.color.replace('/colors/', '');
            await this.database.penguin.create({ID: null, Username: this.username, Nickname: this.username, Approval: 1, Password: password, Email: this.email, Active: 1, Color: this.color});
            this.response.render('index', new Displays('success').displaySite());
        }
    }

    async bcrypt(){
        let MD5 = md5(this.password).toUpperCase(); 
        let password = MD5.substr(16, 16) + MD5.substr(0, 16);  
        password += 'houdini'; 
        password += 'Y(02.>\'H}t":E1';
        password = md5(password);
        password = password.substr(16, 16) + password.substr(0, 16);
        let bcryptPassword = await bcrypt.hash(password, 12);
        return bcryptPassword;
    }


    async checkRow(row, value){
        var userCount = await this.database.penguin.count({ where: {[`${row}`]: [`${value}`]} });
        if (userCount != 0){ 
            return true; 
        }
        else{
            return false;  
        }
    }
}

module.exports = Register;