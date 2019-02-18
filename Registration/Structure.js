module.exports = (sequelize, DataTypes) => {
  return sequelize.define("penguin", {
    ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Username: DataTypes.STRING,
    Nickname: DataTypes.STRING,
    Approval: DataTypes.STRING,
    Password: DataTypes.STRING,
    Email: DataTypes.STRING,
    Active: DataTypes.INTEGER,
    Color: DataTypes.INTEGER,
  })
}