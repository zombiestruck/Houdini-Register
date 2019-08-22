const sequelize = require('sequelize');
const log = require('../Console');
const Base = require('../Configuration'); 

class Database extends Base{
    constructor(){
        super();
        this.connection = false;
    }

    async connect(){
        this.databaseConnection = await new sequelize({
            host: this.database_host,
            port: this.database_port,
            username: this.database_username,
            password: this.database_password,
            database: this.database_name,
            dialect: 'mysql',
            logging: false,
            define: {
                timestamps: false,
                freezeTableName: true
            }
        });
        
        await this.authentication();
        this.import();
    }

    async import(){
        if(this.connection){
            this.penguin = await this.databaseConnection.import('../Data/Penguin');
            this.inventory = await this.databaseConnection.import('../Data/Inventory');
            this.activation = await this.databaseConnection.import('../Data/Activation');
            log.success(`Database connection successfully made to ${this.database_name}`)
        }
    }

    async authentication(){
        try{
            await this.databaseConnection.authenticate();
            this.connection = true;
        }
        catch(e){
            /* log.crash(e) */
            log.alert(`The database connection to ${this.database_name} has failed.`)
            log.alert(`Please consider reviewing the database details provided in Configuration.js`)
        }
    }

    async execute(table, type, query){
        try{
            if(query == ''){
                return await this[`${table}`][`${type}`]();
            }
            else{
                let jsonQuery = JSON.stringify(eval(query));
                return await this[`${table}`][`${type}`](JSON.parse(jsonQuery));
            }
        }
        catch(e){
            /* log.crash(e); */
            log.crash(`FILE: Engine/Database.js | LINE: 43`); 
        }
    }

    async update(table, query){
        try{
            let row = Object.keys(query);
            await this[`${table}`].update({[`${row[0]}`]: `${query[`${row[0]}`]}`}, {where: {[`${row[1]}`]: `${query[`${row[1]}`]}`}});
        }
        catch(e){
            /* log.crash(e); */
            log.crash(`FILE: Engine/Database.js | LINE: 54`);
        }
    }
}

module.exports = Database;
