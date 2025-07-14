import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>ⓒ 2025 Apple Clone. 본 사이트는 학습/포트폴리오용으로 제작되었습니다.</p>
        <p>
          <a href="https://www.apple.com/kr/" target="_blank" rel="noopener noreferrer">
            애플 공식 홈페이지 바로가기
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;