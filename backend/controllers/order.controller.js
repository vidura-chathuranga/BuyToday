import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/order.model.js";

// @desc create new order
// @route POST /api/orders
// @access private
const addOrderItems = asyncHandler(async (req, res) => {
    res.send('add Order ITems')
});

// @desc get loggedin User's orders
// @route GET /api/orders/myorders
// @access private
const getMyOrders = asyncHandler(async (req, res) => {
    res.send('Get my orders')
});


// @desc get order by id
// @route GET /api/orders/:id
// @access private
const getOrderById = asyncHandler(async (req, res) => {
    res.send('Get order by Id')
});

// @desc Update Order to paid
// @route PUT /api/orders/:id/pay
// @access private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send('Update order to paid')
});

// @desc Update to delivered
// @route PUT /api/orders/:id/deliver
// @access private/Admin
const updateOrderToDeliver = asyncHandler(async (req, res) => {
    res.send('updateOrderToDeliver')
});

// @desc Get all orders
// @route GET /api/orders
// @access private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
    res.send('getAllOrders')
});

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToDeliver,
    updateOrderToPaid,
    getAllOrders
}




