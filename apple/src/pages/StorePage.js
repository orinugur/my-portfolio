import React from "react";
import "../styles/common.css";

function StorePage() {
  return (
    <main className="store-page">
      <section className="store-hero">
        <h1>스토어. 좋아하는 Apple 제품을<br />구입하는 가장 좋은 방법.</h1>
        <p>전문가의 쇼핑 지원, 다양한 혜택, 최신 제품을 한 곳에서.</p>
      </section>
      <section className="store-categories">
        <h2>카테고리</h2>
        <div className="category-list">
          <div className="category-item">Mac</div>
          <div className="category-item">iPhone</div>
          <div className="category-item">iPad</div>
          <div className="category-item">Apple Watch</div>
          <div className="category-item">AirPods</div>
          <div className="category-item">액세서리</div>
        </div>
      </section>
      <section className="store-featured">
        <h2>추천 제품</h2>
        <div className="featured-list">
          <div className="featured-item">
            <h3>MacBook Air M3</h3>
            <p>가장 얇고 가벼운 MacBook</p>
            <button>구매하기</button>
          </div>
          <div className="featured-item">
            <h3>iPhone 15 Pro</h3>
            <p>티타늄. 초강력. 초경량. 초프로.</p>
            <button>구매하기</button>
          </div>
          <div className="featured-item">
            <h3>Apple Watch Series 9</h3>
            <p>더 똑똑해진 건강 파트너</p>
            <button>구매하기</button>
          </div>
        </div>
      </section>
      <section className="store-promo">
        <h2>프로모션</h2>
        <div className="promo-banner">
          <span>최대 12개월 무이자 할부</span>
        </div>
      </section>
    </main>
  );
}

export default StorePage;