import React, { useEffect, useState } from "react";

/**
 * HUD(Head-Up Display)
 * - 체력, 탄약, 점수 등 게임 정보를 표시
 */
function HUD({ gameStateRef }) {
  // 강제 리렌더링을 위한 폴링
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick(tick => tick + 1), 50);
    return () => clearInterval(interval);
  }, []);

  const player = gameStateRef.current?.player || { hp: 0, ammo: 0, score: 0 };

  return (
    <div className="hud-overlay" style={{
      position: "absolute",
      left: 0, top: 0, width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 10
    }}>
      <div style={{
        position: "absolute", left: 24, bottom: 24, color: "#fff", fontSize: 22
      }}>
        HP: {player.hp}
      </div>
      <div style={{
        position: "absolute", right: 24, bottom: 24, color: "#fff", fontSize: 22
      }}>
        Ammo: {player.ammo}
      </div>
      <div style={{
        position: "absolute", left: "50%", top: 24, transform: "translateX(-50%)", color: "#ff0", fontSize: 22
      }}>
        Score: {player.score}
      </div>
    </div>
  );
}

export default HUD;