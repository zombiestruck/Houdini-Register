# Flake - A register for Houdini

NOTE: Credit to Kevin, for the colour picker feature from his PHP register in Sweater.

written by ~ ro, feel free to fork or use whatever code/assets you want from this.


screenshot: https://imgur.com/a/dBGnIH6

# How to use?


 - install node.js on your VPS or laptop.
 - upload your register somewhere (apart from the web-server of course!), use `cd` to go to the directory wherever it is placed. 
 - Once you are in the directory, you can run `npm install` and it will download all the dependencies you need for this register to work. 
 - Now all you have to do is edit Configuration.js.
 - Run the register from terminal using the command `node Boot`. 
 - Party.


# Requirements

Just execute `npm install` to install the dependencies all at once.

- The only file you have to edit is Configuration.js, leave everything else to be otherwise it's going to become a bit complicated.

- Register your recaptcha keys from google recaptcha (v3). Add your site and secret key here: https://imgur.com/a/RwVCvh1

- If you are trying to use this register with the AS3 protocol, then change this line: `this.salt = this.AS2_SALT;` to `this.salt = this.AS3_SALT;`. If not, just leave it how it is.

- When running this register, you need your sub-domain to be reverse proxying off port 4444 so that you can visit your registration link directly, instead of having :4444 added at the end of it. So edit your nginx configuration, add this line `proxy_pass http://localhost:4444/;`. Make sure the default placed line `try_files $uri $uri/ =404;` is removed. You can find a similar alternative for apache too. If you choose to not reverse proxy, you will have to visit the link via subdomain:4444 (adding :3000 on the end of the URL). This is not recommended, although is still possible. Make sure you keep your panel files away from your web-server, which means DON'T put them in /var/www/html or /var/www.

- Optional email activation, you can ignore it and let it not work by leaving activation to 0 in Configuration.js. But for it to work, you will need to set activation to 1, you need to be willing to give a working gmail account, probably one dedicated to the CPPS. You then need to fill out the following details below: https://snag.gy/PiWmxs.jpg. If done correctly, with no error showing in terminal it should send an activation email looking like this: https://snag.gy/P3a8QG.jpg.



Any issues or suggestions, just email me: 5@rsakeys.org






