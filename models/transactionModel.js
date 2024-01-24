const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    transactionType: { type: String, enum: ['deposit', 'withdrawal'], required: true },
    timestamp: { type: Date, default: Date.now },
  });
  
  const Transaction = mongoose.model('Transaction', TransactionSchema);
  
  module.exports = Transaction;