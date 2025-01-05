const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Deposit route
router.post('/deposit', async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const newTransaction = new Transaction({ user: userId, amount, type: 'deposit' });
    await newTransaction.save();
    await User.findByIdAndUpdate(userId, { $inc: { balance: amount } });
    res.status(200).json({ message: 'Deposit successful', transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ message: 'Error processing deposit', error });
  }
});

// Withdrawal route
router.post('/withdraw', async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    const newTransaction = new Transaction({ user: userId, amount, type: 'withdrawal' });
    await newTransaction.save();
    await User.findByIdAndUpdate(userId, { $inc: { balance: -amount } });
    res.status(200).json({ message: 'Withdrawal successful', transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ message: 'Error processing withdrawal', error });
  }
});

module.exports = router;
