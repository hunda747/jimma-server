const express = require("express");
const router = express.Router();

const {
  addAdminAccount,
  getAdmin,
  getAllAdmin,
  verifyAdmin,
  getUser,
} = require("../controller/adminController");
const { auth } = require("../middleware/auth");

router.get("/", (req, res) => res.send("admin"));
router.post("/getAdmin", getAdmin);
router.post("/addAdminAccount", addAdminAccount);
router.post("/getAllAdmin", verifyAdmin, getAllAdmin);
router.post("/verifyAdmin", verifyAdmin);
router.post("/getUser", auth, getUser);

module.exports = router;
