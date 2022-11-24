const express = require("express");
const router = express.Router();

const {
  addOrder,
  getOrders,
  getInprogressOrders,
  getOrdersbyId,
  changeStatus,
  getPendingOrders,
  changeStatusComplete,
  changeStatusAccept,
  getCompleteOrders,
  getOrdersbyUser,
  getCompleteOrdersByDate,
  OrderQuery,
} = require("../controller/ordersController");
const { auth } = require("../middleware/auth");

router.get("/", (req, res) => res.send("order"));
router.post("/addOrder", addOrder);
router.get("/getOrders", getOrders);
router.post("/getInprogressOrders", getInprogressOrders);
router.post("/getPendingOrders", getPendingOrders);
router.post("/getCompleteOrders", getCompleteOrders);
router.post("/getCompleteOrdersByDate", getCompleteOrdersByDate);
router.post("/getOrdersbyId", getOrdersbyId);
router.post("/getOrdersbyUser", getOrdersbyUser);
router.post("/changeStatus", changeStatus);
router.post("/changeStatusComplete", changeStatusComplete);
router.post("/changeStatusAccept", changeStatusAccept);
router.post("/orderQuery", OrderQuery);

module.exports = router;
