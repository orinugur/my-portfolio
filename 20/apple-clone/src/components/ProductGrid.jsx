import React from "react";
import { motion } from "framer-motion";
import "../styles/ProductGrid.css";

function ProductCard({ product }) {
  return (
    <motion.div
      className="product-card"
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(0,0,0,0.12)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <img src={product.img} alt={product.name} className="product-card__img" />
      <div className="product-card__name">{product.name}</div>
      <div className="product-card__desc">{product.desc}</div>
      <div className="product-card__price">{product.price}</div>
      <button className="product-card__buy">구매하기</button>
    </motion.div>
  );
}

function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.name} product={p} />
      ))}
    </div>
  );
}

export default ProductGrid;