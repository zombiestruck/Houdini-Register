const configuration = {
    mysql: {
        host: 'localhost',
        username: '',
        password: '',
        port: 3306,
        database: 'Houdini'
    },
    http: {
        port: 4444,
        site_key: '',
        secret_key: ''
    },

    activation: {
        activate: 0, /* Set this to 1 if you want to use the activate email feature and fill in the below: */
        gmail_user: '', /* Register a new GMAIL account as the email used to send the reset password link, or change the service from GMAIL to your preference.*/
        gmail_pass: '', /* Enter the GMAIL accounts password here*/
        cpps_name: 'Flake', /* The name of your CPPS that will appear in the activation email */
        sub_domain: 'create.flake' /* The sub-domain that you are using to host the manager, as the link has to be i.e. create.yourcpps.com/activate, if this isn't set properly it'll break the activate account via email feature. It should load from the same subdomain that you use to register i.e. register.cpps.com or create.cpps.com  */
    }
};

   
module.exports = configuration;
