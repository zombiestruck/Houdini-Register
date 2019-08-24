"use strict";

const Base = require('../../Configuration')

class Captcha extends Base{
    constructor(request){
        super();
        this.request = request;
    }

    calculate(recaptcha_url, callback) {
        this._request(recaptcha_url, (err, resp, body) =>{                      
            let recaptcha = JSON.parse(body);
            return callback(recaptcha.success);
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

module.exports = Captcha;