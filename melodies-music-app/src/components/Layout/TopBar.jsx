//menu top
//props username, avatar, onLogout

import React from 'react';
import '../../style/Home/TopBar.css'; // CSS riêng cho top bar

const TopBar = () => {
  return (
    <div className="TopBar">
      {/* Phần Search */}
      <div className="TopBar-Search">
        <img src="image/Search.png" alt="Search Icon" />
        <input type="text" placeholder="Search for Musics, Artists, Albums ..." />
      </div>

      {/* Phần Menu */}
      <div className="TopBar-Menu">
        <p><a href="#">About</a></p>
        <p><a href="#">Contact</a></p>
        <p><a href="#">Premium</a></p>
      </div>
    </div>
  );
};

export default TopBar;
