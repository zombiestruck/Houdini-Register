"use strict";

const Base = require('../Configuration')
const Operations = require('./Operations')


class Links extends Base{
    constructor(request, response, database){
        super();
        this.params = request.params;
        this.url = request._parsedUrl.pathname
        this.database = database;
        this.response = response;
        this.request = request;
    }


    handle_response(data){
        if(Object.keys(data).length === 0){
            this.handle_link();
        }
        else{
            this.response.render(data.page, data.ejs);
        }
    }

    handle_link(){
        if(Object.keys(this.params).length === 0){
            let data = this.displays.find('/error');
            this.response.render(data.page, data.ejs);
        }
        else{
            new Operations(this.request, this.response, this.database).match();
        }
    }


    identify(){
        if(this.request.method === 'GET'){
            console.log(this.url)
            let data = this.displays.find(this.url);
            this.handle_response(data);
        }

        else if (this.request.method === 'POST'){
            new Operations(this.request, this.response, this.database).match();
        }

        else{
            let data = new Displays('/error').find();
            this.response.render(data.page, data.ejs);
        }
    }


    find_url(){
        for(let urls in this.urls){
            if(this.url === urls)
                this[`${this.urls[urls]}`]();
        }
    }
    

}

module.exports = Links;
