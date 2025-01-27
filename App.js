import React from 'react';
import PiLoginButton from './components/PiLoginButton';
import PiPaymentButton from './components/PiPaymentButton';
import './App.css';  // إضافة ملف CSS لتنسيق التطبيق

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to PiHub</h1>
        <p>Your gateway to seamless Pi Network integration.</p>
        <div className="buttons-container">
          <PiLoginButton />
          <PiPaymentButton />
        </div>
      </header>
    </div>
  );
}

export default App;