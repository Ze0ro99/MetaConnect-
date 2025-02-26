#!/bin/bash

# Step 1: تثبيت المكتبات المطلوبة
echo "Installing necessary packages..."
npm install express mongoose cors dotenv

# Step 2: إنشاء ملف البيئة .env
echo "Creating .env file..."
cat <<EOL > .env
PORT=3000
MONGO_URI=your_mongodb_connection_string
VALIDATION_KEY=5d8bc63cfa473df9a90c3308432e255c892f4b363143dfd8fa98c6c44d1b0bda13b78ce5a9c195b1648220c33a7b4f026b8176c0a0c87ba421c309533a57480c
EOL

# Step 3: إعداد مسارات API
echo "Setting up API routes..."
mkdir -p routes
cat <<EOL > routes/transactions.js
const express = require('express');
const router = express.Router();

// مثال على مسار GET
router.get('/', (req, res) => {
    res.send('Transactions API');
});

module.exports = router;
EOL

# Step 4: إعداد ملف server.js
echo "Setting up server.js..."
cat <<EOL > server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// تمكين CORS
app.use(cors({
    origin: '‏https://meta-connect-kiawcb5bh-zero99s-projects.vercel.app/validation-key.txt‏' // استبدل هذا بالنطاق الصحيح لتطبيقك
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
    console.log(\`Server running at http://localhost:\${port}\`);
});
EOL

# Step 5: إنشاء ملف validation-key.txt ورفعه إلى النطاق
echo "Creating validation-key.txt..."
cat <<EOL > public/validation-key.txt
5d8bc63cfa473df9a90c3308432e255c892f4b363143dfd8fa98c6c44d1b0bda13b78ce5a9c195b1648220c33a7b4f026b8176c0a0c87ba421c309533a57480c
EOL

# Step 6: تشغيل الخادم
echo "Starting the server..."
node server.js