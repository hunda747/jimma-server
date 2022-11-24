const express = require("express");
const router = express.Router();

const {
  addRestaurant,
  getAllRestaurant,
  getRestaurant,
  getRestaurantById,
  updateRestaurant,
} = require("../controller/restaurantController");

router.get("/", (req, res) => res.send("restaurants"));
router.get("/getAllRestaurant", getAllRestaurant);
router.get("/getRestaurant", getRestaurant);
router.post("/addRestaurant", addRestaurant);
router.post("/getRestaurantById", getRestaurantById);
router.post("/updateRestaurant", updateRestaurant);
// router.post("/searchFood", searchFood);

module.exports = router;
