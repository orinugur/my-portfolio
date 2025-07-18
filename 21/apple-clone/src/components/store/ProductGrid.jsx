import React, { useState } from "react";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    category: "iphone",
    price: "1,550,000원",
    image: "/assets/product-iphone15pro.jpg",
    desc: "티타늄. 초강력. 초경량. 초프로.",
  },
  {
    id: 2,
    name: "MacBook Air M3",
    category: "mac",
    price: "1,690,000원",
    image: "/assets/product-macbookair.jpg",
    desc: "M3 칩 탑재. 더 강력해진 휴대성.",
  },
  {
    id: 3,
    name: "iPad Pro",
    category: "ipad",
    price: "1,250,000원",
    image: "/assets/product-ipadpro.jpg",
    desc: "M4 칩. OLED 디스플레이.",
  },
  {
    id: 4,
    name: "Apple Watch Series 9",
    category: "watch",
    price: "599,000원",
    image: "/assets/product-watch.jpg",
    desc: "건강, 피트니스, 연결.",
  },
  {
    id: 5,
    name: "AirPods Pro 2",
    category: "airpods",
    price: "359,000원",
    image: "/assets/product-airpodspro.jpg",
    desc: "적응형 오디오. 액티브 노이즈 캔슬링.",
  },
];

function ProductGrid({ category = "all" }) {
  const [hovered, setHovered] = useState(null);

  const filtered = category === "all"
    ? products
    : products.filter((p) => p.category === category);

  return (
    <section className="product-grid">
      <div className="product-grid__list">
        {filtered.map((product) => (
          <motion.div
            key={product.id}
            className="product-card"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
            onMouseEnter={() => setHovered(product.id)}
            onMouseLeave={() => setHovered(null)}
            tabIndex={0}
          >
            <div className="product-card__img-wrap">
              <img
                src={product.image}
                alt={product.name}
                className="product-card__img"
                loading="lazy"
              />
            </div>
            <div className="product-card__info">
              <h3 className="product-card__name">{product.name}</h3>
              <p className="product-card__desc">{product.desc}</p>
              <div className="product-card__price">{product.price}</div>
            </div>
            {hovered === product.id && (
              <motion.div
                className="product-card__hover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <button className="product-card__buy">구매하기</button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;