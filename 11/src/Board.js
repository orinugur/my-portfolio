import React, { useState, useEffect, useRef } from "react";
import Cell from "./Cell";
import { initialMap, MARIO, GOAL, GROUND, OBSTACLE, ENEMY, BULLET, MUSHROOM, getMarioInitPos, createInitialMap } from "./utils";
import "./Board.css";

const ROWS = initialMap.length;
const COLS = initialMap[0].length;
const ENEMY_SEED = 20250707; // 날짜 기반 시드
const ENEMY_COUNT = 2; // 적 개수

function Board() {
  const [map, setMap] = useState(() => createInitialMap(ENEMY_SEED, ENEMY_COUNT));
  const [marioPos, setMarioPos] = useState(getMarioInitPos(initialMap));
  const [isJumping, setIsJumping] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameClear, setGameClear] = useState(false);
  const [score, setScore] = useState(0);
  const [bullets, setBullets] = useState([]); // {x, y, dir}
  const [poweredUp, setPoweredUp] = useState(false); // 파워업 상태
  const jumpRef = useRef(false);

  // 키보드 이벤트
  useEffect(() => {
    if (gameOver || gameClear) return;
    const handleKeyDown = (e) => {
      if (e.repeat) return;
      if (e.key === "ArrowLeft") moveMario(-1, 0);
      if (e.key === "ArrowRight") moveMario(1, 0);
      if (e.key === " " || e.key === "ArrowUp") jumpMario();
      if ((e.key === "x" || e.key === "X" || e.ctrlKey) && poweredUp) fireBullet();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line
  }, [marioPos, isJumping, gameOver, gameClear]);

  // 중력 적용
  useEffect(() => {
    if (gameOver || gameClear) return;
    if (!isJumping) {
      const timer = setTimeout(() => {
        fallMario();
      }, 120);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [marioPos, isJumping, gameOver, gameClear]);

  // 마리오 이동
  const moveMario = (dx, dy) => {
    if (gameOver || gameClear) return;
    const [x, y] = marioPos;
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) return;
    const nextCell = map[ny][nx];
    if (nextCell === OBSTACLE) return;
    if (nextCell === ENEMY) {
      setGameOver(true);
      return;
    }
    if (nextCell === MUSHROOM) {
      setPoweredUp(true);
      setScore((s) => s + 30);
      updateMarioPos(nx, ny, MUSHROOM);
      return;
    }
    if (nextCell === GOAL) {
      setGameClear(true);
      setScore((s) => s + 100);
      return;
    }
    updateMarioPos(nx, ny);
  };

  // 총알 발사(파워업 상태에서만)
  const fireBullet = () => {
    if (gameOver || gameClear || !poweredUp) return;
    const [x, y] = marioPos;
    setBullets((prev) => [
      ...prev,
      { x: x + 1, y, dir: 1 }
    ]);
  };

  // 총알 이동 및 충돌
  useEffect(() => {
    if (gameOver || gameClear) return;
    if (bullets.length === 0) return;
    const timer = setInterval(() => {
      setBullets((prevBullets) => {
        let updated = [];
        let newMap = map.map((row) => [...row]);
        prevBullets.forEach((b) => {
          let nx = b.x + b.dir;
          let ny = b.y;
          if (nx < 0 || nx >= COLS) return; // 화면 밖
          if (newMap[ny][nx] === OBSTACLE) return; // 벽에 닿으면 삭제
          if (newMap[ny][nx] === ENEMY) {
            newMap[ny][nx] = GROUND;
            setScore((s) => s + 50);
            return; // 적에 닿으면 삭제
          }
          updated.push({ x: nx, y: ny, dir: b.dir });
        });
        setMap(newMap);
        return updated;
      });
    }, 60);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [bullets, map, gameOver, gameClear]);

  // 점프
  const jumpMario = () => {
    if (isJumping || gameOver || gameClear) return;
    setIsJumping(true);
    jumpRef.current = true;
    let jumpHeight = 2;
    let [x, y] = marioPos;
    const jump = () => {
      if (jumpHeight === 0) {
        setIsJumping(false);
        jumpRef.current = false;
        return;
      }
      const ny = y - 1;
      if (ny < 0 || map[ny][x] === OBSTACLE) {
        setIsJumping(false);
        jumpRef.current = false;
        return;
      }
      y = ny;
      updateMarioPos(x, y);
      jumpHeight--;
      setTimeout(jump, 90);
    };
    jump();
  };

  // 낙하(중력) + 적 밟기
  const fallMario = () => {
    if (isJumping || gameOver || gameClear) return;
    const [x, y] = marioPos;
    const ny = y + 1;
    if (ny >= ROWS) return;
    const nextCell = map[ny][x];
    if (nextCell === OBSTACLE) return;
    if (nextCell === ENEMY) {
      // 점프 중 아래로 이동(=밟기)이면 적 제거, 점수 증가
      if (isJumping) {
        setMap((prev) => {
          const newMap = prev.map((row) => [...row]);
          newMap[ny][x] = GROUND;
          return newMap;
        });
        setScore((s) => s + 50);
        // 마리오는 적 위로 이동
        updateMarioPos(x, ny);
        return;
      } else {
        setGameOver(true);
        return;
      }
    }
    if (nextCell === MUSHROOM) {
      setPoweredUp(true);
      setScore((s) => s + 30);
      updateMarioPos(x, ny, MUSHROOM);
      return;
    }
    if (nextCell === GOAL) {
      setGameClear(true);
      setScore((s) => s + 100);
      return;
    }
    updateMarioPos(x, ny);
  };

  // 마리오 위치 갱신
  const updateMarioPos = (nx, ny, special = null) => {
    setMap((prev) => {
      const newMap = prev.map((row) => [...row]);
      const [px, py] = marioPos;
      if (newMap[py][px] === MARIO) newMap[py][px] = GROUND;
      if (special === MUSHROOM) {
        newMap[ny][nx] = MARIO;
      } else if (newMap[ny][nx] === GROUND) {
        setScore((s) => s + 1);
        newMap[ny][nx] = MARIO;
      } else {
        newMap[ny][nx] = MARIO;
      }
      return newMap;
    });
    setMarioPos([nx, ny]);
  };

  // 게임 재시작
  const handleRestart = () => {
    const newMap = createInitialMap(ENEMY_SEED, ENEMY_COUNT);
    setMap(newMap);
    setMarioPos(getMarioInitPos(newMap));
    setIsJumping(false);
    setGameOver(false);
    setGameClear(false);
    setScore(0);
    setBullets([]);
    setPoweredUp(false);
  };

  return (
    <div className="board-container">
      <div className="score-bar">
        <span>점수: {score}</span>
        {gameOver && <span className="game-over">게임 오버!</span>}
        {gameClear && <span className="game-clear">클리어!</span>}
        {(gameOver || gameClear) && (
          <button className="restart-btn" onClick={handleRestart}>
            다시 시작
          </button>
        )}
      </div>
      <div className="board">
        {map.map((row, y) => (
          <div className="board-row" key={y}>
            {row.map((cell, x) => {
              const bulletHere = bullets.find((b) => b.x === x && b.y === y);
              return (
                <Cell
                  key={x}
                  type={cell}
                  bullet={bulletHere}
                  marioPos={marioPos}
                  poweredUp={poweredUp}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="control-tip">
        ← → : 이동 &nbsp;|&nbsp; ↑ 또는 스페이스 : 점프 &nbsp;|&nbsp; {poweredUp ? "X 또는 Ctrl : 파이어볼" : "파워업(버섯) 먹으면 파이어볼 가능"}
      </div>
    </div>
  );
}

export default Board;