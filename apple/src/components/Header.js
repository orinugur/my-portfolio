import React from "react";
import { Link } from "react-router-dom";
import "../styles/common.css";

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <ul>
          <li className="logo">
            <Link to="/" style={{ color: "#fff", textDecoration: "none" }}></Link>
          </li>
          <li>
            <Link to="/store" style={{ color: "#fff", textDecoration: "none" }}>스토어</Link>
          </li>
          <li>Mac</li>
          <li>iPad</li>
          <li>iPhone</li>
          <li>Watch</li>
          <li>AirPods</li>
          <li>TV 및 홈</li>
          <li>엔터테인먼트</li>
          <li>액세서리</li>
          <li>고객지원</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;