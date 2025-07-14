import React from 'react';
import './Home.css';

function Home() {
  return (
    <section className="home">
      <div className="hero">
        <h1>Apple</h1>
        <p>당신의 모든 순간을 위한 혁신.</p>
        <img src="https://www.apple.com/v/home/bf/images/heroes/iphone-15-pro/hero_iphone15pro__i70z9oz3hj2i_largetall.jpg" alt="iPhone 15 Pro" className="hero-img" />
      </div>
      <div className="main-products">
        <h2>주요 제품</h2>
        <div className="products-list">
          <div className="product-card">
            <img src="https://www.apple.com/v/home/bf/images/promos/macbook-air-15/promo_macbookair15_midnight__3zojl1nanrme_large.jpg" alt="MacBook Air" />
            <span>MacBook Air</span>
          </div>
          <div className="product-card">
            <img src="https://www.apple.com/v/home/bf/images/promos/ipad/promo_ipad__fioegapg12qi_large.jpg" alt="iPad" />
            <span>iPad</span>
          </div>
          <div className="product-card">
            <img src="https://www.apple.com/v/home/bf/images/promos/apple-watch-series-9/promo_apple_watch_series_9_order__b3u85rm9zf6u_large.jpg" alt="Apple Watch" />
            <span>Apple Watch</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;