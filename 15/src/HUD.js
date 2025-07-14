import React, { useContext } from "react";
import "./HUD.css";

// 실제 게임 상태는 Context로 관리하는 것이 이상적이지만, 
// 현재는 Player/Enemy 내부 상태를 props로 전달하거나 전역 상태로 확장 가능
function HUD({ health = 100, ammo = 30 }) {
  return (
    <div className="hud">
      <div className="hud-bar">
        <span>체력: {health}</span>
      </div>
      <div className="hud-bar">
        <span>총알: {ammo}</span>
      </div>
    </div>
  );
}

export default HUD;