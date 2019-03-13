const CONFIG = require('../Config');

exports.Home = function(){
    return { error_msg : '', success_msg: '', site_key: CONFIG.CAPTCHA.SITE_KEY };
}

exports.UsernameTaken = function(){
    return { error_msg : CONFIG.ERROR_MSGS.USERNAME_TAKEN, success_msg: '', site_key: CONFIG.CAPTCHA.SITE_KEY };
}

exports.EmailTaken = function(){
    return { error_msg : CONFIG.ERROR_MSGS.EMAIL_TAKEN, success_msg: '', site_key: CONFIG.CAPTCHA.SITE_KEY };
}

exports.CaptchaFalse = function(){
    return { error_msg : CONFIG.ERROR_MSGS.CAPTCHA, success_msg: '', site_key: CONFIG.CAPTCHA.SITE_KEY };
}

exports.Success = function(){
    return { success_msg : CONFIG.SUCCESS.COMPLETE, error_msg : '', site_key: CONFIG.CAPTCHA.SITE_KEY };
}

exports.Error = function(){
    return { error_msg : CONFIG.ERROR_MSGS.ERROR, success_msg: '', site_key: CONFIG.CAPTCHA.SITE_KEY };
}

