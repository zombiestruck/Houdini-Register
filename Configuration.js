"use strict";

const request = require("request");
const express = require('express');
const bodyparser = require('body-parser');
const flash = require('connect-flash');
const nodemailer = require("nodemailer");
const path = require('path');
const log = require('./Console');
const displays = require ('./Engine/Displays')
const operations = require ('./Engine/Operations')

class Configuration{
    constructor(){
        this.database_host = 'localhost';
        this.database_username = 'root';  
        this.database_password = ''; /* Enter your database password here */
        this.database_port = 3306;
        this.database_name = 'Houdini';

        this.port = 4444;
        this.site_key = ''; /* Register a pair of keys from google recaptcha (v3) and fill in your site key here */
        this.secret_key = ''; /* Register a pair of keys from google recaptcha (v3) and fill in your secret key here */

        this.activation = 0; /* Set this to 1 if you want to use the activate email feature and fill in the below: */
        this.gmail_user = ''; /* Register a new GMAIL account as the email used to send the reset password link, or change the service from GMAIL to your preference.*/
        this.gmail_pass = ''; /* Enter the GMAIL accounts password here*/
        this.cpps_name = 'Flake'; /* The name of your CPPS that will appear in the activation email */
        this.sub_domain = 'create.flake'; /* The sub-domain that you are using to host the manager, as the link has to be i.e. create.yourcpps.com/activate, if this isn't set properly it'll break the activate account via email feature. It should load from the same subdomain that you use to register i.e. register.cpps.com or create.cpps.com  */
    
        this.approval = 1; /* Change to 0 if you want to approve usernames upon registration */
        this.bad_names = ['Rockhopper', 'fuck'] /* Add mascot names, swear words etc whatever you don't want users to have as a username */
        
        /* Don't touch anything below unless you know what you are doing */

        this.operations = new operations();
        this.displays = new displays(this.site_key);
        this.error = this.displays.find('/error');;
        this.log = log;
        this.nodemailer = nodemailer;
        this._request = request;
    }

    setup_flake(){
        this.flake = express();
        this.flake.engine('html', require('ejs').renderFile);
        this.flake.set('view engine', 'html'); 
        this.flake.set('views', path.join(__dirname, './views')); /* Change directories if necessary for loading frontend */
        this.flake.use('/css', express.static(path.join(__dirname, './views/css'))); /* Change directories if necessary for loading frontend */
        this.flake.use('/js', express.static(path.join(__dirname, './views/js'))); /* Change directories if necessary for loading frontend */
        this.flake.use('/colors', express.static(path.join(__dirname, './views/colors'))); /* Change directories if necessary for loading frontend */
        this.flake.use(bodyparser.urlencoded({extended : true}));
        this.flake.use(bodyparser.json());
        this.flake.use(flash());
        this.flake.listen(this.port, () => this.log.success(`Running your flake registration system on port: ${this.port}!`))
    }
}


module.exports = Configuration;