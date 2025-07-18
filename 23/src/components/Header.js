import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <ul>
          <li className="logo">
            <a href="/">
              <span role="img" aria-label="Apple"></span>
            </a>
          </li>
          <li><a href="/">스토어</a></li>
          <li><a href="/">Mac</a></li>
          <li><a href="/">iPad</a></li>
          <li><a href="/">iPhone</a></li>
          <li><a href="/">Watch</a></li>
          <li><a href="/">AirPods</a></li>
          <li><a href="/">TV 및 홈</a></li>
          <li><a href="/">엔터테인먼트</a></li>
          <li><a href="/">액세서리</a></li>
          <li><a href="/">고객지원</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;