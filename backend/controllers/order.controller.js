import { json } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/order.model.js";

// @desc create new order
// @route POST /api/orders
// @access private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((item) => ({
        product: item._id,
        qty: item.qty,
        image: item.image,
        price: item.price,
        name: item.name,
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      user: req.user._id,
    });

    const createOrder = await order.save();

    res.status(201).json(createOrder);
  }
});

// @desc get loggedin User's orders
// @route GET /api/orders/myorders
// @access private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json(orders);
});

// @desc get order by id
// @route GET /api/orders/:id
// @access private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Update Order to paid
// @route PUT /api/orders/:id/pay
// @access private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    {
      isPaid: true,
      paidAt: Date.now(),
      paymentResult: {
        id: req.body.id,
        status: req.body.id,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      },
    },
    { new: true }
  );

  if (updatedOrder) {
    res.status(200).json(updatedOrder);
  } else {
    res.status(500);
    throw new Error("order payment failed");
  }
});

// @desc Update to delivered
// @route PUT /api/orders/:id/deliver
// @access private/Admin
const updateOrderToDeliver = asyncHandler(async (req, res) => {
  res.send("updateOrderToDeliver");
});

// @desc Get all orders
// @route GET /api/orders
// @access private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user','id name');

  res.status(200).json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToDeliver,
  updateOrderToPaid,
  getAllOrders,
};
