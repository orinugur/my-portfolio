import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const banners = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    desc: "티타늄. 초강력. 초경량. 초프로.",
    image: "/assets/banner-iphone15pro.jpg",
    bg: "#f5f5f7",
  },
  {
    id: 2,
    title: "MacBook Air",
    desc: "M3 칩 탑재. 더 강력해진 휴대성.",
    image: "/assets/banner-macbookair.jpg",
    bg: "#e8e8ed",
  },
  {
    id: 3,
    title: "Apple Watch",
    desc: "건강, 피트니스, 연결. 손목 위의 혁신.",
    image: "/assets/banner-watch.jpg",
    bg: "#f5f5f7",
  },
];

const AUTO_SLIDE_INTERVAL = 5000;

function Banner() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, AUTO_SLIDE_INTERVAL);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  const handleDotClick = (i) => setIndex(i);

  return (
    <section
      className="banner"
      style={{ background: banners[index].bg, transition: "background 0.6s" }}
    >
      <div className="banner__content">
        <AnimatePresence mode="wait">
          <motion.div
            key={banners[index].id}
            className="banner__slide"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="banner__title">{banners[index].title}</h2>
            <p className="banner__desc">{banners[index].desc}</p>
            <img
              className="banner__img"
              src={banners[index].image}
              alt={banners[index].title}
              loading="lazy"
            />
          </motion.div>
        </AnimatePresence>
        <div className="banner__dots">
          {banners.map((b, i) => (
            <button
              key={b.id}
              className={`banner__dot${i === index ? " active" : ""}`}
              onClick={() => handleDotClick(i)}
              aria-label={`배너 ${i + 1}번`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Banner;