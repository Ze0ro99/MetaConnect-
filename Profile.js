import React from 'react';
import './Profile.css'; // تأكد من وجود ملف CSS لتنسيق صفحة الملف الشخصي

const Profile = () => {
  // هنا يمكنك إضافة حالة أو مكونات لعرض بيانات المستخدم
  const user = {
    username: 'User123',
    email: 'user@example.com',
    balance: 100, // مثال على الرصيد
  };

  return (
    <div className="profile">
      <h2>Your Profile</h2>
      <div className="profile-info">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Balance:</strong> ${user.balance}</p>
      </div>
    </div>
  );
};

export default Profile;
