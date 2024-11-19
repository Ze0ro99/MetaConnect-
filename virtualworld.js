import React from 'react';
import './VirtualWorld.css'; // تأكد من وجود ملف CSS لتنسيق صفحة العالم الافتراضي

const VirtualWorld = () => {
  return (
    <div className="virtual-world">
      <h2>Explore the Virtual World</h2>
      <p>
        Welcome to the Virtual World! Here you can interact with others, create content, and experience the metaverse like never before.
      </p>
      <button className="explore-button">Start Exploring</button>
    </div>
  );
};

export default VirtualWorld;
