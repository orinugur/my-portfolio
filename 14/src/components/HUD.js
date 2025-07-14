import React from "react";
import "../styles/HUD.css";

function HUD({ health, ammo, onReload }) {
  return (
    <div className="hud">
      <div className="hud-item">
        <span role="img" aria-label="health">❤️</span> 체력: {health}
      </div>
      <div className="hud-item">
        <span role="img" aria-label="ammo">🔫</span> 총알: {ammo}
        <button className="reload-btn" onClick={onReload}>재장전</button>
      </div>
    </div>
  );
}

export default HUD;