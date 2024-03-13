import express from 'express';
import { createOrder, deleteOrderById, getOrderById, getOrders, updateOrderById } from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js'; // Import your authentication middleware

const router = express.Router();
// Define your routes here
router.get('/order/', getOrders); //checked
router.get('/order/:id', getOrderById); //checked
router.post('/order/:plantId', protect, createOrder); //checked
router.put('/order/:id', protect, updateOrderById);
router.put('/order/remove/:id', protect, deleteOrderById );

export default router;
