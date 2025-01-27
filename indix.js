import React from 'react';
import { createRoot } from 'react-dom/client';  // استخدام createRoot بدلاً من ReactDOM.render
import App from './App';
import './index.css';  // تأكد من وجود ملف CSS لتنسيق التطبيق
import reportWebVitals from './reportWebVitals';  // إضافة لقياس أداء التطبيق

// الحصول على العنصر الجذر (root) من DOM
const container = document.getElementById('root');
const root = createRoot(container);  // إنشاء جذر التطبيق

// عرض التطبيق داخل الجذر
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// قياس أداء التطبيق (اختياري)
reportWebVitals();