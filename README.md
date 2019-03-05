
# Flake - A CPPS Registration System

A complete register system, created for Houdini's database structure. 

The frontend uses bootstrap as a framework.

IN DETAIL: Has some custom CSS styling and custom JS for basic checks from the users end, including: checking whether the user entered any special characters, checks whether the password matches each other and whether it's over 5 chars, checks whether the email is in the correct format (test@test.com), if these fields are not fulfilled then the registration won't process anything in the backend until these are done. It also renders EJS to display a custom success or error message on the page.

The backend is coded all in NodeJS.
    "request": "^2.88.0",
    "sequelize": "^4.42.0"

This registration system is not like a PHP one where you just upload the files to /var/www/html and it'll work. You will need to run this off a port, I suggest reverse proxying with nginx, the default port is 4444. 

https://www.linode.com/docs/web-servers/nginx/use-nginx-reverse-proxy/

You also need to configure the details for MySQL in Config.js, you can also change the custom error/success messages in there. This register has been written to use recaptcha v3, so you will have to get your own recaptcha keys from google. Place the secret key in Config.js and the site key in index.html.


https://i.imgur.com/8seD36D.png

Edit Structure.js and Create.js IF you want to change the database structure for something other than Houdini.

If you are using a different dialect, for example mariadb then you should change that in DatabaseCon.js instead of the default mysql.

Simply execute the register to listen on port 4444 by typing into terminal/PuTTy: `node Boot`





