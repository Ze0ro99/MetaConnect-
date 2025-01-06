import React, { useState } from 'react';
import axios from 'axios';

const Connect = () => {
  const [data, setData] = useState({});
  const [message, setMessage] = useState('');

  const handleConnect = async () => {
    try {
      const response = await axios.post('/api/connect', { info: 'بيانات الاتصال' });
      setMessage(response.data.message);
      setData(response.data.data);
    } catch (error) {
      console.error("حدث خطأ:", error);
      setMessage('فشل الاتصال');
    }
  };

  return (
    <div>
      <h1>MetaConnect</h1>
      <button onClick={handleConnect}>اتصل بالـ API</button>
      {message && <p>{message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default Connect;
