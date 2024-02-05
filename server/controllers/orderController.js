import Order from "../models/order.js";
import expressAsyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";

const createOrder = expressAsyncHandler(async (req, res) => {
  const { userId } = req.user;
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || !shippingAddress || !paymentMethod || !itemsPrice) {
    res.status(400).send({ message: "please provede All values" });
  }
  const newOrder = await Order.create({
    orderItems: orderItems.map((item) => ({ ...item, product: item._id })),
    shippingAddress: shippingAddress,
    paymentMethod: paymentMethod,
    shippingPrice: shippingPrice,
    itemsPrice: itemsPrice,
    taxPrice: taxPrice,
    totalPrice: totalPrice,
    user: userId,
  });

  res
    .status(StatusCodes.CREATED)
    .send({ message: "New Order Created", newOrder });
});

const getAllOrders = expressAsyncHandler(async (req, res) => {
  const queryObject = {};

  let result = Order.find(queryObject).sort({ createdAt: -1 });

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 4;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const orders = await result;

  const totalCount = await Order.countDocuments(queryObject).exec();
  const totalPages = Math.ceil(totalCount / limit);
  res.status(StatusCodes.OK).send({ orders, totalPages });
});

const getMyOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).send(orders);
});

const getSingleOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.status(StatusCodes.OK).send(order);
  } else {
    res.status(StatusCodes.NOT_FOUND).send({ message: "Order Not Found" });
  }
});

const updateOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    await order.save();
    res.status(StatusCodes.OK).send({ message: "Order Delivered" });
  } else {
    res.status(StatusCodes.NOT_FOUND).send({ message: "Order Not Found" });
  }
});

const deleteOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    await order.deleteOne();
    res.send({ message: "Order Deleted" });
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});

export {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  getMyOrders,
};
