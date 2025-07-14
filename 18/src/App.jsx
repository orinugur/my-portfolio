import React, { useState, useEffect, useRef } from "react";
import "./index.css";

// 테트리스 블록 모양 정의
const TETROMINOS = {
  I: [
    [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
    [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]
  ],
  J: [
    [[1,0,0],[1,1,1],[0,0,0]],
    [[0,1,1],[0,1,0],[0,1,0]],
    [[0,0,0],[1,1,1],[0,0,1]],
    [[0,1,0],[0,1,0],[1,1,0]]
  ],
  L: [
    [[0,0,1],[1,1,1],[0,0,0]],
    [[0,1,0],[0,1,0],[0,1,1]],
    [[0,0,0],[1,1,1],[1,0,0]],
    [[1,1,0],[0,1,0],[0,1,0]]
  ],
  O: [
    [[1,1],[1,1]]
  ],
  S: [
    [[0,1,1],[1,1,0],[0,0,0]],
    [[0,1,0],[0,1,1],[0,0,1]]
  ],
  T: [
    [[0,1,0],[1,1,1],[0,0,0]],
    [[0,1,0],[0,1,1],[0,1,0]],
    [[0,0,0],[1,1,1],[0,1,0]],
    [[0,1,0],[1,1,0],[0,1,0]]
  ],
  Z: [
    [[1,1,0],[0,1,1],[0,0,0]],
    [[0,0,1],[0,1,1],[0,1,0]]
  ]
};

const COLORS = {
  I: "#00f0f0",
  J: "#0000f0",
  L: "#f0a000",
  O: "#f0f000",
  S: "#00f000",
  T: "#a000f0",
  Z: "#f00000"
};

const ROWS = 20;
const COLS = 10;

function randomTetromino() {
  const keys = Object.keys(TETROMINOS);
  const rand = keys[Math.floor(Math.random() * keys.length)];
  return { type: rand, rotation: 0, shape: TETROMINOS[rand][0] };
}

function rotate(shape) {
  // 시계방향 90도 회전
  return shape[0].map((_, i) => shape.map(row => row[i]).reverse());
}

function checkCollision(board, shape, pos) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (
        shape[y][x] &&
        (board[y + pos.y] && board[y + pos.y][x + pos.x]) !== 0
      ) {
        return true;
      }
    }
  }
  return false;
}

function merge(board, shape, pos, type) {
  const newBoard = board.map(row => [...row]);
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        newBoard[y + pos.y][x + pos.x] = type;
      }
    }
  }
  return newBoard;
}

function clearLines(board) {
  let cleared = 0;
  const newBoard = board.filter(row => {
    if (row.every(cell => cell !== 0)) {
      cleared++;
      return false;
    }
    return true;
  });
  while (newBoard.length < ROWS) {
    newBoard.unshift(Array(COLS).fill(0));
  }
  return { board: newBoard, cleared };
}

export default function App() {
  const [board, setBoard] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
  const [current, setCurrent] = useState(randomTetromino());
  const [pos, setPos] = useState({ x: 3, y: 0 });
  const [next, setNext] = useState(randomTetromino());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [intervalMs, setIntervalMs] = useState(500);
  const requestRef = useRef();

  // 블록 자동 하강
  useEffect(() => {
    if (gameOver) return;
    const tick = () => {
      move(0, 1);
      requestRef.current = setTimeout(tick, intervalMs);
    };
    requestRef.current = setTimeout(tick, intervalMs);
    return () => clearTimeout(requestRef.current);
    // eslint-disable-next-line
  }, [current, pos, intervalMs, gameOver]);

  // 키보드 이벤트
  useEffect(() => {
    const handleKey = e => {
      if (gameOver) return;
      if (e.key === "ArrowLeft") move(-1, 0);
      if (e.key === "ArrowRight") move(1, 0);
      if (e.key === "ArrowDown") move(0, 1);
      if (e.key === "ArrowUp") rotateBlock();
      if (e.key === " ") drop();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [current, pos, board, gameOver]);

  function move(dx, dy) {
    const newPos = { x: pos.x + dx, y: pos.y + dy };
    if (!checkCollision(board, current.shape, newPos)) {
      setPos(newPos);
      return true;
    }
    if (dy === 1) {
      // 바닥에 닿음
      const merged = merge(board, current.shape, pos, current.type);
      const { board: clearedBoard, cleared } = clearLines(merged);
      setBoard(clearedBoard);
      setScore(s => s + cleared * 100);
      const nextTetromino = next;
      if (checkCollision(clearedBoard, nextTetromino.shape, { x: 3, y: 0 })) {
        setGameOver(true);
      } else {
        setCurrent(nextTetromino);
        setNext(randomTetromino());
        setPos({ x: 3, y: 0 });
      }
    }
    return false;
  }

  function rotateBlock() {
    const shapes = TETROMINOS[current.type];
    const nextRotation = (current.rotation + 1) % shapes.length;
    const nextShape = shapes[nextRotation];
    if (!checkCollision(board, nextShape, pos)) {
      setCurrent({ ...current, rotation: nextRotation, shape: nextShape });
    }
  }

  function drop() {
    let newY = pos.y;
    while (!checkCollision(board, current.shape, { x: pos.x, y: newY + 1 })) {
      newY++;
    }
    setPos({ ...pos, y: newY });
    move(0, 1); // 바닥에 닿게 함
  }

  function restart() {
    setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
    setCurrent(randomTetromino());
    setNext(randomTetromino());
    setPos({ x: 3, y: 0 });
    setScore(0);
    setGameOver(false);
    setIntervalMs(500);
  }

  // 난이도 점진적 상승
  useEffect(() => {
    setIntervalMs(Math.max(100, 500 - Math.floor(score / 500) * 50));
  }, [score]);

  // 렌더링
  return (
    <div className="tetris-root">
      <h1>React Tetris</h1>
      <div className="tetris-container">
        <div className="tetris-board">
          {board.map((row, y) =>
            row.map((cell, x) => {
              let color = cell ? COLORS[cell] : "#222";
              // 현재 블록 표시
              if (
                y >= pos.y &&
                y < pos.y + current.shape.length &&
                x >= pos.x &&
                x < pos.x + current.shape[0].length &&
                current.shape[y - pos.y]?.[x - pos.x]
              ) {
                color = COLORS[current.type];
              }
              return (
                <div
                  key={x + "," + y}
                  className="tetris-cell"
                  style={{ background: color, border: cell || (color !== "#222") ? "1px solid #444" : "1px solid #222" }}
                />
              );
            })
          )}
        </div>
        <div className="tetris-side">
          <div>
            <b>다음 블록</b>
            <div className="tetris-next">
              {next.shape.map((row, y) =>
                row.map((cell, x) => (
                  <div
                    key={x + "," + y}
                    className="tetris-cell"
                    style={{
                      background: cell ? COLORS[next.type] : "#222",
                      width: 20,
                      height: 20,
                      border: cell ? "1px solid #444" : "1px solid #222"
                    }}
                  />
                ))
              )}
            </div>
          </div>
          <div className="tetris-score">
            <b>점수</b>
            <div>{score}</div>
          </div>
          {gameOver && (
            <div className="tetris-gameover">
              <b>게임 오버</b>
              <button onClick={restart}>다시 시작</button>
            </div>
          )}
        </div>
      </div>
      <div className="tetris-controls">
        <b>조작법</b>
        <ul>
          <li>← → : 좌우 이동</li>
          <li>↓ : 빠른 하강</li>
          <li>↑ : 회전</li>
          <li>스페이스 : 하드드롭</li>
        </ul>
      </div>
    </div>
  );
}