# Flake - A CPPS Registration System. 

A complete registration system, created for Houdini's database structure. 

The frontend uses bootstrap as a framework.

IN DETAIL: Has some custom CSS styling and custom JS for basic checks from the users end, including: checking whether the user entered 4-12 chars as their username and if it includes any special characters, checks whether the password matches each other and whether it's over 5 chars, checks whether the email is in the correct format (test@test.com), if these fields are not fulfilled then the registration won't process anything in the backend until these are done. It also renders EJS to display a custom success or error message on the page.

The backend is coded all in NodeJS.

IN DETAIL: Using express.js for collecting post requests, using Sequelize for database transcations, many other modules are used for different purposes. The backend will also check whether the username and email already exists, as well as hash passwords in bCRYPT. The register also uses recaptcha v3 to prevent bots, all configurations are in one file (Config.js) and everything is ran from Boot.js. 

This is going to be an open-source register, this may not be the best register out there but it's one of my first projects. Feel free to fork or use whatever you need. ~ ro.


Snippet: https://vimeo.com/330657005


# Requirements


Well first of all, you need nodeJS.

Then use npm to install the following dependencies:

    "bcrypt": "^3.0.6",
    "colors": "^1.3.3",
    "connect-flash": "^0.1.1",
    "ejs": "^2.6.1",
    "express": "^4.16.4",
    "md5": "^2.2.1",
    "mysql2": "^1.6.5",
    "request": "^2.88.0",
    "sequelize": "^5.5.0"
    
 
 Install them individually or just run the command `npm install` and it will install all of them for you.

This registration system is not like a PHP one where you just upload the files to /var/www/html and it'll work. You will need to run this off a port, I suggest reverse proxying with nginx, the default port is 4444. 

https://www.linode.com/docs/web-servers/nginx/use-nginx-reverse-proxy/


All configuration is handled within Config.js, so that's the only file you have to edit. Configure the MySQL details in there, you may change the error and success messages if you wish, this register uses recaptcha v3 so you will need to register a site and secret key under whatever domain you are using it for.


Edit /Data/Penguin.js and Register.js IF you want to change the database structure for something other than Houdini.

Simply execute the register to listen on port 4444 by typing into terminal/PuTTy: `node Boot`

LATEST UPDATE: 

 - tidied up code, used classes etc.





