import React, { useState, useEffect, useCallback } from "react";
import Board from "./Board";
import { getRandomTetromino, checkCollision, getNextBoard, BOARD_WIDTH, BOARD_HEIGHT } from "./utils";

function App() {
  const [board, setBoard] = useState(Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0)));
  const [current, setCurrent] = useState(getRandomTetromino());
  const [pos, setPos] = useState({ x: 3, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // 블록 이동 및 충돌 처리
  const move = useCallback(
    (dx, dy, rotate = false) => {
      if (gameOver) return;
      let next = { ...pos, x: pos.x + dx, y: pos.y + dy };
      let tetro = current;
      if (rotate) {
        tetro = {
          ...current,
          shape: current.shape[0].map((_, i) => current.shape.map(row => row[i]).reverse())
        };
      }
      if (!checkCollision(board, tetro, next)) {
        setPos(next);
        if (rotate) setCurrent(tetro);
      } else if (dy === 1) {
        // 바닥에 닿으면 보드에 고정
        const { newBoard, cleared } = getNextBoard(board, current, pos);
        setBoard(newBoard);
        setScore(s => s + cleared * 100);
        const nextTetro = getRandomTetromino();
        if (checkCollision(newBoard, nextTetro, { x: 3, y: 0 })) {
          setGameOver(true);
        } else {
          setCurrent(nextTetro);
          setPos({ x: 3, y: 0 });
        }
      }
    },
    [board, current, pos, gameOver]
  );

  // 키보드 이벤트
  useEffect(() => {
    const handleKey = e => {
      if (gameOver) return;
      if (e.key === "ArrowLeft") move(-1, 0);
      if (e.key === "ArrowRight") move(1, 0);
      if (e.key === "ArrowDown") move(0, 1);
      if (e.key === "ArrowUp") move(0, 0, true);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [move, gameOver]);

  // 자동 낙하
  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(() => move(0, 1), 500);
    return () => clearInterval(timer);
  }, [move, gameOver]);

  // 현재 블록을 보드에 임시로 합쳐서 렌더링
  const displayBoard = board.map(row => [...row]);
  current.shape.forEach((r, y) =>
    r.forEach((cell, x) => {
      if (cell && pos.y + y >= 0 && pos.y + y < BOARD_HEIGHT && pos.x + x >= 0 && pos.x + x < BOARD_WIDTH) {
        displayBoard[pos.y + y][pos.x + x] = current.color;
      }
    })
  );

  const handleRestart = () => {
    setBoard(Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0)));
    setCurrent(getRandomTetromino());
    setPos({ x: 3, y: 0 });
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="app">
      <h1>React Tetris</h1>
      <Board board={displayBoard} />
      <div className="info">
        <div>점수: {score}</div>
        {gameOver && (
          <div>
            <div>게임 오버!</div>
            <button onClick={handleRestart}>다시 시작</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;