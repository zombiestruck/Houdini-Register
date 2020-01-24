const express = require('express')
const sequelize = require('sequelize')
const ejs = require('ejs')
const body_parser = require('body-parser')
const path = require('path')
const request = require('request-promise')
const { createHash } = require('crypto')
const bcrypt = require('bcryptjs')
const helmet = require('helmet')
const nodemailer = require('nodemailer')
const config = require('./config')
const app = express()

const nodemailer_transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: config.gmail_user, 
        pass: config.gmail_pass
    }
})

const database = new sequelize({
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.name,
    dialect: config.database.dialect,
    logging: false,
    define: {
        timestamps: false,
        freezeTableName: true
    }
})

const penguin = database.import('./tables/penguin.js')
const inventory = database.import('./tables/inventory.js')
const activation = database.import('./tables/activation.js')

app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, './web'))
app.use('/css', express.static(path.join(__dirname, './web/css')))
app.use('/js', express.static(path.join(__dirname, './web/js')))
app.use('/colors', express.static(path.join(__dirname, './web/colors')))
app.use('/img', express.static(path.join(__dirname, './web/img')))
app.use(body_parser.urlencoded({extended : true}))
app.use(helmet())

app.get('/', (request, response) =>{
    response.render('create.html', {
        success_message : '',
        error_message: '',
        site_key: config.site_key
    }) 
})

app.post('/', async (request, response) =>{
    try{
        const username_given = request.body.username
        const email_given = request.body.email 
        const password_given = request.body.password
        const color_given = request.body.penguin_color
        const client_ip = get_ip(request)
        const recaptcha_response = request.body.recaptcha_response
        const recaptcha_url = form_recaptcha_url(recaptcha_response, client_ip)
        warn(`${username_given} is trying to create an account.`)
        if(!await recaptcha_test(recaptcha_url)){ 
            response.render('create.html', {
                success_message: '',
                error_message: 'Your captcha score is low (perhaps you are a robot?), please try again.',
                site_key: config.site_key                
            })
        }

        else if(await username_taken(username_given)){
            response.render('create.html', {
                success_message: '',
                error_message: `The username you entered (${username_given}) is already registered within our systems.`,
                site_key: config.site_key
            })
        }
    
        else if(await email_taken(email_given)){
            response.render('create.html', {
                success_message: '',
                error_message: `The email you entered (${email_given}) is already registered within our systems.`,
                site_key: config.site_key
            })
        }

        else{
            success(`creating user ${username_given}`)
            const password = await generate_bcrypt_password(password_given)
            const color = color_given.replace('/colors/', '')
            await penguin.create({ID: null, 
                Username: username_given, 
                Nickname: username_given, 
                Approval: config.approval, 
                Password: password, 
                Email: email_given, 
                Active: !config.activation,  
                Color: color,
            })

            const player = await penguin.findOne({
                where: {
                    Email: email_given
                }
            })

            await inventory.create({
                PenguinID: player.ID, 
                ItemID: color
            })

            if(config.activation){
                await send_activation_mail(player)
            }
            success(`${username_given} has just registered an account!.`)
            response.render('create.html', {
                success_message: `Congratulations ${username_given}, you have successfully made an account.`,
                error_message: '',
                site_key: config.site_key
            }) 
        }
    }
    catch(e){
        error(e)
    }
})

app.get('/activate/(:id)', async (request, response) =>{
    try{
        const activation_key = request.params.id
        const player_activated = await activation.findOne({
            where: {
                ActivationKey: activation_key
            }
        })
        if(!player_activated){
            response.render('create.html', {
                success_message: '',
                error_message: `We could not find the activation key ${activation_key} within our systems. Sorry.`,
                site_key: config.site_key
            })
        }
        else{

            await penguin.update({
                Active: 1
            }, 
            {
                where: {
                    ID: player_activated.PenguinID
                }
            })

            await activation.destroy({
                where: {
                    ActivationKey: player_activated.ActivationKey
                }
            })

            success(`PenguinID ${player_activated.PenguinID} has successfully activated their account.`)

            response.render('create.html', {
                success_message: 'Congratulations you have successfully activated your account. You may now login.',
                error_message: '', 
                site_key: config.site_key
            })
        }
    }
    catch(e){
        error(e)
    }
})


app.listen(config.port, async () => {
    success(`running houdini register on port: ${config.port}.`)
})

async function recaptcha_test(recaptcha_url){
    try{
        const score_return = await request(recaptcha_url)
        const score = JSON.parse(score_return)
        const result = score.success
        return result
    }
    catch(e){
        error(e)
    }
}

async function username_taken(username){
    try{
        const username_count = await penguin.count({
            where: {
                Username: username
            }
        })
        return username_count
    }
    catch(e){
        error(e)
    }
}

async function email_taken(email){
    try{
        const email_count = await penguin.count({
            where: {
                Email: email
            }
        })
        return email_count
    }
    catch(e){
        error(e)
    }
}

async function send_activation_mail(player){
    const id = Math.random().toString(26).slice(2)
    try{
        await activation.create(({
            PenguinID: player.ID, 
            ActivationKey: id
        }))

        await nodemailer_transporter.sendMail({
            to: player.Email, 
            subject: `Activate your account for ${config.cpps_name}`, 
            text: `Thank you for registering to ${config.cpps_name}. Please head over to http://${config.subdomain}/activate/${id} to activate your penguin.`, 
        })
    }
    catch(e){
        error(e)
    }
}

async function generate_bcrypt_password(raw_password){
    const md5 = (str) => createHash('md5').update(str).digest('hex')
    let encrypted_password = md5(raw_password).toUpperCase()
    encrypted_password = encrypted_password.substr(16, 16) + encrypted_password.substr(0, 16)
    encrypted_password += 'houdini'
    encrypted_password += config.salt
    encrypted_password = md5(encrypted_password)
    encrypted_password = encrypted_password.substr(16, 16) + encrypted_password.substr(0, 16)
    const bcrypt_hash = await bcrypt.hash(encrypted_password, 12)
    return bcrypt_hash
}

function form_recaptcha_url(recaptcha_response, ip){
    let recaptcha_url = "https://www.google.com/recaptcha/api/siteverify?"
    recaptcha_url += "secret=" + config.secret_key + "&"
    recaptcha_url += "response=" + recaptcha_response + "&"
    recaptcha_url += "remoteip=" + ip
    return recaptcha_url
}

function get_ip(request){
    return (request.headers["X-Forwarded-For"] || request.headers["x-forwarded-for"] || '').split(',')[0] || request.client.remoteAddress
}

function success(content){
    console.log("\x1b[0m", "\x1b[32m", content)
}

function warn(content){
    console.log("\x1b[0m", "\x1b[33m", content)
}

function error(content){
    console.log("\x1b[0m", "\x1b[31m", content)
}