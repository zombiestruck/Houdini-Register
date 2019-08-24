const Base = require('../../Configuration');
const Displays = require('../Displays');

class Operations extends Base{
    constructor(request, response, database){
        super();
        this.database = database;
        this.response = response;
        this.request = request;
        this.params = request.params;
        this.url = request._parsedUrl.pathname;
        this.collect_urls();
    }

    collect_urls(){
        this.urls = {}
        this.urls[`/`] = 'Register';
        this.urls[`activate`] = 'Email';
    }
    
    match(){
        if (Object.keys(this.params).length === 0){
            this.find_operation(this.url);
        }
        else{
            this.find_operation('activate');
        }
    }

    find_operation(url){
        for(let urls in this.urls){
            if(url === urls){
                let Operation = require(`./${this.urls[urls]}`)
                new Operation(this.request, this.response, this.database).execute();
            }
        }
    }

    
}

module.exports = Operations;