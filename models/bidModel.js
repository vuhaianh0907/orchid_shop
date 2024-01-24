import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  bidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  auction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auction',
    required: true,
  },
});

const Bid = mongoose.model('Bid', bidSchema);

export default Bid;
//can co track bid trong real-time