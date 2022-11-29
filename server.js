const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
// const path = require("path");
const cors = require("cors");
const db = require("./config/dbConn");

const foodRoutes = require("./routes/food");
const userRoutes = require("./routes/user");
const restaurantRoutes = require("./routes/restaurant");
const orderRoutes = require("./routes/order");
const orderDetailRoutes = require("./routes/orderDetail");
const adminRoutes = require("./routes/admin");
const logger = require("./logger");

// const associations = require("./model/associations");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// app.use(associations);

db.authenticate()
  .then(() => logger("info", "Database connect ..."))
  .catch((err) => logger("error", "Error: " + err));

app.get("/", (req, res) => res.send("indeEX"));
app.use("/api/food", foodRoutes);
app.use("/api/user", userRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/orderDetail", orderDetailRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen();
