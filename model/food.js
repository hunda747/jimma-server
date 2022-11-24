const Sequelize = require("sequelize");
const db = require("../config/dbConn");
const RestaurantSchema = require("./restaurants");

const FoodSchema = db.define("foods", {
  food_name: {
    type: Sequelize.STRING,
    // required: true,
  },
  description: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  },
  restaurantsId: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.DOUBLE,
  },
  status: {
    type: Sequelize.BOOLEAN,
  },
});

FoodSchema.belongsTo(RestaurantSchema, {
  as: "restaurants",
  foreignkey: "restaurantsId",
});

module.exports = FoodSchema;
