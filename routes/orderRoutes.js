import express from 'express';
import { createOrder, deleteOrderById, getOrderById, getOrders, updateOrderById } from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js'; // Import your authentication middleware

const router = express.Router();
// Define your routes here
router.get('/order/', getOrders); //checked
router.get('/order/:id', getOrderById); //checked
router.post('/order/:plantId', createOrder); //checked
router.put('/order/:id', updateOrderById);
router.put('/order/remove/:id', deleteOrderById );

export default router;
