import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startingDate: {
    type: Date,
    required: true,
  },
  endingDate: {
    type: Date,
    required: true,
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account", 
    required: true,
  },
  status: {
    type: String,
    enum: ["preparing", "on-going", "ended", "cancelled"],
    default: "preparing",
  },
  plants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant", 
    },
  ],
  currentPlantIndex: {
    type: Number,
    default: 0,
  },
  currentBid: {
    type: Number,
    default: 0,
  },
  currentHighestBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account", 
  },
  startTime: Date,
});

const Auction = mongoose.model("Auction", auctionSchema);

export default Auction;
