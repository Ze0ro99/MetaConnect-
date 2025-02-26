const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// تمكين CORS
app.use(cors({
    origin: 'https://meta-connect-kiawcb5bh-ze0ro99s-projects.vercel.app' // استبدل هذا بالنطاق الصحيح لتطبيقك
}));

// لت解析 طلبات JSON
app.use(express.json());

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// مسارات API
app.use('/api/transactions', require('./routes/transactions'));

// تقديم الملفات الثابتة
app.use(express.static('public'));

// بدء الخادم
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});