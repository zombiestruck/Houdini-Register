"use strict";

const nodemailer = require("nodemailer");
const log = require('../Console');

const Base = require('../Configuration'); 

class Email extends Base{
    constructor(database) {
        super();
        this.database = database;
    }

    get_activation_setting(){
        return this.activation;
    }

    async handle(user){
        if(this.activation){
            let id = Math.random().toString(26).slice(2);
            await this.send_mail(user, id);
            await this.database.execute('activation', `create`, ({PenguinID: user.ID, ActivationKey: id}));
        }
    }

    async verify_email(id){
        let user = await this.database.execute('activation', `findOne`, {where: {ActivationKey: `${id}`}});
        if(!user){
            return false;
        }
        else{
            let query = JSON.parse(`{"Active":1, "ID":"${user.PenguinID}"}`);
            await this.database.update('penguin', query);
            await this.database.execute('activation', `destroy`, {where: {ActivationKey: `${id}`}});
            return true;
        }
    }

    async send_mail(user, id){
        try{
            let transporter = await nodemailer.createTransport({service: 'Gmail', auth: {user: this.gmail_user, pass: this.gmail_pass}});
            await transporter.sendMail({to: user.Email, subject: `Activate your account for ${this.cpps_name}`, text: `Thank you for registering to ${this.cpps_name}. Please head over to http://${this.sub_domain}/activate/${id} to activate your penguin.`, }); /* Change to a more professional written email if you like */
        }
        catch{
            log.crash(`Flake is unable to connect to GMAIL, here are some potential issues:`)
            log.crash(`1. Incorrect gmail details`)
            log.crash(`2. Less secure apps is not enabled in the security settings of the gmail/google account`)
            log.crash(`Please set activation to 0 until you find a fix`)
        }
    }

}

module.exports = Email;