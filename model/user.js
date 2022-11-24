const Sequelize = require("sequelize");
const db = require("../config/dbConn");

const UsersSchema = db.define("user", {
  fname: {
    type: Sequelize.STRING,
  },
  lname: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING,
  },
});

module.exports = UsersSchema;
