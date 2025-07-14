import React, { useState, useEffect, useRef } from "react";
import Player from "./Player";
import Bullet from "./Bullet";
import Enemy from "./Enemy";
import { getRandomX } from "./utils";
import "./GameBoard.css";

const BOARD_WIDTH = 400;
const BOARD_HEIGHT = 600;
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 20;
const ENEMY_WIDTH = 40;
const ENEMY_HEIGHT = 20;
const BULLET_WIDTH = 4;
const BULLET_HEIGHT = 10;

function GameBoard() {
  const [playerX, setPlayerX] = useState(BOARD_WIDTH / 2 - PLAYER_WIDTH / 2);
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const boardRef = useRef(null);

  // 플레이어 이동
  useEffect(() => {
    function handleKeyDown(e) {
      if (gameOver) return;
      if (e.key === "ArrowLeft") {
        setPlayerX((x) => Math.max(0, x - 20));
      } else if (e.key === "ArrowRight") {
        setPlayerX((x) => Math.min(BOARD_WIDTH - PLAYER_WIDTH, x + 20));
      } else if (e.key === " " || e.key === "Spacebar") {
        setBullets((prev) => [
          ...prev,
          { x: playerX + PLAYER_WIDTH / 2 - BULLET_WIDTH / 2, y: BOARD_HEIGHT - PLAYER_HEIGHT - BULLET_HEIGHT }
        ]);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerX, gameOver]);

  // 총알 이동
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setBullets((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y - 10 }))
          .filter((b) => b.y > -BULLET_HEIGHT)
      );
    }, 20);
    return () => clearInterval(interval);
  }, [gameOver]);

  // 적 생성 및 이동
  useEffect(() => {
    if (gameOver) return;
    const spawnInterval = setInterval(() => {
      setEnemies((prev) => [
        ...prev,
        { x: getRandomX(BOARD_WIDTH - ENEMY_WIDTH), y: 0, id: Date.now() + Math.random() }
      ]);
    }, 1200);
    return () => clearInterval(spawnInterval);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;
    const moveInterval = setInterval(() => {
      setEnemies((prev) =>
        prev
          .map((e) => ({ ...e, y: e.y + 4 }))
          .filter((e) => e.y < BOARD_HEIGHT)
      );
    }, 20);
    return () => clearInterval(moveInterval);
  }, [gameOver]);

  // 충돌 판정
  useEffect(() => {
    if (gameOver) return;
    setEnemies((prevEnemies) =>
      prevEnemies.filter((enemy) => {
        // 총알과 적 충돌
        let hit = false;
        setBullets((prevBullets) =>
          prevBullets.filter((bullet) => {
            const collide =
              bullet.x < enemy.x + ENEMY_WIDTH &&
              bullet.x + BULLET_WIDTH > enemy.x &&
              bullet.y < enemy.y + ENEMY_HEIGHT &&
              bullet.y + BULLET_HEIGHT > enemy.y;
            if (collide) hit = true;
            return !collide;
          })
        );
        if (hit) setScore((s) => s + 1);
        // 적이 플레이어와 충돌
        const playerCollide =
          enemy.y + ENEMY_HEIGHT > BOARD_HEIGHT - PLAYER_HEIGHT &&
          enemy.x < playerX + PLAYER_WIDTH &&
          enemy.x + ENEMY_WIDTH > playerX;
        if (playerCollide) setGameOver(true);
        return !hit && !playerCollide;
      })
    );
  }, [bullets, playerX, gameOver]);

  function handleRestart() {
    setPlayerX(BOARD_WIDTH / 2 - PLAYER_WIDTH / 2);
    setBullets([]);
    setEnemies([]);
    setScore(0);
    setGameOver(false);
  }

  return (
    <div className="game-board" style={{ width: BOARD_WIDTH, height: BOARD_HEIGHT }} ref={boardRef}>
      <div className="score">점수: {score}</div>
      {gameOver && (
        <div className="game-over">
          <div>게임 오버!</div>
          <button onClick={handleRestart}>다시 시작</button>
        </div>
      )}
      <Player x={playerX} y={BOARD_HEIGHT - PLAYER_HEIGHT} width={PLAYER_WIDTH} height={PLAYER_HEIGHT} />
      {bullets.map((b, i) => (
        <Bullet key={i} x={b.x} y={b.y} width={BULLET_WIDTH} height={BULLET_HEIGHT} />
      ))}
      {enemies.map((e) => (
        <Enemy key={e.id} x={e.x} y={e.y} width={ENEMY_WIDTH} height={ENEMY_HEIGHT} />
      ))}
    </div>
  );
}

export default GameBoard;