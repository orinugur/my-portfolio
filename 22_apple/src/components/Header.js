import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo"></Link>
        <Link to="/store">Store</Link>
        <a href="https://www.apple.com/kr/mac/" target="_blank" rel="noopener noreferrer">Mac</a>
        <a href="https://www.apple.com/kr/ipad/" target="_blank" rel="noopener noreferrer">iPad</a>
        <a href="https://www.apple.com/kr/iphone/" target="_blank" rel="noopener noreferrer">iPhone</a>
        <a href="https://www.apple.com/kr/watch/" target="_blank" rel="noopener noreferrer">Watch</a>
        <a href="https://www.apple.com/kr/airpods/" target="_blank" rel="noopener noreferrer">AirPods</a>
        <a href="https://www.apple.com/kr/support/" target="_blank" rel="noopener noreferrer">고객지원</a>
      </nav>
    </header>
  );
}

export default Header;