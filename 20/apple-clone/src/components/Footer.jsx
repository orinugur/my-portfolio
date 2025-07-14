import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <span>ⓒ 2025 Apple Clone. 모든 권리 보유.</span>
        <span className="footer__links">
          <a href="#">개인정보 처리방침</a> | <a href="#">이용약관</a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;