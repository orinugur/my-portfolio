import React, { useState, useEffect, useRef } from "react";
import Cell from "./Cell";
import "./Board.css";
import { createInitialEnemies, checkCollision } from "./utils";

const BOARD_WIDTH = 12;
const BOARD_HEIGHT = 18;
const PLAYER_WIDTH = 2;
const ENEMY_WIDTH = 2;
const ENEMY_HEIGHT = 1;
const PLAYER_INIT_X = Math.floor((BOARD_WIDTH - PLAYER_WIDTH) / 2);
const PLAYER_INIT_Y = BOARD_HEIGHT - 2;
const ENEMY_ROWS = 3;
const ENEMY_COLS = 6;
const ENEMY_MOVE_INTERVAL = 30; // 프레임 단위
const BULLET_SPEED = 1; // 한 프레임에 1칸

function Board({ setScore }) {
  const [player, setPlayer] = useState({ x: PLAYER_INIT_X, y: PLAYER_INIT_Y });
  const [enemies, setEnemies] = useState(createInitialEnemies(ENEMY_ROWS, ENEMY_COLS, ENEMY_WIDTH, ENEMY_HEIGHT));
  const [bullets, setBullets] = useState([]);
  const [enemyDir, setEnemyDir] = useState(1); // 1: 오른쪽, -1: 왼쪽
  const [enemyMoveTick, setEnemyMoveTick] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);

  const boardRef = useRef(null);

  // 키보드 입력
  useEffect(() => {
    if (gameOver || gameWin) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setPlayer((prev) => ({
          ...prev,
          x: Math.max(0, prev.x - 1),
        }));
      } else if (e.key === "ArrowRight") {
        setPlayer((prev) => ({
          ...prev,
          x: Math.min(BOARD_WIDTH - PLAYER_WIDTH, prev.x + 1),
        }));
      } else if (e.key === " " || e.key === "Spacebar") {
        setBullets((prev) => [
          ...prev,
          { x: player.x + Math.floor(PLAYER_WIDTH / 2), y: player.y - 1 },
        ]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line
  }, [player, gameOver, gameWin]);

  // 게임 루프
  useEffect(() => {
    if (gameOver || gameWin) return;
    const interval = setInterval(() => {
      // 적 이동
      setEnemyMoveTick((tick) => tick + 1);

      setEnemies((prevEnemies) => {
        let moveEnemies = [...prevEnemies];
        if (enemyMoveTick % ENEMY_MOVE_INTERVAL === 0) {
          // 적이 벽에 닿으면 방향 전환 및 한 칸 아래로
          const hitLeft = moveEnemies.some((e) => e.x <= 0);
          const hitRight = moveEnemies.some((e) => e.x + ENEMY_WIDTH >= BOARD_WIDTH);
          let dir = enemyDir;
          if (hitLeft) dir = 1;
          if (hitRight) dir = -1;
          setEnemyDir(dir);

          moveEnemies = moveEnemies.map((e) => ({
            ...e,
            x: e.x + dir,
            y: hitLeft || hitRight ? e.y + 1 : e.y,
          }));
        }
        return moveEnemies;
      });

      // 총알 이동
      setBullets((prevBullets) =>
        prevBullets
          .map((b) => ({ ...b, y: b.y - BULLET_SPEED }))
          .filter((b) => b.y >= 0)
      );

      // 총알-적 충돌
      setEnemies((prevEnemies) => {
        let newEnemies = [...prevEnemies];
        setBullets((prevBullets) => {
          let newBullets = [];
          prevBullets.forEach((b) => {
            const hitIdx = newEnemies.findIndex((e) =>
              checkCollision(b, e, ENEMY_WIDTH, ENEMY_HEIGHT)
            );
            if (hitIdx !== -1) {
              newEnemies.splice(hitIdx, 1);
              setScore((s) => s + 100);
            } else {
              newBullets.push(b);
            }
          });
          return newBullets;
        });
        return newEnemies;
      });

      // 적-플레이어 충돌
      if (
        enemies.some((e) =>
          checkCollision(
            { x: player.x, y: player.y },
            e,
            ENEMY_WIDTH,
            ENEMY_HEIGHT,
            PLAYER_WIDTH
          )
        )
      ) {
        setGameOver(true);
      }

      // 승리 조건
      if (enemies.length === 0) {
        setGameWin(true);
      }
    }, 30);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [enemyDir, enemyMoveTick, player, enemies, gameOver, gameWin]);

  // 게임 리셋
  const handleRestart = () => {
    setPlayer({ x: PLAYER_INIT_X, y: PLAYER_INIT_Y });
    setEnemies(createInitialEnemies(ENEMY_ROWS, ENEMY_COLS, ENEMY_WIDTH, ENEMY_HEIGHT));
    setBullets([]);
    setEnemyDir(1);
    setEnemyMoveTick(0);
    setGameOver(false);
    setGameWin(false);
    setScore(0);
  };

  // 보드 렌더링
  const cells = [];
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      let type = "empty";
      // 플레이어
      if (
        y === player.y &&
        x >= player.x &&
        x < player.x + PLAYER_WIDTH
      ) {
        type = "player";
      }
      // 적
      for (const e of enemies) {
        if (
          y >= e.y &&
          y < e.y + ENEMY_HEIGHT &&
          x >= e.x &&
          x < e.x + ENEMY_WIDTH
        ) {
          type = "enemy";
        }
      }
      // 총알
      for (const b of bullets) {
        if (b.x === x && b.y === y) {
          type = "bullet";
        }
      }
      cells.push(<Cell key={`${x},${y}`} type={type} />);
    }
  }

  return (
    <div className="board-container">
      <div
        className="board"
        style={{
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, 24px)`,
          gridTemplateRows: `repeat(${BOARD_HEIGHT}, 24px)`,
        }}
        ref={boardRef}
        tabIndex={0}
      >
        {cells}
      </div>
      {(gameOver || gameWin) && (
        <div className="game-message">
          {gameOver ? "게임 오버!" : "클리어! 축하합니다!"}
          <button onClick={handleRestart}>다시 시작</button>
        </div>
      )}
    </div>
  );
}

export default Board;