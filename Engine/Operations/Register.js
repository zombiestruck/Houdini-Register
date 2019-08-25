"use strict";


const md5 = require('md5');
const bcrypt = require('bcrypt');

const Base = require('../../Configuration');
const Email = require('./Email');
const Captcha = require('./Captcha');


class Register extends Base{
    constructor(request, response, database){
        super();
        this.response = response;
        this.request = request;
        this.database = database;
        this.captcha = new Captcha(request)
        this.activate_email = new Email(this.request, this.response, this.database);
    }

    async create(){
        this.collect_body_data();
        if(await this.count(`Username`, this.username)){
            let data = this.displays.find('/username_taken');
            return this.response.render(data.page, data.ejs);
        }

        else if(await this.count(`Email`, this.email)){
            let data = this.displays.find('/email_taken');
            return this.response.render(data.page, data.ejs);
        }

        else if(this.bad_names.includes(this.username)){
            let data = this.displays.find('/bad_name');
            return this.response.render(data.page, data.ejs);
        }

        else{
            let password = await this.bcrypt();
            let color = this.penguinColor.replace('/colors/', '');
            await this.database.execute(`penguin`, `create`, ({ID: null, Username: this.username, Nickname: this.username, Approval: this.approval, Password: password, Email: this.email, Active: !this.activation, Color: color}));
            let user = await this.database.execute('penguin', `findOne`, {where: {Email: `${this.email}`}});
            await this.database.execute(`inventory`, `create`, {PenguinID: user.ID, ItemID: color})
            this.activate_email.handle(user) /* No worries, if its set to 0 it WONT send. */
            this.log.success(`User ${this.username} has registered an account just now.`)
            let data = this.displays.find('/success');
            return this.response.render(data.page, data.ejs);
        }
    }

    async count(row, value){
        let user_exist = await this.database.execute('penguin', `count`, {where: {[`${row}`]: [`${value}`]}});
        if (user_exist != 0) 
            return true; 

        return false;  
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

    execute(){
        let recaptcha_url = this.captcha.form_url();
        this.captcha.calculate(recaptcha_url, (response) =>{
            this.handle_response(response);  
        })
    }

    handle_response(response){
        let data = this.displays.find('/captcha');
        if(!response)
            return this.response.render(data.page, data.ejs);

        this.create();
    }

    collect_body_data(){
        for (let body in this.request.body)
            this[body] = this.request.body[body];
    }
}

module.exports = Register;
