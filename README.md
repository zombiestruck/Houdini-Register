# Houdini - Register

## Features

 - Basic nodeJS application that handles user registration for [Houdini](/Solero/Houdini)

 - Handles activation via nodemailer

 - Easy setup and configuration.


## Screenshots

<img alt="Screenshot" width="700px" src="https://i.imgur.com/TgRzwdZ.png">

## Setup?

 - install node.js on your VPS or laptop.
 - upload your register somewhere (apart from the web-server of course!), use `cd` to go to the directory wherever it is placed. 
 - Once you are in the directory, you can run `npm install` and it will download all the dependencies you need for this register to work. 
 - Now all you have to do is edit config.js accordingly.
 - Run the register from terminal using the command `node app`. 
 - Party.

 # Requirements

Just execute `npm install` to install the dependencies all at once.

- Register your recaptcha keys from google recaptcha (v3). 

- If you are trying to use this register with the AS3 protocol, then change this line: `salt: AS2_salt,` to `salt: AS3_salt,`. If not, just leave it how it is.

- As this is a nodeJS application, it requires sending and receiving data off a port which we can refer to as a reverse proxy. So in your nginx configuration, underneath the location block you will want to add a `proxy_pass` line instead of having this line `try_files $uri $uri/ =404;`. This is so that any requests made to your sub-domain will use the reverse proxy to send it to the nodeJS application instead of trying to load any static files from your machine. An example of how this may look can be found here:

server {
    listen 80;
    server_name create.houd.ini;
    location / {
		proxy_pass http://localhost:5555/;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;	
    }
}

- Email activation is disabled by default, you can enable it by setting `activation` to `true` in config.js. If you do this, you can use a Gmail account to handle the email sent to the user or you could setup your own mail-servers and configure nodemailer to connect to them instead.



Any issues, just email me: 5@rsakeys.org
