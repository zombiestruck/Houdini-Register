"use strict";
const request = require("request");

class Configuration{
    constructor(){
        this.mysql();
        this.http();
        this.email_verification();
    }

    mysql(){
        this.database_host = 'localhost';
        this.database_username = 'root';
        this.database_password = '';
        this.database_port = 3306;
        this.database_name = 'Houdini';
    }

    http(){
        this.port = 4444;
        this.site_key = '';
        this.secret_key = '';
        this._request = request;
    }

    email_verification(){
        this.activation = 0; /* Set this to 1 if you want to use the activate email feature and fill in the below: */
        this.gmail_user = ''; /* Register a new GMAIL account as the email used to send the reset password link, or change the service from GMAIL to your preference.*/
        this.gmail_pass = ''; /* Enter the GMAIL accounts password here*/
        this.cpps_name = 'Flake'; /* The name of your CPPS that will appear in the activation email */
        this.sub_domain = 'create.flake'; /* The sub-domain that you are using to host the manager, as the link has to be i.e. create.yourcpps.com/activate, if this isn't set properly it'll break the activate account via email feature. It should load from the same subdomain that you use to register i.e. register.cpps.com or create.cpps.com  */
    }
}


module.exports = Configuration;