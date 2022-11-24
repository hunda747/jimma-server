const OrderDetailSchema = require("../model/order_detail");
const OrderSchema = require("../model/order");
const FoodSchema = require("../model/food");

const addOrderDetail = (req, res) => {
  const { orderId, productId, quantity } = req.body.orderId;

  OrderDetailSchema.create({
    orderId,
    foodsId: productId,
    quantity,
  })
    .then((orderDetails) => {
      console.log("food:" + orderDetails);
      res.send(orderDetails);
    })
    .catch((err) => res.send(err));
};

const getOrderDetails = async (req, res) => {
  const id = req.body.id;

  OrderDetailSchema.findAll({
    where: { ordersId: id },
    include: [
      // {
      //   model: OrderSchema,
      //   as: "orders",
      //   require: true,
      // },
      {
        model: FoodSchema,
        as: "foods",
        require: true,
      },
    ],
  })
    .then((orderDetails) => {
      console.log(orderDetails);
      res.send(orderDetails);
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
};

const getOneOrderDetail = (id) => {
  // const id = req.body.id;
  console.log(id);
  OrderDetailSchema.findAll({
    where: { ordersId: id },
    include: [
      {
        model: FoodSchema,
        as: "foods",
        require: true,
      },
    ],
  })
    .then((orderDetails) => {
      console.log(orderDetails);
      return orderDetails;
    })
    .catch((err) => {
      return err;
    });
};

const getTopProductByQuan = async (req, res) => {
  const id = req.body.id;
  const [order, metaData] = await OrderDetailModel.topProductByQuantityLIM10();
  // console.log(order);
  res.send(order);
};

const getTopProductByTotalSale = async (req, res) => {
  const id = req.body.id;
  const [order, metaData] = await OrderDetailModel.topProductByPriceLIM10();
  // console.log(order);
  res.send(order);
};

module.exports = {
  addOrderDetail,
  getOrderDetails,
  getOneOrderDetail,
  // getTopProductByQuan,
  // getTopProductByTotalSale,
};
