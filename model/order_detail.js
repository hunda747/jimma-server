const Sequelize = require("sequelize");
const db = require("../config/dbConn");
const OrderSchema = require("./order");
const FoodSchema = require("./food");

const OrderDetailSchema = db.define("orderdetails", {
  ordersId: {
    type: Sequelize.INTEGER,
  },
  foodsId: {
    type: Sequelize.INTEGER,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
});

OrderDetailSchema.belongsTo(OrderSchema, {
  as: "orders",
  foreignkey: "orderId",
});

OrderDetailSchema.belongsTo(FoodSchema, {
  as: "foods",
  foreignkey: "foodsId",
});

module.exports = OrderDetailSchema;
