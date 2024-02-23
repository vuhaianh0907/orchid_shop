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
  plants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant",
      required: true,
    },
  ],
  seller: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
  ],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  bids: [
    {
      bidder: { type: mongoose.Schema.ObjectId, ref: "Account" },
      bid: Number,
      time: Date,
      count: { type: Number, default: 1 },
    },
  ],
  status: {
    type: String,
    enum: [ cAuctionStatus.Prepare, cAuctionStatus.MainTime, cAuctionStatus.ExtraTime, cAuctionStatus.Closed ],
    default: cAuctionStatus.Prepare
  },
  timeDuration: { type: Number, default: 0 }, // minutes
  winner: { type: mongoose.Schema.ObjectId, ref: 'User' },
});

const Auction = mongoose.model("Auction", auctionSchema);

export default Auction;
