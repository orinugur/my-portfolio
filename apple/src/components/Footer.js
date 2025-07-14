import React from "react";
import "../styles/common.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>ⓒ 2025 Apple Clone. 본 사이트는 포트폴리오용으로 제작되었습니다.</p>
        <p>
          공식 Apple 사이트:{" "}
          <a href="https://www.apple.com/kr/" target="_blank" rel="noopener noreferrer">
            www.apple.com/kr
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;