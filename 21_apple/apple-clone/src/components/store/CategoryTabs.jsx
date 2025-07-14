import React, { useState } from "react";
import { motion } from "framer-motion";

const categories = [
  { id: "all", label: "전체" },
  { id: "mac", label: "Mac" },
  { id: "ipad", label: "iPad" },
  { id: "iphone", label: "iPhone" },
  { id: "watch", label: "Watch" },
  { id: "airpods", label: "AirPods" },
];

function CategoryTabs({ onSelect, activeCategory }) {
  const [active, setActive] = useState(activeCategory || "all");

  const handleTabClick = (id) => {
    setActive(id);
    if (onSelect) onSelect(id);
  };

  return (
    <div className="category-tabs">
      <ul className="category-tabs__list">
        {categories.map((cat) => (
          <li key={cat.id} className="category-tabs__item">
            <button
              className={`category-tabs__btn${active === cat.id ? " active" : ""}`}
              onClick={() => handleTabClick(cat.id)}
              type="button"
            >
              {cat.label}
              {active === cat.id && (
                <motion.div
                  className="category-tabs__active"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryTabs;