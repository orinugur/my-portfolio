import React from "react";
import "../../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p>ⓒ 2025 Apple Clone. 모든 권리 보유.</p>
        <ul className="footer__links">
          <li><a href="#">개인정보 처리방침</a></li>
          <li><a href="#">이용약관</a></li>
          <li><a href="#">고객지원</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;