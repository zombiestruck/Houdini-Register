const Pages = require('./Pages');
const Sequelize = require('sequelize'); 
const Op = Sequelize.Op;
let DatabaseConnection = require('./DatabaseCon');  
let Database = DatabaseConnection.Database;
var Account = DatabaseConnection.Account;
var md5 = require('md5');
var bcrypt = require('bcrypt');

exports.TestDB = async function (){
    try{
        await Database.authenticate();
        console.error('Succesfully connected to the database!');
    }
    catch(e){
        console.error('Check your database details, unable to connect!');
    }
}

exports.AttemptInsertUser = async function(username, password, email, response){
    if (!await UsernameExists(username)){ 
        if (!await EmailExists(email)){ 
            var DBPassword = await CreatePassword(password);
            try{
                await Account.create({ID: null, Username: username, Nickname: username, Approval: 1, Password: DBPassword, Email: email, Active: 1, Color: 1})
                response.render('index', Pages.Success());
            }
            catch(e){
                console.log(e);
            }
        }
        else{
            response.render('index', Pages.EmailTaken());
        }
    }
    else{
        response.render('index', Pages.UsernameTaken());
    }
}


async function CreatePassword(password){
    var MD5Password = md5(password).toUpperCase(); 
    var hash = MD5Password.substr(16, 16) + MD5Password.substr(0, 16);  
    hash += 'houdini'; 
    hash += 'Y(02.>\'H}t":E1';
    hash = md5(hash);
    hash = hash.substr(16, 16) + hash.substr(0, 16);
    finalPw = await bcrypt.hash(hash, 12);
    return finalPw
}



async function UsernameExists(username){ 
    var userCount = await Account.count({ where: {'Username': {[Op.eq]:username}} });
        if (userCount != 0){ 
            return true; 
        }
        else{
            return false;  
        }
    }


async function EmailExists(email){ 
    var emailCount = await Account.count({ where: {'Email': {[Op.eq]:email}} });
        if (emailCount != 0){ 
            return true; 
        }
        else{
            return false;  
        }
    }



