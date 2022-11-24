const express = require("express");
const router = express.Router();

const {
  getUser,
  addUserByPhone,
  getAllUser,
  resetPassword,
} = require("../controller/userController");

router.get("/", (req, res) => res.send("user"));
router.post("/addUserByPhone", addUserByPhone);
router.post("/getUsers", getAllUser);
router.post("/getUser", getUser);
router.post("/resetPassword", resetPassword);

module.exports = router;
