import React from "react";
import "../styles/BenefitSection.css";

function BenefitSection({ benefits }) {
  return (
    <div className="benefit-section">
      {benefits.map((b, idx) => (
        <div className="benefit" key={idx}>
          <span className="benefit__icon">{b.icon}</span>
          <span className="benefit__text">{b.text}</span>
        </div>
      ))}
    </div>
  );
}

export default BenefitSection;