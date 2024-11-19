import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // تأكد من وجود ملف CSS لتنسيق شريط الرأس

const Header = () => {
  return (
    <header>
      <h1>MetaConnect</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/virtual-world">Virtual World</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
