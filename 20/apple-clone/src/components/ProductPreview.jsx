import React from "react";
import "../styles/ProductPreview.css";

function ProductPreview() {
  return (
    <section className="product-preview">
      <h2 className="product-preview__title">주요 제품</h2>
      <div className="product-preview__list">
        <div className="product-card">
          <img
            src="https://www.apple.com/v/home/bd/images/promos/iphone-15-pro/promo_iphone15pro__e48p7n5x3nsm_large.jpg"
            alt="iPhone 15 Pro"
            className="product-card__img"
          />
          <div className="product-card__name">iPhone 15 Pro</div>
        </div>
        <div className="product-card">
          <img
            src="https://www.apple.com/v/home/bd/images/promos/ipad-pro/promo_ipadpro__ch217v9v7no2_large.jpg"
            alt="iPad Pro"
            className="product-card__img"
          />
          <div className="product-card__name">iPad Pro</div>
        </div>
        <div className="product-card">
          <img
            src="https://www.apple.com/v/home/bd/images/promos/macbook-air-m3/promo_macbookair__fek74r6y6oi2_large.jpg"
            alt="MacBook Air"
            className="product-card__img"
          />
          <div className="product-card__name">MacBook Air</div>
        </div>
      </div>
    </section>
  );
}

export default ProductPreview;