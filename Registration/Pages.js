const CONFIG = require('../Config');

exports.Home = function(){
    return { error_msg : '', success_msg: '' };
}

exports.UsernameTaken = function(){
    return { error_msg : CONFIG.ERROR_MSGS.USERNAME_TAKEN, success_msg: '' };
}

exports.EmailTaken = function(){
    return { error_msg : CONFIG.ERROR_MSGS.EMAIL_TAKEN, success_msg: '' };
}

exports.CaptchaFalse = function(){
    return { error_msg : CONFIG.ERROR_MSGS.CAPTCHA, success_msg: '' };
}

exports.Success = function(){
    return { success_msg : CONFIG.SUCCESS.COMPLETE, error_msg : '' };
}

exports.Error = function(){
    return { error_msg : CONFIG.ERROR_MSGS.ERROR, success_msg: '' };
}

