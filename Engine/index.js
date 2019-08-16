"use strict"; 

const express = require('express');
const bodyparser = require('body-parser');
const flash = require('connect-flash');
const path = require('path');

const log = require('../Console');
const Database = require('./Database');
const Register = require('./Register');
const Base = require('../Configuration'); 

class Engine extends Base{
    constructor(){
        super();
        this.database = new Database();
        this.database.connect()
        this.flake = express();
        this.setup();
        this.listen();
    }

    setup(){
        this.flake.engine('html', require('ejs').renderFile);
        this.flake.set('view engine', 'html'); // reading ejs files 
        this.flake.set('views', path.join(__dirname, '../views'));
        this.flake.use('/css', express.static(path.join(__dirname, '../views/css')));
        this.flake.use('/js', express.static(path.join(__dirname, '../views/js')));
        this.flake.use('/colors', express.static(path.join(__dirname, '../views/colors')));
        this.flake.use(bodyparser.urlencoded({extended : true}));
        this.flake.use(bodyparser.json());
        this.flake.use(flash());
        this.flake.listen(this.port, () => log.success(`Running your flake registration system on port: ${this.port}!`))
    }

    listen(){

        this.flake.get('/', (request, response) => {
            new Register(request, response, this.database).identify();
        });

        this.flake.post('/', (request, response) => {
            new Register(request, response, this.database).identify();
        });

        this.flake.get(`/(:link)`, async (request, response) => {
            new Register(request, response, this.database).identify();
        });

        this.flake.get(`/(:link)/(:value)`, async (request, response) => {
            new Register(request, response, this.database).identify();
        });
    }
}

module.exports = Engine;