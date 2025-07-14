import React from 'react';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img src="https://static.coupangcdn.com/image/coupang/common/logo_coupang_w350.png" alt="쿠팡 로고" />
      </div>
      <nav className="header__nav">
        <ul>
          <li>로켓배송</li>
          <li>로켓프레시</li>
          <li>쿠팡비즈</li>
          <li>로켓직구</li>
          <li>골드박스</li>
        </ul>
      </nav>
      <div className="header__user">
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </header>
  );
}

export default Header;