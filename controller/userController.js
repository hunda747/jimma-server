const UsersSchema = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let refreshTokens = [];

const addUserByPhone = async (req, res) => {
  console.log("adding user by phone number");
  const { fname, lname, phone, password } = req.body;
  const status = true;
  const date = new Date().toISOString().slice(0, 10);
  // const date = JSON.stringify(new Date());

  const hashPassword = await bcrypt.hash(password, 8);
  // console.log(hashPassword);

  const user = await UsersSchema.findOne({ where: { phone: phone } });
  console.log(user?.length);

  if (!user) {
    UsersSchema.create({
      fname,
      lname,
      phone,
      password: hashPassword,
      date,
      status,
    })
      .then((user) => {
        console.log("user:" + user);
        res.send(user);
      })
      .catch((err) => res.send(err));
  } else {
    console.log("Phone already in use");
    res.send("Error while signup");
  }
};

const getAllUser = async (req, res) => {
  console.log("getting all the users now");

  UsersSchema.findAll()
    .then((user) => {
      console.log("user:" + user);
      res.send(user);
    })
    .catch((err) => res.send(err));
};

const getUser = async (req, res) => {
  console.log("in appi get user");
  const { phone, password } = req.body;

  if (!phone || !password) {
    console.log("Must fill all filed");
    res.status(400).send("Mull fill all filelds");
    return;
  }

  const hashPass = await bcrypt.hash(password, 8);
  // console.log(hashPass);

  const user = await UsersSchema.findOne({ where: { phone: phone } });

  try {
    if (await bcrypt.compare(password, user.password)) {
      console.log("found user");
      res.status(200).send(user);
    } else {
      console.log("no luck");
      res.sendStatus(401);
    }
  } catch (err) {
    console.log("no luck try catch");
    console.log(err);
    res.sendStatus(400);
  }
};

const resetPassword = async (req, res, next) => {
  // Compare token in URL params to hashed token
  const { phone, oldPassword, newPassword } = req.body;

  const user = await UsersSchema.findOne({ where: { phone: phone } });
  console.log(user);
  const hashPass = await bcrypt.hash(newPassword, 8);

  try {
    if (await bcrypt.compare(oldPassword, user.password)) {
      UsersSchema.update({ password: hashPass }, { where: { phone: phone } })
        .then((user) => {
          console.log("user:" + user);
          res.status(200).send(user);
        })
        .catch((err) => res.send(err));
    } else {
      console.log("incorrect password");
      res.sendStatus(401);
    }
  } catch (err) {
    console.log("no luck try catch");
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports = {
  getUser,
  addUserByPhone,
  getAllUser,
  resetPassword,
};
