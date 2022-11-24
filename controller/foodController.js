// const async = require('hbs/lib/async');
const db = require("../config/dbConn");
const FoodSchema = require("../model/food");
const RestaurantSchema = require("../model/restaurants");

const addFood = async (req, res) => {
  const { food_name, description, type, restaurant, price } = req.body;
  const status = true;
  console.log("add food");
  if (!food_name || !description || !type || !restaurant || !price) {
    return res.status(401).send("All field must be filed");
  }

  FoodSchema.create({
    food_name,
    description,
    type,
    restaurantsId: restaurant,
    price,
    status,
  })
    .then((food) => {
      console.log("food:" + food);
      res.send(food);
    })
    .catch((err) => res.send(err));
};

const getAllFood = async (req, res) => {
  console.log("in appi get product");
  FoodSchema.findAll({
    include: [
      {
        model: RestaurantSchema,
        as: "restaurants",
        require: true,
      },
    ],
  })
    .then((food) => {
      console.log("food:" + food);
      res.send(food);
    })
    .catch((err) => res.send(err));
  // res.send(food);
};

const getAllFoodsByRestaurant = async (req, res) => {
  const restaurant = req.body.restaurant;
  console.log("rest: " + restaurant);
  FoodSchema.findAll({
    include: [
      {
        model: RestaurantSchema,
        as: "restaurants",
        require: true,
      },
    ],
    where: { restaurantsId: restaurant },
  })
    .then((food) => {
      res.send(food);
    })
    .catch((err) => res.send(err));
};

const getFoodsByRestaurant = async (req, res) => {
  const restaurant = req.body.restaurant;
  FoodSchema.findAll({
    include: [
      {
        model: RestaurantSchema,
        as: "restaurants",
        require: true,
      },
    ],
    where: { restaurantsId: restaurant, status: true },
  })
    .then((food) => {
      res.send(food);
    })
    .catch((err) => res.send(err));
};

const searchFood = async (req, res) => {
  const food = req.body.food;
  console.log("getting food by search");
  console.log(food);

  if (food === "") {
    FoodSchema.findAll({
      include: [
        {
          model: RestaurantSchema,
          as: "restaurants",
          require: true,
        },
      ],
    })
      .then((food) => {
        console.log("food:" + food);
        res.send(food);
      })
      .catch((err) => res.send(err));
  } else {
    FoodSchema.findAll({
      include: [
        {
          model: RestaurantSchema,
          as: "restaurants",
          require: true,
        },
      ],
      where: { food_name: food, status: true },
    })
      .then((food) => {
        res.send(food);
      })
      .catch((err) => res.send(err));
  }
};

const updateFood = async (req, res) => {
  const { food_name, description, type, id, price, status } = req.body;
  FoodSchema.update(
    {
      food_name: food_name,
      description: description,
      type: type,
      price: price,
      status: status,
    },
    { where: { id: id } }
  )
    .then((food) => {
      res.send(food);
    })
    .catch((err) => res.send("err" + err));
};

module.exports = {
  getAllFood,
  getAllFoodsByRestaurant,
  updateFood,
  getFoodsByRestaurant,
  addFood,
  searchFood,
};
