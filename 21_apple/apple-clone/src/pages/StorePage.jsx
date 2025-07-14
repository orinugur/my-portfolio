import React, { useState } from "react";
import Hero from "../components/store/Hero";
import Banner from "../components/store/Banner";
import CategoryTabs from "../components/store/CategoryTabs";
import ProductGrid from "../components/store/ProductGrid";
import BenefitSection from "../components/store/BenefitSection";
import "../styles/banner.css";
import "../styles/category-tabs.css";
import "../styles/product-grid.css";
import "../styles/benefit-section.css";

function StorePage() {
  const [category, setCategory] = useState("all");

  return (
    <div className="store-page">
      <Hero />
      <Banner />
      <CategoryTabs
        activeCategory={category}
        onSelect={setCategory}
      />
      <ProductGrid category={category} />
      <BenefitSection />
    </div>
  );
}

export default StorePage;