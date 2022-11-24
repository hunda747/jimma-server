const AdminSchema = require("../model/admin");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let refreshTokens = [];

// const changeAdminUserName = async (req,res)=>{
//     const {email,userName} = req.body;

//     const [admin, metaUser] = await AdminModel.fetchAdminUser(email);

//     if(admin.length === 0){
//       res.json({
//         status: "404",
//         message: 'User Not Found'
//       })
//     }else{
//         console.log("changin the admin name ")
//         AdminModel.changeAdminName(userName , email);
//         res.json({
//           status:"200",
//           message:"UserName change successful"
//         })
//     }

// }

// const changeAdminPassword = async (req,res)=>{
//   const {email , oldPassword , newPassword} = req.body;

//   const [admin , userData] = await AdminModel.fetchAdminUser(email);
//   if(admin.length === 0){
//     res.json({
//       status: 404,
//       message: "admin Not found"
//     })
//   }else{
//      if(await bcrypt.compare(oldPassword , admin[0].password)){
//        const hashPass = await bcrypt.hash(newPassword , 8)
//        const [data, metaData] = await AdminModel.adminPasswordChange(email, hashPass);

//       res.json({
//         status: 200,
//         message:'admin password change successful'
//       })

//      }else{
//        res.json({
//         status: 402,
//         message: "Invalid old password"
//        })
//      }
//   }

// }

// const getAdminUserName = async(req,res)=>{
//   const {email} = req.body;

//   const [data , metaData] = await AdminModel.fetchAdminUser(email)

//   if(data.length === 0){
//     res.json({
//       status: "404",
//       message: "admin Not found"
//     })
//   }else{
//     res.json(data[0])
//   }
// }

const generateAccessToken = (admin) => {
  console.log(admin.username);
  return jwt.sign({ id: admin.id, username: admin.username }, "mySecretKey", {
    expiresIn: "1200s",
  });
};

const generateRefreshToken = (admin) => {
  return jwt.sign({ id: admin.id, email: admin.email }, "myRefreshSecretKey");
};

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  try {
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      console.log(token);
      jwt.verify(token, "mySecretKey", (err, admin) => {
        if (err) {
          console.log(err);
          return res.status(403).json("Token is not valid!");
        }

        req.admin = admin;
        // console.log("go token");
        // res.status(200).json("You are authenticated!");
        next();
      });
    } else {
      console.log("not autori");
      res.status(401).json("You are not authenticated! else");
    }
  } catch (err) {
    console.log(err);
  }
};

const addAdminAccount = async (req, res) => {
  const { fname, lname, username, phone, password } = req.body;
  console.log(req.body);
  if (!fname || !lname || !username || !phone || !password) {
    return res.status(404).send("Error while signup");
  } else {
    console.log("all there");
  }

  const status = true;
  const role = "admin";
  const hashPass = await bcrypt.hash(password, 8);
  const date = new Date().toISOString().slice(0, 10);
  // console.log(hashPass.encryptedData);
  console.log(hashPass);

  const admin = await AdminSchema.findOne({ where: { username: username } });
  console.log(admin?.length);

  if (!admin) {
    AdminSchema.create({
      fname,
      lname,
      username,
      phone,
      password: hashPass,
      date,
      role,
      status,
    })
      .then((admin) => {
        // console.log(admin);
        res.status(200).send("data Inserted");
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send("Error while signup");
      });
  } else {
    res.status(404).send("Error while signup");
  }
};

const getAllAdmin = async (req, res) => {
  console.log("getting all the users now");

  AdminSchema.findAll()
    .then((admin) => {
      // console.log(admin);
      res.status(200).send("data Inserted");
    })
    .catch((err) => {
      console.log(err);
      res.send("Error while signup");
    });
};

const getAdmin = async (req, res) => {
  console.log("in appi get admin");
  const username = req.body.username;
  const password = req.body.password;
  console.log(password);
  if (!username || !password) {
    return res.sendStatus(401);
  }
  const hashPass = await bcrypt.hash(password, 8);

  console.log(hashPass);
  // const admin = await AdminModel.find({ username: username });
  const admin = await AdminSchema.findOne({ where: { username: username } });
  // console.log(admin[0].password);
  // const comp = await bcrypt.compare(password ,hashPass);

  console.log(!admin);
  console.log(admin);
  if (admin) {
    if (await bcrypt.compare(password, admin.password)) {
      const accessToken = generateAccessToken(admin);
      const refreshToken = generateRefreshToken(admin);
      refreshTokens.push(refreshToken);
      console.log("found admin");
      res.status(200).send({ admin: admin, jwt: accessToken });
    } else {
      console.log("no luck");
      res.sendStatus(401);
    }
  } else {
    console.log("username error");
    res.sendStatus(400);
  }
};

const getUser = async (req, res) => {
  try {
    let user = await AdminSchema.findOne({
      where: { id: req.admin.id },
    });
    // user = user.filter((us) => us !== password);
    if (!user) throw Error("User does not exist");
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

const checkUser = async (req, res) => {
  console.log("in appi get admin");
  const phone = req.body.phone;

  const [admin, metaData] = await AdminModel.checkUser(phone);
  console.log(admin[0]["EXISTS(SELECT * from admin WHERE phone_number=?)"]);
  if (admin[0]["EXISTS(SELECT * from admin WHERE phone_number=?)"]) {
    console.log("found admin");
    res.send(true);
  } else {
    console.log("no luck");
    res.send(false);
  }
};

const checkEmail = async (req, res) => {
  console.log("in appi get admin");
  const email = req.body.email;

  const [admin, metaData] = await AdminModel.checkEmail(email);
  console.log(admin[0]["EXISTS(SELECT * from admin WHERE email=?)"]);
  if (admin[0]["EXISTS(SELECT * from admin WHERE email=?)"]) {
    console.log("found admin");
    res.send(true);
  } else {
    console.log("no luck");
    res.send(false);
  }
};

module.exports = {
  getAdmin,
  addAdminAccount,
  getAllAdmin,
  getUser,
  // checkUser,
  // checkEmail,
  // getAdminUser,
  verifyAdmin,
  // changeAdminUserName,
  // changeAdminPassword,
};
