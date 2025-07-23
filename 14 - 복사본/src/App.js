import React, { useState } from "react";
import Board from "./components/Board";
import HUD from "./components/HUD";
import "./App.css";

function App() {
  // 게임 전체 상태: 체력, 총알, 게임 오버 등
  const [health, setHealth] = useState(100);
  const [ammo, setAmmo] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);

  // 플레이어가 적에게 맞았을 때
  const handlePlayerHit = (damage) => {
    setHealth((prev) => {
      const next = prev - damage;
      if (next <= 0) setIsGameOver(true);
      return next > 0 ? next : 0;
    });
  };

  // 플레이어가 총을 쏠 때
  const handleShoot = () => {
    setAmmo((prev) => (prev > 0 ? prev - 1 : 0));
  };

  // 탄약 리필(예시)
  const handleReload = () => {
    setAmmo(30);
  };

  // 게임 재시작
  const handleRestart = () => {
    setHealth(100);
    setAmmo(30);
    setIsGameOver(false);
  };

  return (
    <div className="App">
      <HUD health={health} ammo={ammo} onReload={handleReload} />
      <Board
        health={health}
        ammo={ammo}
        isGameOver={isGameOver}
        onPlayerHit={handlePlayerHit}
        onShoot={handleShoot}
      />
      {isGameOver && (
        <div className="game-over">
          <h2>Game Over</h2>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default App;