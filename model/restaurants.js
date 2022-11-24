const Sequelize = require("sequelize");
const db = require("../config/dbConn");
const FoodSchema = require("./food");

const RestaurantSchema = db.define("restaurant", {
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  rating: {
    type: Sequelize.INTEGER,
  },
  open_days: {
    type: Sequelize.STRING,
  },
  working_hour: {
    type: Sequelize.STRING,
  },
  img: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.BOOLEAN,
  },
});

// RestaurantSchema.hasMany(FoodSchema, {
//   foreignKey: "restaurant",
// });

module.exports = RestaurantSchema;
