import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity:{
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
    required: true,
  },
  startingBid: {
    type: Number,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  isAvailableForAuction: {
    type: Boolean,
  },
  isActive: {
    type: Boolean,
  },
  averageRating: {
    type: Number,
  },
}, {
  timestamps: true,
});

const Plant = mongoose.model('Plant', plantSchema);

export default Plant;
