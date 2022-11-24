const Sequelize = require("sequelize");
const db = require("../config/dbConn");

const AdminSchema = db.define("admins", {
  fname: {
    type: Sequelize.STRING,
  },
  lname: {
    type: Sequelize.STRING,
  },
  username: {
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
  role: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = AdminSchema;
