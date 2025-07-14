import React, { useState, useEffect } from 'react';
import '../styles/ProductList.css';

const mockProducts = [
  {
    id: 1,
    name: '로켓배송 샘플 상품 1',
    price: 12900,
    image: 'https://static.coupangcdn.com/image/retail/images/2022/01/01/12/0/1234567890.jpg'
  },
  {
    id: 2,
    name: '로켓배송 샘플 상품 2',
    price: 25900,
    image: 'https://static.coupangcdn.com/image/retail/images/2022/01/01/12/0/0987654321.jpg'
  },
  {
    id: 3,
    name: '로켓배송 샘플 상품 3',
    price: 9900,
    image: 'https://static.coupangcdn.com/image/retail/images/2022/01/01/12/0/1122334455.jpg'
  }
];

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 실제 API 연동 시 fetch로 대체
    setProducts(mockProducts);
  }, []);

  return (
    <section className="product-list">
      <h2>오늘의 추천 상품</h2>
      <div className="product-list__grid">
        {products.map((item) => (
          <div className="product-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="product-card__info">
              <div className="product-card__name">{item.name}</div>
              <div className="product-card__price">{item.price.toLocaleString()}원</div>
              <button className="product-card__buy">구매하기</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductList;