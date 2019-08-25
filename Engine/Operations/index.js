"use strict";

class Operations{
    constructor(){
        this.url_array = [];
        this.collect_urls();
    }

    collect_urls(){
        this.urls = {}
        this.urls[`/`] = 'Register';
        this.urls['/activate/'] = 'Email';

        for(let urls in this.urls){
            this.url_array.push(urls) 
        }
    }
    
    match(request, response, database){
        let url = request._parsedUrl.pathname;
        let email_activation_url = url.slice(0,10); 
        if (this.url_array.includes(email_activation_url))
           return this.find_operation(email_activation_url, request, response, database);
        
        return this.find_operation(url, request, response, database);
    }

    find_operation(url, request, response, database){
        for(let urls in this.urls){
            if(url === urls){             
                let Operation = require(`./${this.urls[urls]}`)
                new Operation(request, response, database).execute();
            }
        }
        return this.handle_urls(url);
    }

    handle_urls(url){
        if(this.url_array.indexOf(url) === -1) 
            return false;
        return true;
    }    
}

module.exports = Operations;