import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Account',
  },
  auction: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Auction',
  },
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Plant',
  },
  amount: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Bid = mongoose.model('Bid', bidSchema);

export default Bid;