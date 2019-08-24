"use strict";

const Base = require('../Configuration')

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
        if(Object.keys(data).length === 0)
            return this.handle_link();
        
        this.response.render(data.page, data.ejs);
        
    }

    handle_link(){
        let data = this.displays.find('/error');
        if(Object.keys(this.params).length === 0)
            return this.response.render(data.page, data.ejs);
        
        this.operations.match(this.request, this.response, this.database);
        
    }


    identify(){
        if(this.request.method === 'GET'){
            let data = this.displays.find(this.url);
            this.handle_response(data);
        }

        else if (this.request.method === 'POST'){
            this.operations.match(this.request, this.response, this.database);
        }

        else{
            let data = new Displays('/error').find();
            this.response.render(data.page, data.ejs);
        }
    }


    find_url(){
        for(let urls in this.urls){
            if(this.url === urls)
                return this[`${this.urls[urls]}`]();
        }
    }
    

}

module.exports = Links;
