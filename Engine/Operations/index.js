"use strict";


class Operations{
    constructor(){
        this.collect_urls();
    }

    collect_urls(){
        this.urls = {}
        this.urls[`/`] = 'Register';
        this.urls[`activate`] = 'Email';
    }
    
    match(request, response, database){
        let url = request._parsedUrl.pathname;
        let params = request.params;
        if (Object.keys(params).length === 0)
            return this.find_operation(url, request, response, database);
        
        this.find_operation('activate', request, response, database);
    }

    find_operation(url, request, response, database){
        for(let urls in this.urls){
            if(url === urls){                
                let Operation = require(`./${this.urls[urls]}`)
                new Operation(request, response, database).execute();
            }
        }
    }

    
}

module.exports = Operations;