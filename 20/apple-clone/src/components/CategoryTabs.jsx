import React from "react";
import { motion } from "framer-motion";
import "../styles/CategoryTabs.css";

function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className="category-tabs">
      {categories.map((cat, idx) => (
        <motion.button
          key={cat}
          className={`category-tab${active === cat ? " active" : ""}`}
          onClick={() => onChange(cat)}
          whileTap={{ scale: 0.95 }}
          layout
        >
          {cat}
          {active === cat && (
            <motion.div
              className="category-tab__underline"
              layoutId="underline"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}

export default CategoryTabs;