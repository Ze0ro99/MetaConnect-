const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['deposit', 'withdrawal'], required: true },
  date: { type: Date, default: Date.now }
});

// تصدير النموذج
module.exports = mongoose.model('Transaction', TransactionSchema);
