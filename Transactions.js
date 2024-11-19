const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// مسار الإيداع
router.post('/deposit', async (req, res) => {
  try {
    const { userId, amount } = req.body;

    // إنشاء معاملة جديدة
    const newTransaction = new Transaction({ user: userId, amount, type: 'deposit' });
    await newTransaction.save();

    // تحديث رصيد المستخدم
    await User.findByIdAndUpdate(userId, { $inc: { balance: amount } });

    res.status(200).json({ message: 'Deposit successful', transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ message: 'Error processing deposit', error });
  }
});

// مسار السحب
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

    // إنشاء معاملة جديدة
    const newTransaction = new Transaction({ user: userId, amount, type: 'withdrawal' });
    await newTransaction.save();

    // تحديث رصيد المستخدم
    await User.findByIdAndUpdate(userId, { $inc: { balance: -amount } });

    res.status(200).json({ message: 'Withdrawal successful', transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ message: 'Error processing withdrawal', error });
  }
});

// تصدير المسارات
module.exports = router;
