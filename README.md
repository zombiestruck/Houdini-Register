# Flake - A CPPS Registration System. 

A complete registration system, created for Houdini's database structure. 

Note: This register is not quite complete, I have a todo list at the bottom but thought i'd upload this version for whoever is interested in it.

CURRENT FEATURES:

- Functional login, comparing the hash (produced from the password given by the user) to the bcrypt password stored in the database

- Once logged in, user can see their data including ID, username, email, activation, approval status, coins, rank and an image/representation of their penguin and clothes.

- User can change their password, or change email or add an item as a user(if the developer who runs this allows normal users to add items, can be changed by setting ADD_ITEMS: 0, to 1 in Config.js) 

- Unauthorized access (if not logged in or if not a moderator) is prevented. 



The frontend uses bootstrap as a framework.

IN DETAIL: Has some custom CSS styling and custom JS for basic checks from the users end, including: checking whether the user entered 4-12 chars as their username and if it includes any special characters, checks whether the password matches each other and whether it's over 5 chars, checks whether the email is in the correct format (test@test.com), if these fields are not fulfilled then the registration won't process anything in the backend until these are done. It also renders EJS to display a custom success or error message on the page.

The backend is coded all in NodeJS.

IN DETAIL: Using express.js for collecting post requests, using Sequelize for database transcations, many other modules are used for different purposes. The backend will also check whether the username and email already exists, as well as hash passwords in bCRYPT. The register also uses recaptcha v3 to prevent bots, all configurations are in one file (Config.js) and everything is ran from Boot.js. 

This is going to be an open-source manager, this may not be the best manager out there but it's one of my first projects. Feel free to fork or use whatever you need. ~ ro.


Snippet: video coming soon of the whole register but for now: https://gyazo.com/a566e9b04411a28b70c559d63d811d84


# Requirements


Well first of all, you need nodeJS.

Then use npm to install the following dependencies:

    "bcrypt": "^3.0.4",
    "connect-flash": "^0.1.1",
    "ejs": "^2.6.1",
    "express": "^4.16.4",
    "express-session": "^1.15.6",
    "md5": "^2.2.1",
    "mysql2": "^1.6.5",
    "request": "^2.88.0",
    "sequelize": "^4.42.1"

This registration system is not like a PHP one where you just upload the files to /var/www/html and it'll work. You will need to run this off a port, I suggest reverse proxying with nginx, the default port is 3000. 

https://www.linode.com/docs/web-servers/nginx/use-nginx-reverse-proxy/

You also need to configure the details for MySQL in Config.js, you can also change the custom error/success messages in there. This register has been written to use recaptcha v3, so you will have to get your own recaptcha keys from google. Place the secret key in Config.js and the site key in index.html. You will also need a secret/random string for the secret session token in Config.js

https://i.imgur.com/8seD36D.png

Edit Penguin.js and Inventory.js IF you want to change the database structure for something other than Houdini.

Simply execute the register to listen on port 4444 by typing into terminal/PuTTy: `node Boot`

CURRENT TODO:

- Allow administrators to ban users based on username.

- Allow users to update clothing in-game.

- Allow moderators and administrators to verify usernames that haven't been verified yet.

- Maybe, change the design of the frontend.





