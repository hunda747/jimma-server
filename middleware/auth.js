const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  console.log(req.headers);
  try {
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      console.log(token);
      jwt.verify(token, "mySecretKey", (err, admin) => {
        if (err) {
          // console.log(err);
          return res.status(403).json("Token is not valid!");
        }

        req.admin = admin;
        // console.log("go token");
        // res.status(200).json("You are authenticated!");
        next();
      });
    } else {
      console.log("not autori");
      return res.status(401).json("You are not authenticated! else");
    }
  } catch (err) {
    // console.log(err);
    return res.status(400).json({ msg: "Token is not valid" });
  }
};

module.exports = {
  auth,
};
