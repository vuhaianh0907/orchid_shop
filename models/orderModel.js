import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  plantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plant",
    required: true,
  },
  quantity: { type: Number, required: true },
  sendAddress: { type: String, required: true },
  receiveAddress: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled", "returned", "refunded", "completed", "failed", "processing", "packed"],
    default: "pending",
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
