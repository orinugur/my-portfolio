import React from "react";
import "../styles/HeroSection.css";

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">새로운 혁신의 시작</h1>
        <p className="hero__desc">
          Apple의 미니멀하고 세련된 디자인, 그리고 부드러운 사용자 경험을 느껴보세요.
        </p>
        <button className="hero__cta">더 알아보기</button>
      </div>
      <div className="hero__image" />
    </section>
  );
}

export default HeroSection;