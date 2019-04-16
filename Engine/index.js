const express = require('express');
const bodyparser = require('body-parser');
const flash = require('connect-flash');
const _request = require("request");
const path = require('path');

const log = require('../Console');
const Displays = require('./Displays');
const Register = require('./Register');
const Database = require('./Database');

class Engine{

    constructor(config){
        this.port = config.http.port;
        this.secret_key = config.http.secret_key;
        this.database = new Database(config);
        this.register = express();
        this.setup();
        this.listen();
    }

    setup(){
        this.register.engine('html', require('ejs').renderFile);
        this.register.set('view engine', 'html'); // reading ejs files 
        this.register.set('views', path.join(__dirname, '../views'));
        this.register.use('/css', express.static(path.join(__dirname, '../views/css')));
        this.register.use('/js', express.static(path.join(__dirname, '../views/js')));
        this.register.use('/colors', express.static(path.join(__dirname, '../views/colors')));
        this.register.use(bodyparser.urlencoded({extended : true}));
        this.register.use(bodyparser.json());
        this.register.use(flash());
        this.register.listen(this.port, () => log.success(`Running the flake registration system on port: ${this.port}!`))
    }

    listen(){
    
        this.register.get('/', (request, response) => {
            response.render('index', new Displays('register').displaySite());
        });

        this.register.post('/', (request, response) => {
            let recaptcha_url = "https://www.google.com/recaptcha/api/siteverify?";
            recaptcha_url += "secret=" + this.secret_key + "&";
            recaptcha_url += "response=" + request.body.recaptcha_response + "&";
            recaptcha_url += "remoteip=" + request.connection.remoteAddress;
            _request(recaptcha_url, (error, resp, body) => {
                let recaptcha = JSON.parse(body);
                if (recaptcha.success){
                    new Register(request, response, this.database)
                }
                else{
                    response.render('index', new Displays('incorrect_captcha').displaySite());
                }
            });
        });
    }
}

module.exports = Engine;