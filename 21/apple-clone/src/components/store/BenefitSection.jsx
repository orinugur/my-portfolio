import React from "react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: "🚚",
    title: "무료 배송",
    desc: "모든 제품 무료 배송 및 빠른 도착.",
  },
  {
    icon: "💳",
    title: "무이자 할부",
    desc: "최대 24개월 무이자 할부 지원.",
  },
  {
    icon: "🔄",
    title: "무료 반품",
    desc: "14일 이내 무료 반품 서비스.",
  },
  {
    icon: "🎁",
    title: "선물 포장",
    desc: "특별한 선물 포장 옵션 제공.",
  },
];

function BenefitSection() {
  return (
    <section className="benefit-section">
      <h2 className="benefit-section__title">Apple Store만의 혜택</h2>
      <div className="benefit-section__list">
        {benefits.map((b, i) => (
          <motion.div
            className="benefit-card"
            key={b.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div className="benefit-card__icon">{b.icon}</div>
            <div className="benefit-card__info">
              <div className="benefit-card__title">{b.title}</div>
              <div className="benefit-card__desc">{b.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default BenefitSection;