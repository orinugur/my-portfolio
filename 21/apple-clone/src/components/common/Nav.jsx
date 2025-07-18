import React from "react";
import { Link } from "react-router-dom";
import "../../styles/nav.css";

function Nav() {
  return (
    <nav className="nav">
      <div className="nav__logo">
        <Link to="/">🍏 Apple</Link>
      </div>
      <ul className="nav__menu">
        <li><Link to="/">스토어</Link></li>
        <li><a href="#">Mac</a></li>
        <li><a href="#">iPad</a></li>
        <li><a href="#">iPhone</a></li>
        <li><a href="#">Watch</a></li>
        <li><a href="#">AirPods</a></li>
        <li><a href="#">고객지원</a></li>
      </ul>
      <div className="nav__actions">
        <button className="nav__search" aria-label="검색">🔍</button>
        <button className="nav__cart" aria-label="장바구니">🛒</button>
      </div>
    </nav>
  );
}

export default Nav;