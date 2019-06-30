const sequelize = require('sequelize');

class Database{
    constructor(config){
        this.host = config.mysql.host;
        this.username = config.mysql.username;
        this.password = config.mysql.password;
        this.port = config.mysql.port;
        this.database = config.mysql.database;
        this.createConnection();
    }


    async createConnection(){
        this.databaseConnection = await new sequelize({
            host: this.host,
            port: this.port,
            username: this.username,
            password: this.password,
            database: this.database,
            dialect: 'mysql',
            logging: false,
            define: {
                timestamps: false,
                freezeTableName: true
            }
        });

        this.penguin = await this.databaseConnection.import('../Data/Penguin');
        this.inventory = await this.databaseConnection.import('../Data/Inventory');
    }


}

module.exports = Database;
