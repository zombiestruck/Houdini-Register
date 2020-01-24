AS2_salt = 'Y(02.>\'H}t":E1',
AS3_salt = `a1ebe00441f5aecb185d0ec178ca2305Y(02.>'H}t\":E1_root`,

config = {
    site_key: '', /* Remember, google recaptcha v3 keys please! */
    secret_key: '',
    port: 5555,
    approval: true, /* Accounts will be approved upon registration */
    activation: false, /* Activation WONT be in use, the user can login straight away */
    salt: AS2_salt, // Change to AS3_salt if you are using the AS3 client.

    database: {
        host: '127.0.0.1',
        port: 3306, 
        username: 'root',
        password: '',
        name: 'Houdini',
        dialect: 'mysql' /* If you are using mariadb, just change this to mariadb and install the npm package for it. */
    },
    cpps_name: 'Club Penguin', // The name of your CPPS
    subdomain: 'register.clubpenguin.com', // The sub-domain you are using to load this register i.e. create.rsakeys.org
    gmail_user: '',
    gmail_pass: '' /* Enter your Gmail details and set less secure apps on. */

    /* Or... you can setup your own mail-servers and configure nodemailer to use them. */ 
}

module.exports = config