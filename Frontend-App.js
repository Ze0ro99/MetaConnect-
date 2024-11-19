import React from 'react';
import PiLoginButton from './components/PiLoginButton';
import PiPaymentButton from './components/PiPaymentButton';

function App() {
  return (
    <div className="App">
      <h1>Welcome to PiHub</h1>
      <PiLoginButton />
      <PiPaymentButton />
    </div>
  );
}

export default App;

 PiLoginButton.jsimport { Pi } from '@pihq/pi-web-sdk';

const pi = Pi.init({ version: '2.0', sandbox: true });

export default function PiLoginButton() {
  const handleLogin = async () => {
    try {
      const auth = await pi.authenticate();
      alert(`Welcome, ${auth.user.username}!`);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return <button onClick={handleLogin}>Login with Pi</button>;
}
npm install 
