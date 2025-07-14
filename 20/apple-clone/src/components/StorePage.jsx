import React, { useState, useMemo } from "react";
import Banner from "./Banner";
import CategoryTabs from "./CategoryTabs";
import ProductGrid from "./ProductGrid";
import BenefitSection from "./BenefitSection";
import "../styles/Banner.css";
import "../styles/CategoryTabs.css";
import "../styles/ProductGrid.css";
import "../styles/BenefitSection.css";
import "../styles/StorePage.css";

const banners = [
  {
    img: "https://www.apple.com/v/store/bd/images/promos/iphone-15-pro/promo_iphone15pro__e48p7n5x3nsm_large.jpg",
    title: "iPhone 15 Pro 출시",
    desc: "가장 강력한 iPhone. Pro 그 이상.",
    cta: "자세히 보기",
  },
  {
    img: "https://www.apple.com/v/store/bd/images/promos/ipad-pro/promo_ipadpro__ch217v9v7no2_large.jpg",
    title: "새로운 iPad Pro",
    desc: "M4 칩 탑재. 가장 얇고 가벼운 iPad.",
    cta: "구매하기",
  },
  {
    img: "https://www.apple.com/v/store/bd/images/promos/macbook-air-m3/promo_macbookair__fek74r6y6oi2_large.jpg",
    title: "MacBook Air M3",
    desc: "M3 칩 탑재. 더 빠르고 강력하게.",
    cta: "더 알아보기",
  },
];

const categories = ["전체", "iPhone", "iPad", "Mac", "Watch", "AirPods"];

const products = [
  {
    category: "iPhone",
    name: "iPhone 15 Pro",
    desc: "가장 강력한 iPhone. Pro 그 이상.",
    img: "https://www.apple.com/v/store/bd/images/product/iphone/iphone_15_pro__en4b7a6y7xoy_large.png",
    price: "1,550,000원~",
  },
  {
    category: "iPad",
    name: "iPad Pro",
    desc: "M4 칩 탑재. 가장 얇고 가벼운 iPad.",
    img: "https://www.apple.com/v/store/bd/images/product/ipad/ipad_pro__b1gk2b4b3r2a_large.png",
    price: "1,249,000원~",
  },
  {
    category: "Mac",
    name: "MacBook Air",
    desc: "M3 칩 탑재. 더 빠르고 강력하게.",
    img: "https://www.apple.com/v/store/bd/images/product/mac/macbook_air__fek74r6y6oi2_large.png",
    price: "1,390,000원~",
  },
  {
    category: "Watch",
    name: "Apple Watch",
    desc: "건강, 피트니스, 연결. 손목 위의 혁신.",
    img: "https://www.apple.com/v/store/bd/images/product/watch/apple_watch__b1gk2b4b3r2a_large.png",
    price: "499,000원~",
  },
  {
    category: "AirPods",
    name: "AirPods Pro",
    desc: "액티브 노이즈 캔슬링, 공간 음향.",
    img: "https://www.apple.com/v/store/bd/images/product/airpods/airpods_pro__en4b7a6y7xoy_large.png",
    price: "359,000원",
  },
];

const benefits = [
  { icon: "🚚", text: "무료 배송 및 빠른 도착" },
  { icon: "💳", text: "무이자 할부 및 다양한 결제" },
  { icon: "♻️", text: "보상판매 및 친환경 정책" },
];

function StorePage() {
  const [bannerIdx, setBannerIdx] = useState(0);
  const [category, setCategory] = useState("전체");

  const filteredProducts = useMemo(
    () =>
      category === "전체"
        ? products
        : products.filter((p) => p.category === category),
    [category]
  );

  return (
    <div className="store">
      <Banner banners={banners} current={bannerIdx} onChange={setBannerIdx} />
      <CategoryTabs
        categories={categories}
        active={category}
        onChange={setCategory}
      />
      <ProductGrid products={filteredProducts} />
      <BenefitSection benefits={benefits} />
    </div>
  );
}

export default StorePage;