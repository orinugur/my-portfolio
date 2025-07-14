import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavigationBar.css";

function NavigationBar() {
  return (
    <nav className="nav">
      <div className="nav__logo">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Apple</Link>
      </div>
      <ul className="nav__menu">
        <li>
          <Link to="/store" style={{ color: "inherit", textDecoration: "none" }}>스토어</Link>
        </li>
        <li>Mac</li>
        <li>iPad</li>
        <li>iPhone</li>
        <li>Watch</li>
        <li>AirPods</li>
        <li>고객지원</li>
      </ul>
    </nav>
  );
}

export default NavigationBar;