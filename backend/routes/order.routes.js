import express from 'express';
const router = express.Router();
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToDeliver,
    updateOrderToPaid,
    getAllOrders
} from '../controllers/order.controller.js';
import {protect,admin} from '../middleware/authMiddleware.js';

router.route('/').post(protect,addOrderItems).get(protect,admin,getAllOrders);
router.route('/myorders').get(protect,getMyOrders);
router.route('/:id').get(protect,admin,getOrderById);
router.route('/:id/pay').put(protect,updateOrderToPaid);
router.route('/:id/deliver').put(protect,admin,updateOrderToDeliver);

export default router;
