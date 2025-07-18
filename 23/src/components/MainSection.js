import React from 'react';
import './MainSection.css';

function MainSection() {
  return (
    <main className="main-section">
      <section className="hero">
        <h1>iPhone 15 Pro</h1>
        <p>티타늄. 초강력. 초경량. 초프로.</p>
        <a className="hero-link" href="/">더 알아보기 ></a>
      </section>
      <section className="product product-mac">
        <h2>MacBook Air</h2>
        <p>날렵하게. 강력하게. M3로 새롭게.</p>
        <a className="product-link" href="/">더 알아보기 ></a>
      </section>
      <section className="product product-watch">
        <h2>Apple Watch Series 9</h2>
        <p>더 똑똑. 더 밝게. 더 강력하게.</p>
        <a className="product-link" href="/">더 알아보기 ></a>
      </section>
    </main>
  );
}

export default MainSection;