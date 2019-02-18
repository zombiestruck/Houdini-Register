const express = require('express');
var Create = require('./Registration/Create');
const Pages = require('./Registration/Pages');
const CONFIG = require('./Config');
var BodyParser = require('body-parser');
var Flash = require('connect-flash');
var Request = require("request");
const Register = express();

Register.engine('html', require('ejs').renderFile);
Register.set('view engine', 'html'); // reading ejs files 
Register.use('/css_js', express.static(__dirname + '/views/css_js'));
Register.use(BodyParser.urlencoded({extended : true}));
Register.use(BodyParser.json());
Register.use(Flash());

Register.post('/', async function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    var email = request.body.email;
    var recaptcha_url = "https://www.google.com/recaptcha/api/siteverify?";
    recaptcha_url += "secret=" + CONFIG.CAPTCHA.SECRET_KEY + "&";
    recaptcha_url += "response=" + request.body.recaptcha_response + "&";
    recaptcha_url += "remoteip=" + request.connection.remoteAddress;
    Request(recaptcha_url, function(error, resp, body) { 
    var recaptcha = JSON.parse(body);
    recaptcha.success = true;
    if (recaptcha.success){
        Create.AttemptInsertUser(username, password, email, response);
    }
    else{
        response.render('index', Pages.CaptchaFalse());
    }
});
});

Register.get('/', function(request, response) {
    response.render('index', Pages.Home());
    response.end();
});

Register.listen(CONFIG.HTTP_PORT.CREATE, () => console.log(`RUNNING PROJECT FLAKE ON PORT: ${CONFIG.HTTP_PORT.CREATE}!`));

Create.TestDB()