import React from "react";
import { motion } from "framer-motion";
import "../../styles/hero.css";

function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="hero__content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="hero__title">Apple Store</h1>
        <p className="hero__desc">
          혁신적인 Apple 제품을 가장 빠르고 안전하게 만나보세요.<br />
          최신 iPhone, Mac, iPad, Watch, AirPods 등 다양한 제품과 특별한 혜택을 경험하세요.
        </p>
        <img
          className="hero__img"
          src="/assets/hero-main.jpg"
          alt="Apple Store Hero"
          loading="lazy"
        />
      </motion.div>
    </section>
  );
}

export default Hero;