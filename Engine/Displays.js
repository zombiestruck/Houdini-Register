"use strict";

class Displays{
    constructor(site_key){
        this.site_key = site_key;
        this.collect_urls();
        this.collect_pages();
    }

    collect_urls(){
        this.ejs = {}
        this.ejs[`/`] = {success_msg: '', error_msg: '', site_key: this.site_key}
        this.ejs[`/error`] = {success_msg: '', error_msg: 'Oops, something went wrong. Please try again.', site_key: this.site_key}
        this.ejs[`/captcha`] = {success_msg: '', error_msg: 'Your captcha score was low. Please try again.', site_key: this.site_key}
        this.ejs[`/username_taken`] = {success_msg: '', error_msg: 'This username is taken. Please try a different one.', site_key: this.site_key}
        this.ejs[`/email_taken`] = {success_msg: '', error_msg: 'This email is already registered. Please try a different one.', site_key: this.site_key}
        this.ejs[`/bad_name`] = {success_msg: '', error_msg: 'This name is not allowed. Please try a different one', site_key: this.site_key}
        this.ejs[`/success`] = {success_msg: 'Congratulations, you have successfully registered.', error_msg: '', site_key: this.site_key}
        this.ejs[`/activated`] = {success_msg: 'Congratulations, you have successfully activated your account.', error_msg: '', site_key: this.site_key}
        this.ejs[`/link_not_found`] = {success_msg: '', error_msg: 'This activation link was not found within our systems.', site_key: this.site_key}
    }
    
    collect_pages(){
        this.pages = {}
        this.pages[`/`] = 'index';
        this.pages[`/error`] = 'index';
        this.pages[`/captcha`] = 'index';
        this.pages[`/username_taken`] = 'index';
        this.pages[`/email_taken`] = 'index';
        this.pages[`/bad_name`] = `index`;
        this.pages[`/success`] = `index`;
        this.pages[`/activated`] = `index`;
        this.pages[`/link_not_found`] = `index`;
    }

    find(link){
        let response = {};
        for(let urls in this.ejs){
            if(link === urls)
                response.ejs = this.ejs[urls];
        }
        for(let urls in this.pages){
            if(link === urls)
                response.page = this.pages[urls]
        }
        return response;
    }

    
}

module.exports = Displays;