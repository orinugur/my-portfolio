import React from "react";
import "../styles/common.css";

function ProductSection() {
  return (
    <section className="product-section">
      <div className="product">
        <h2>MacBook Air</h2>
        <p>얇고 가벼운 디자인, 강력한 성능.</p>
        <a className="product-link" href="#">구매하기 ></a>
      </div>
      <div className="product">
        <h2>iPad Pro</h2>
        <p>놀라운 성능과 휴대성.</p>
        <a className="product-link" href="#">더 알아보기 ></a>
      </div>
      <div className="product">
        <h2>Apple Watch</h2>
        <p>건강, 피트니스, 연결. 손목 위의 혁신.</p>
        <a className="product-link" href="#">구매하기 ></a>
      </div>
    </section>
  );
}

export default ProductSection;