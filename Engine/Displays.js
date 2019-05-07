
"use strict"; 

/* This class is used to render different messages on the main page (index.html) */

const config = require('../Config');

class Displays{
    constructor(type){
        this.type = type;
        this.site_key = config.http.site_key
    }

    displaySite(){
        if(this.type == 'register'){
            return {error_msg : '', success_msg: '', site_key: this.site_key}
        }

        if(this.type == 'success'){
            return {error_msg : '', success_msg: 'Congratulations, you have successfully made an account!', site_key: this.site_key}
        }

        if(this.type == 'incorrect_captcha'){
            return {error_msg : 'The captcha detects you are a bot, please try again.', success_msg: '', site_key: this.site_key}
        }

        if(this.type == 'username_taken'){
            return {error_msg : 'This username is already taken, please try another one.', success_msg: '', site_key: this.site_key}
        }

        if(this.type == 'email_taken'){
            return {error_msg : 'This email is already taken, please try another one.', success_msg: '', site_key: this.site_key}
        }
        
        if(this.type == 'bad_name'){
            return {error_msg : 'This username is not allowed, please try another one.', success_msg: '', site_key: this.site_key}
        }
    }
}

module.exports = Displays;
