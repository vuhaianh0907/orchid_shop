import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import generateToken from "../utils/generateToken.js";

//Order functions

//=========================================================================================================

//@desc create a new order
//@route POST /api/orders/
//@access public
const createOrder = asyncHandler(async (req, res) => {
  try {
    const { userId, quantity, sendAddress, receiveAddress } = req.body;
    const plantId = req.params.plantId;

    const newOrder = await Order.create({
      userId,
      plantId,
      quantity,
      sendAddress,
      receiveAddress,
      status: "pending", // Assuming you want the order to be pending upon creation
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//@desc Get all orders
//@route GET /api/orders
//@access public
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('plantId');
  const orderData = orders.map(order => ({
    _id: order._id,
    userId: order.userId,
    plant: {
      plantId: order.plantId,
    },
    quantity: order.quantity,
    sendAddress: order.sendAddress,
    receiveAddress: order.receiveAddress,
    status: order.status,
  }));
  res.status(200).json(orderData);
});

//@desc Get an order by ID
//@route GET /api/orders/:id
//@access public
const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate('plantId');
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

//@desc Update an order by ID
//@route PUT /api/orders/:id
//@access public
const updateOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try{
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  }catch (error) {
    console.error("Error updating order by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  
});

//@desc Delete an order by ID
//@route PUT /api/remove/orders/:id
//@access public
const deleteOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try{
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (deletedOrder) {
      res.status(200).json({ message: "Order is now deleted" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  }
  catch (error) {
    console.error("Error deleting order by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//=========================================================================================================

export {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};
