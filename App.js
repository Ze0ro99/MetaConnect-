import React from 'react';
import { Pi } from '@pihq/pi-web-sdk';

const pi = Pi.init({ version: '2.0', sandbox: true });

export default function PiLoginButton() {
  const handleLogin = async () => {
    try {
      const auth = await pi.authenticate();
      alert(`Welcome, ${auth.user.username}!`);
      // يمكنك هنا حفظ بيانات المستخدم في حالة (state) أو إرسالها إلى الخادم
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <button className="pi-login-button" onClick={handleLogin}>
      Login with Pi
    </button>
  );
}