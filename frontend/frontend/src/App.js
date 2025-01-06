import React from 'react';
import './App.css';
import Connect from './Connect';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <div className="App">
      <Connect />
      <Analytics /> {/* إضافة مكون Analytics هنا */}
    </div>
  );
}

export default App;
