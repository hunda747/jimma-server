const db = require("../config/dbConn");
const OrderSchema = require("../model/order");
const Sequelize = require("sequelize");
const CircularJSON = require("circular-json");
const OrderDetailSchema = require("../model/order_detail");
const UsersSchema = require("../model/user");
const FoodSchema = require("../model/food");
const {
  addOrderDetail,
  getOrderDetails,
  getOneOrderDetail,
} = require("./orderDetailController");

const addOrder = async (req, res) => {
  console.log("In add Orders");
  const {
    // date,
    total,
    userId,
    latitude,
    longitude,
    contact,
    no_item,
    orders,
    address,
  } = req.body;
  console.log(orders);
  const date = new Date().toISOString().slice(0, 10);
  // userId = 2;
  OrderSchema.create({
    date,
    usersId: userId,
    total,
    status: "pending",
    latitude,
    longitude,
    contact,
    no_item,
    address,
  })
    .then((order) => {
      // console.log(order.dataValues.id);
      // console.log(orders);
      // console.log(orders[0].quantity);
      // res.send(order);
      orders.map((orderdetail, index) => {
        const detailId = order.dataValues.id;
        console.log(detailId);
        const productId = orderdetail.foodId;
        const quantity = orderdetail.foodQuantity;
        console.log(productId);
        OrderDetailSchema.create({
          ordersId: detailId,
          foodsId: productId,
          quantity: quantity,
        }).then((orderdetail) => {
          console.log(orderdetail);
        });
      });
      res.status(200).send("all done");
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

const getOrders = async (req, res) => {
  OrderSchema.findAll({
    include: [
      {
        model: UsersSchema,
        as: "users",
        require: true,
      },
    ],
  })
    .then((order) => {
      order = CircularJSON.stringify(order);
      order = CircularJSON.parse(order);

      order.map(async (ord) => {
        const ordetDetail = await getOrderDetail(ord.id);
        console.log(CircularJSON.stringify(ordetDetail));
        // const data = CircularJSON.stringify(ordetDetail);
        // console.log(ord.id);
        ord.orders = ordetDetail;
      });

      // const orderFull = order.map(async (ord) => {
      //   return { ...ord, orders: ordetDetail };
      // });
      // console.log("order:" + order);
      res.send(order);
    })
    .catch((err) => res.send(err));
};

const OrderQuery = async (req, res) => {
  db.query(
    "SELECT orders.total,orders.usersId,orders.latitude,orders.longitude,orders.contact,orders.no_item,orders.address,orders.id,orders.status, orderdetails.quantity FROM orders INNER JOIN orderdetails ON orders.id = orderdetails.orderId WHERE orders.id = 17",
    {
      // date: "2022-11-06",
      include: [
        {
          model: UsersSchema,
          as: "users",
          require: true,
        },
      ],
    }
  )
    .then((order) => {
      // console.log("order:" + order);
      res.send(order);
    })
    .catch((err) => res.send(err));
};

const getInprogressOrders = async (req, res) => {
  OrderSchema.findAll({
    include: [
      {
        model: UsersSchema,
        as: "users",
        require: true,
      },
    ],
    where: { status: "inProgress" },
  })
    .then((order) => {
      // console.log("order:" + order);
      res.send(order);
    })
    .catch((err) => res.send(err));
};

const getCompleteOrders = async (req, res) => {
  OrderSchema.findAll({
    include: [
      {
        model: UsersSchema,
        as: "users",
        require: true,
      },
    ],
    where: { status: "complete" },
  })
    .then((order) => {
      // console.log("order:" + order);
      res.send(order);
    })
    .catch((err) => res.send(err));
};

const getPendingOrders = async (req, res) => {
  OrderSchema.findAll({
    include: [
      {
        model: UsersSchema,
        as: "users",
        require: true,
      },
    ],
    where: { status: "pending" },
  })
    .then((order) => {
      // console.log("order:" + order);
      res.send(order);
    })
    .catch((err) => res.send(err));
};

const getCompleteOrdersByDate = async (req, res) => {
  const date = req.body.date;
  const order = await OrderModle.find({ status: "inProgress", date: date })
    .populate("userId", "fname lname phone")
    .populate({
      path: "orders",
      populate: { path: "productId" },
    });

  res.send(order);
};

const getOrdersbyId = async (req, res) => {
  const id = req.body.id;

  OrderSchema.findAll({
    include: [
      {
        model: UsersSchema,
        as: "users",
        require: true,
      },
    ],
    where: { id: id },
  })
    .then(async (order) => {
      // console.log("order:" + order);
      const ordetDetail = await getOrderDetail(id);
      order = CircularJSON.stringify(order);
      order = CircularJSON.parse(order);
      // const orderFull = order.map((ord) => {
      //   return { ...ord, orders: ordetDetail };
      // });

      order.map((ord) => {
        // console.log(ord.id);
        ord.orders = ordetDetail;
      });

      // order.forEach((ord) => {
      //   ord.orders = ordetDetail;
      // });
      // console.log(orderFull);

      // res.send(orderFull);
      res.send(order);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

const getOrderDetail = async (id) => {
  console.log(id);
  try {
    const orderDetails = await OrderDetailSchema.findAll({
      // raw: true,
      where: { ordersId: id },
      include: [
        {
          model: FoodSchema,
          as: "foods",
          require: true,
        },
      ],
    });
    // orderDetails.map((od) => od.get({ plane: true }));
    // console.log(simpleStringify(orderDetails));
    // const od = JSON.stringify(orderDetails);
    // od = JSON.parse(od);
    // console.log(orderDetails);
    return orderDetails;
    // return orderDetails.map((od) => od.get({ plane: true }));
  } catch (err) {
    return err;
  }
};

const simpleStringify = (object) => {
  // stringify an object, avoiding circular structures
  var simpleObject = {};
  for (var prop in object) {
    if (!object.hasOwnProperty(prop)) {
      continue;
    }
    if (typeof object[prop] == "object") {
      continue;
    }
    if (typeof object[prop] == "function") {
      continue;
    }
    simpleObject[prop] = object[prop];
  }
  return JSON.stringify(simpleObject); // returns cleaned up JSON
};

const getOrdersbyUser = async (req, res) => {
  const id = req.body.id;

  OrderSchema.findAll({
    include: [
      {
        model: UsersSchema,
        as: "users",
        require: true,
      },
    ],
    where: { usersId: id },
    order: [
      ["date", "DESC"],
      ["id", "DESC"],
    ],
  })
    .then((order) => {
      // console.log("order:" + order);
      res.send(order);
    })
    .catch((err) => res.send(err));
};

// const getOrdersbyIdDate = async (req,res) => {
//   const id = req.body.id;
//   const date = req.body.date;

//   const order = await OrderModle.find({id: id, date: date}).populate("userId", "fname phone").populate({
//     path: 'orders',
//     populate: { path: 'productId'}
//   });

//   // console.log(order);
//   try{
//     res.send(order);
//   }catch(e){
//     res.status(401).send(e)
//     console.log(e);
//   }
// }

// const getOrdersbyDeliveryId = async (req,res) => {
//   const id = req.body.id;
//   const [order, metaData] = await OrderModle.fetchOrdersCompleteByDeliveryId(id)

//   // console.log(order);
//   try{
//     res.send(order);
//   }catch(e){
//     res.status(401).send(e)
//     console.log(e);
//   }
// }

// const getOrdersbyDeliveryIdAndDate = async (req,res) => {
//   const id = req.body.id;
//   const date = req.body.date;
//   const [order, metaData] = await OrderModle.fetchOrdersCompleteByDeliveryIdAndDate(id, date)

//   // console.log(order);
//   try{
//     res.send(order);
//   }catch(e){
//     res.status(401).send(e)
//     console.log(e);
//   }
// }

const changeStatusAccept = async (req, res) => {
  const id = req.body.id;
  const status = "inProgress";
  const deliveryID = req.body.deliveryID;
  try {
    // const [order, metaData] = await OrderModle.changeStatusAccept(id, status, deliveryID);
    const order = await OrderModle.findOneAndUpdate(
      { _id: id },
      { status: status, deliveryID: deliveryID }
    );
    console.log(order);
  } catch (e) {
    console.log(e);
  }
  res.sendStatus(200);
};

const changeStatusComplete = async (req, res) => {
  const id = req.body.id;
  const status = req.body.status;
  const deliveredDate = new Date().toISOString().slice(0, 10);
  try {
    const order = await OrderModle.findOneAndUpdate(
      { _id: id },
      { status: status, deliveredDate: deliveredDate }
    );
  } catch (e) {
    console.log(e);
  }
  res.sendStatus(200);
};

const changeStatus = async (req, res) => {
  const id = req.body.id;
  const status = req.body.status;

  OrderSchema.update({ status: status }, { where: { id: id } })
    .then((order) => {
      // console.log("order:" + order);
      res.send(order);
    })
    .catch((err) => res.send(err));
};

// const countOrderById = async(req, res) => {
//   const id = req.body.id;
//   const [order, metaData] = await OrderModle.countOrderById(id);
//   const noOrders = order[0];
//   console.log(noOrders);
//   try{
//     res.send(noOrders);
//   } catch(e){
//     console.log(e);
//   }
// }

// const getRecentOrderLocations = async (req,res)=>{
//   const {id} = req.body;

//   if(id === ''){
//     res.json({
//       status: 404,
//       message: "User Not Found"
//     })
//   }else{
//      const [data, metaData] = await OrderModle.fetchCompleteById(id);
//      if(data.length === 0){
//        res.json({
//         status: 201,
//         message: "User Has no Recent Orders"
//        })
//      }else {
//        res.send(data)

//      }
//   }

// }

// const getPendingOrderCount = async (req,res)=>{
//   const [data, metaData]= await OrderModle.fetchPendingCount();
//   res.json(data.length)
// }

module.exports = {
  addOrder,
  // countOrderById,
  getOrders,
  getInprogressOrders,
  getOrdersbyId,
  changeStatus,
  getPendingOrders,
  changeStatusComplete,
  changeStatusAccept,
  // getOrdersbyDeliveryId,
  getCompleteOrders,
  getOrdersbyUser,
  // getRecentOrderLocations,
  // getPendingOrderCount,
  // getOrdersbyDeliveryIdAndDate,
  // getOrdersbyIdDate,
  getCompleteOrdersByDate,
  OrderQuery,
};
