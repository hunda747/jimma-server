const RestaurantSchema = require("../model/restaurants");

const addRestaurant = async (req, res) => {
  const { name, description, rating, open_days, working_hour, img, status } =
    req.body;

  RestaurantSchema.create({
    name,
    description,
    rating,
    open_days,
    working_hour,
    img,
    status,
  })
    .then((restaurant) => {
      res.send(restaurant);
    })
    .catch((err) => res.send(err));
};

const getAllRestaurant = async (req, res) => {
  RestaurantSchema.findAll({ where: { status: true } })
    .then((restaurant) => {
      res.send(restaurant);
    })
    .catch((err) => res.send(err));
};

const getRestaurant = async (req, res) => {
  RestaurantSchema.findAll()
    .then((restaurant) => {
      res.send(restaurant);
    })
    .catch((err) => res.send(err));
};

const getRestaurantById = async (req, res) => {
  const id = req.body.id;

  RestaurantSchema.findAll({ where: { id: id } })
    .then((restaurant) => {
      res.send(restaurant);
    })
    .catch((err) => res.send(err));
};

const updateRestaurant = async (req, res) => {
  const {
    name,
    description,
    rating,
    open_days,
    working_hour,
    img,
    id,
    status,
  } = req.body;
  console.log(req.body);
  RestaurantSchema.update(
    {
      name: name,
      description: description,
      rating: rating,
      open_days: open_days,
      working_hour: working_hour,
      img: img,
      status: status,
    },
    { where: { id: id } }
  )
    .then((restaurant) => {
      console.log(restaurant);
      res.send(restaurant);
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
};

module.exports = {
  addRestaurant,
  getAllRestaurant,
  getRestaurantById,
  updateRestaurant,
  getRestaurant,
};
