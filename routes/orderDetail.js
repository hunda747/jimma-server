const express = require("express");
const router = express.Router();

const {
  addOrderDetail,
  getOrderDetails,
  getOneOrderDetail,
} = require("../controller/orderDetailController");

router.get("/", (req, res) => res.send("order_detail"));
router.post("/addOrderDetail", addOrderDetail);
router.post("/getOrdersDetails", getOrderDetails);
router.post("/getOneOrderDetail", getOneOrderDetail);

module.exports = router;
