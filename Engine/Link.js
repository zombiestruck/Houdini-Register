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

    identify(){ 
        if(this.request.method === 'GET'){
            let display = this.handle_response();
            this.handle(display);
        }

        else if (this.request.method === 'POST'){
            let operation = this.operations.match(this.request, this.response, this.database);
            this.handle(operation);
        }

        else{
            let method = false;
            this.handle(method);
        }
    }

    handle_response(){
        let data = this.displays.find(this.url);
        if(Object.keys(data).length === 0)
            return this.operations.match(this.request, this.response, this.database);

        this.response.render(data.page, data.ejs);  
        return true;
    }

    handle(action){
        if(!action)
            return this.response.render(this.error.page, this.error.ejs); 
        return;
    }
}

module.exports = Links;
