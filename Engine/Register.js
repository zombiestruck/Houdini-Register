"use strict";


const md5 = require('md5');
const bcrypt = require('bcrypt');
const log = require('../Console');

const Email = require('./Email');
const Base = require('../Configuration')

class Register extends Base{
    constructor(request, response, database){
        super();
        this.params = request.params;
        this.url = request._parsedUrl.pathname
        this.database = database;
        this.approval = 1; /* Change to 0 if you want to approve usernames upon registration */
        this.bad_names = ['Rockhopper', 'fuck'] /* Add mascot names, swear words etc whatever you don't want users to have as a username */
        this.response = response;
        this.request = request;
        this.activate_email = new Email(database);
        this.collection_of_urls();
    }

    async handle_params(){
        if(this.params.value && this.identify_activation_url()){
            let verification = await this.activate_email.verify_email(this.params.value)
            this.handle_verification(verification)
        }
        else{
            this.response.render('index', this.displays('Oops, something went wrong. Please try again.', ''));
        }
    }

    async handle_registration(){
        if(await this.count(`Username`, this.username)){
            this.response.render('index', this.displays('This username has been taken.', ''));
        }

        else if(await this.count(`Email`, this.email)){
            this.response.render('index', this.displays('This email is already registered within our systems.', ''));
        }

        else if(this.bad_names.includes(this.username)){
            this.response.render('index', this.displays('This name is not available for registration.', ''));
        }

        else{
            let password = await this.bcrypt();
            let color = this.penguinColor.replace('/colors/', '');
            let activation = this.activate_email.get_activation_setting();
            await this.database.execute(`penguin`, `create`, ({ID: null, Username: this.username, Nickname: this.username, Approval: this.approval, Password: password, Email: this.email, Active: !this.activation, Color: color}));
            let user = await this.database.execute('penguin', `findOne`, {where: {Email: `${this.email}`}});
            await this.database.execute(`inventory`, `create`, {PenguinID: user.ID, ItemID: this.color})
            this.activate_email.handle(user) /* No worries, if its set to 0 it WONT send. */
            this.response.render('index', this.displays('', 'Congratulations, you have successfully made an account'));
            log.success(`User ${this.username} has registered an account just now.`)
            /* this.response.redirect('/change-and-uncomment-me') */
        }
    }

    async count(row, value){
        let user_exist = await this.database.execute('penguin', `count`, {where: {[`${row}`]: [`${value}`]}});
        if (user_exist != 0){ 
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

    collection_of_urls(){
        this.urls = {}
        this.urls[`/`] = 'handle_create';
    }

    displays(error, success){
        return {error_msg : error, success_msg: success, site_key: this.site_key}
    }

    collect_body_data(){
        for (let body in this.request.body){
            this[body] = this.request.body[body];
        }
    }
    

    identify(){
        if(Object.keys(this.params).length === 0){
            this.handle_url();
        }
        else{
            this.handle_params();
        }
    }

    handle_url(){
        for(let urls in this.urls){
            if(this.url === urls){
                this[`${this.urls[urls]}`]();
            }
        }
    }

    identify_activation_url(){
        let url = this.url.slice(0, 10)
        if(url == '/activate/'){
            return true;
        }
    }

    handle_verification(verification){
        if(verification){
            this.response.render('index', this.displays('', 'Your penguin is now activated!'));
        }
        else{
            this.response.render('index', this.displays('Oops, something went wrong. Please contact an administrator', ''));
        }
    }

    handle_create(){
        if(this.request.method === 'GET'){
            this.response.render('index', this.displays('', ''));
        }
        else if (this.request.method === 'POST'){
            this.handle_captcha();
        }
        else{
            this.response.render('index', this.displays('Oops, something went wrong. Please try again.', ''));
        }
    }

    handle_captcha(){
        let recaptcha_url = this.form_url();
        this._request(recaptcha_url, (error, resp, body) => {
            let recaptcha = JSON.parse(body);
            if (recaptcha.success){
                log.success('A user is trying to make an account.')
                this.collect_body_data();
                this.handle_registration();
            }
            else{
                this.response.render('index', this.displays('Captcha score is low, please try again.', ''));
            }
        });
    }

    form_url(){
        let ip = (this.request.headers["X-Forwarded-For"] || this.request.headers["x-forwarded-for"] || '').split(',')[0] || this.request.client.remoteAddress;
        let recaptcha_url = "https://www.google.com/recaptcha/api/siteverify?";
        recaptcha_url += "secret=" + this.secret_key + "&";
        recaptcha_url += "response=" + this.request.body.recaptcha_response + "&";
        recaptcha_url += "remoteip=" + ip;
        return recaptcha_url;
    }
}

module.exports = Register;
