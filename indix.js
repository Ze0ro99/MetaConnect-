const express = require('express');
const { Sequelize } = require('sequelize');

// إعداد قاعدة البيانات
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

// اختبار الاتصال بقاعدة البيانات
sequelize.authenticate()
  .then(() => {
    console.log('Connected to the PostgreSQL database successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// إعداد Express
const app = express();
app.use(express.json());

// إعداد مسار أساسي
app.get('/', (req, res) => {
  res.send('Welcome to Metaconnect API!');
});

// بدء الخادم
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
