import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Banner.css";

function Banner({ banners, current, onChange }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange((current + 1) % banners.length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [current, banners.length, onChange]);

  return (
    <div className="banner">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="banner__slide"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.6 }}
        >
          <img src={banners[current].img} alt={banners[current].title} className="banner__img" />
          <div className="banner__content">
            <h2 className="banner__title">{banners[current].title}</h2>
            <p className="banner__desc">{banners[current].desc}</p>
            {banners[current].cta && (
              <button className="banner__cta">{banners[current].cta}</button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="banner__dots">
        {banners.map((_, idx) => (
          <button
            key={idx}
            className={`banner__dot${idx === current ? " active" : ""}`}
            onClick={() => onChange(idx)}
            aria-label={`배너 ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;