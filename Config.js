const CONFIG = {
    HTTP_PORT: {
      CREATE: 4444
    },
    MYSQL: {
        HOST: 'localhost',
        USER: '',
        PASS: '',
        PORT: 3306,
        DATABASE: 'Houdini'
    },
    ERROR_MSGS: {
        USERNAME_TAKEN: 'This username has already been taken, please choose another!',
        EMAIL_TAKEN: 'This email is already in use!',
        CAPTCHA: 'The captcha detects that you may be a bot!',
        ERROR: 'Something went wrong during this registration!' // change custom messages if you want
    },
    SUCCESS: {
        COMPLETE: 'You have successfully registered!'
    },
    CAPTCHA: {
        SECRET_KEY: '' // register secret key at google recaptcha (v3)
    }
};


   
module.exports = CONFIG;
