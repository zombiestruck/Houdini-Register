"use strict"; 

const Database = require('./Database');
const Link = require('./Link');
const Base = require('../Configuration'); 

class Engine extends Base{
    constructor(){
        super().setup_flake();
        this.database = new Database();
        this.database.connect()
        this.listen();
    }

    listen(){
        this.flake.get('/', (request, response) => {
            new Link(request, response, this.database).identify();
        });

        this.flake.post('/(:link)', (request, response) => {
            new Link(request, response, this.database).identify();
        });

        this.flake.get(`/(:link)/(:value)`, (request, response) => {
            new Link(request, response, this.database).identify();
        });
    }
}

module.exports = Engine;