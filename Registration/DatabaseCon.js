const CONFIG = require('../Config');
const Sequelize = require('sequelize'); // for operators

var Database = new Sequelize({
    host: CONFIG.MYSQL.HOST,
    port: CONFIG.MYSQL.PORT,
    username: CONFIG.MYSQL.USER,
    password: CONFIG.MYSQL.PASS,
    database: CONFIG.MYSQL.DATABASE,
    dialect: 'mysql',
    define: {
        timestamps: false,
        freezeTableName: true
    }
  });

var Account = Database.import('./Structure')

module.exports = {
  Database,
  Account
}





