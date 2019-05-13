# Flake - A register written in NodeJS for Houdini

A complete registration system, created for Houdini's database structure. 



The frontend uses bootstrap as a framework. It has some custom css styling and custom javascript for basic checks from the users end, including: checking whether the user entered 4-12 chars as their username and if it includes any special characters, checks whether the password matches each other and whether it's over 5 chars, checks whether the email is in the correct format (test@test.com), if these fields are not fulfilled then the registration won't process anything in the backend until these are done. It also renders EJS to display a custom success or error message on the page.The backend is coded all in NodeJS. it's using express.js for collecting post requests, using Sequelize for database transcations, many other modules are used for different purposes. The backend will also check whether the username and email already exists, as well as hash passwords in bCRYPT. The register also uses recaptcha v3 to prevent bots, all configurations are in one file (Config.js) and everything is ran from Boot.js. 

NOTE: Credit to Kevin, for the colour picker feature from his PHP register in Sweater.

written by ~ ro, feel free to fork or use whatever code/assets you want from this.


preview: https://vimeo.com/330657005

# How to use?


 - install node.js on your VPS or laptop.
 - upload your register somewhere (apart from the web-server of course!), use `cd` to go to the directory wherever it is placed. 
 - Once you are in the directory, you can run `npm install` and it will download all the dependencies you need for this register to work. 
 - Now all you have to do is edit Config.js.
 - Run the manager from terminal using the command `node Boot`. 
 - Party.


# Requirements


Well first of all, you need nodeJS.

Then just execute `npm install` to install the dependencies all at once.

    "bcrypt": "^3.0.6",
    "colors": "^1.3.3",
    "connect-flash": "^0.1.1",
    "ejs": "^2.6.1",
    "express": "^4.16.4",
    "md5": "^2.2.1",
    "mysql2": "^1.6.5",
    "request": "^2.88.0",
    "sequelize": "^5.5.0"
    
- The only file you have to edit is Config.js, what you need to edit in there is your MySQL details.

- Register your recaptcha keys from google recaptcha (v3). Add your site and secret key here: https://i.imgur.com/MBq4Oxm.png

- When running this on your site, you need your sub-domain to be proxying off port 4444 (or whatever port you set in Config.js). So edit your nginx or apache configuration, add this line `proxy_pass http://localhost:3000/;`. This might be helpful: https://www.linode.com/docs/web-servers/nginx/use-nginx-reverse-proxy/

LATEST UPDATE: 

 - Users may choose their penguins colour upon registration.





