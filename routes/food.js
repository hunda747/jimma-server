const express = require("express");
const router = express.Router();

const {
  getAllFood,
  getAllFoodsByRestaurant,
  getFoodsByRestaurant,
  updateFood,
  addFood,
  searchFood,
} = require("../controller/foodController");

router.get("/", (req, res) => res.send("foods"));
router.get("/getAllFood", getAllFood);
router.post("/getAllFoodsByRestaurant", getAllFoodsByRestaurant);
router.post("/getFoodsByRestaurant", getFoodsByRestaurant);
router.post("/updateFood", updateFood);
router.post("/addFood", addFood);
router.post("/searchFood", searchFood);

module.exports = router;
