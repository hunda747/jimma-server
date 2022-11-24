const Sequelize = require("sequelize");
const db = require("../config/dbConn");
const UsersSchema = require("../model/user");

const OrderSchema = db.define("orders", {
  date: {
    type: Sequelize.STRING,
  },
  usersId: {
    type: Sequelize.NUMBER,
  },
  total: {
    type: Sequelize.DOUBLE,
  },
  status: {
    type: Sequelize.STRING,
  },
  latitude: {
    type: Sequelize.DOUBLE,
  },
  longitude: {
    type: Sequelize.DOUBLE,
  },
  contact: {
    type: Sequelize.STRING,
  },
  no_item: {
    type: Sequelize.INTEGER,
  },
  // deliveryPerson: {
  //   type: Sequelize.INTEGER,
  // },
  // orders: {
  //   foodId: {
  //     type: mongoose.Schema.ObjectId,
  //     ref: "Food",
  //     required: true,
  //   },
  //   foodQuantity: {
  //     type: Number,
  //     required: true,
  //   },
  // },
  address: {
    type: Sequelize.STRING,
  },
});

OrderSchema.belongsTo(UsersSchema, {
  as: "users",
  foreignkey: "userId",
});

module.exports = OrderSchema;
