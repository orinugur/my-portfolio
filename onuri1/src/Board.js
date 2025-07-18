import React, { useState, useEffect, useRef } from "react";
import Cell from "./Cell";
import "./Board.css";
import { TETROMINOS, BLOCK_TYPES, rotate } from "./utils";

const ROWS = 20;
const COLS = 10;
const EMPTY_ROW = () => Array(COLS).fill(0);

function getRandomBlock() {
  const type = BLOCK_TYPES[Math.floor(Math.random() * BLOCK_TYPES.length)];
  return { type, shape: TETROMINOS[type] };
}

function checkCollision(board, shape, pos) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[0].length; x++) {
      if (shape[y][x]) {
        const newY = pos.y + y;
        const newX = pos.x + x;
        if (
          newY < 0 ||
          newY >= ROWS ||
          newX < 0 ||
          newX >= COLS ||
          board[newY][newX]
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function mergeBlock(board, shape, pos) {
  const newBoard = board.map(row => [...row]);
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[0].length; x++) {
      if (shape[y][x]) {
        newBoard[pos.y + y][pos.x + x] = 1;
      }
    }
  }
  return newBoard;
}

function clearLines(board) {
  let cleared = 0;
  const newBoard = board.filter(row => {
    if (row.every(cell => cell)) {
      cleared++;
      return false;
    }
    return true;
  });
  while (newBoard.length < ROWS) {
    newBoard.unshift(EMPTY_ROW());
  }
  return { board: newBoard, cleared };
}

function Board() {
  const [board, setBoard] = useState(Array.from({ length: ROWS }, EMPTY_ROW));
  const [current, setCurrent] = useState(getRandomBlock());
  const [pos, setPos] = useState({ x: 3, y: 0 });
  const [next, setNext] = useState(getRandomBlock());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const dropInterval = useRef();

  // 블럭이 바닥 또는 충돌 시 고정 및 새 블럭
  const fixBlock = () => {
    const merged = mergeBlock(board, current.shape, pos);
    const { board: clearedBoard, cleared } = clearLines(merged);
    setBoard(clearedBoard);
    setScore(s => s + cleared * 100);
    // 새 블럭 생성
    const newBlock = next;
    const newPos = { x: Math.floor((COLS - newBlock.shape[0].length) / 2), y: 0 };
    if (checkCollision(clearedBoard, newBlock.shape, newPos)) {
      setGameOver(true);
      clearInterval(dropInterval.current);
    } else {
      setCurrent(newBlock);
      setNext(getRandomBlock());
      setPos(newPos);
    }
  };

  // 블럭 자동 하강
  useEffect(() => {
    if (gameOver) return;
    dropInterval.current = setInterval(() => {
      move(0, 1);
    }, 500);
    return () => clearInterval(dropInterval.current);
    // eslint-disable-next-line
  }, [current, pos, board, gameOver]);

  // 키보드 이벤트
  useEffect(() => {
    if (gameOver) return;
    const handleKey = e => {
      if (e.repeat) return;
      if (e.key === "ArrowLeft") move(-1, 0);
      if (e.key === "ArrowRight") move(1, 0);
      if (e.key === "ArrowDown") move(0, 1);
      if (e.key === "ArrowUp") rotateBlock();
      if (e.key === " ") hardDrop();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [current, pos, board, gameOver]);

  // 블럭 이동
  function move(dx, dy) {
    const newPos = { x: pos.x + dx, y: pos.y + dy };
    if (!checkCollision(board, current.shape, newPos)) {
      setPos(newPos);
    } else if (dy === 1) {
      fixBlock();
    }
  }

  // 블럭 회전
  function rotateBlock() {
    const rotated = rotate(current.shape);
    if (!checkCollision(board, rotated, pos)) {
      setCurrent(c => ({ ...c, shape: rotated }));
    }
  }

  // 하드드롭
  function hardDrop() {
    let dropY = pos.y;
    while (!checkCollision(board, current.shape, { x: pos.x, y: dropY + 1 })) {
      dropY++;
    }
    setPos(p => ({ ...p, y: dropY }));
    setTimeout(fixBlock, 0);
  }

  // 현재 블럭을 보드에 임시로 합쳐서 렌더링
  function getDisplayBoard() {
    const display = board.map(row => [...row]);
    for (let y = 0; y < current.shape.length; y++) {
      for (let x = 0; x < current.shape[0].length; x++) {
        if (current.shape[y][x]) {
          const by = pos.y + y;
          const bx = pos.x + x;
          if (by >= 0 && by < ROWS && bx >= 0 && bx < COLS) {
            display[by][bx] = 2;
          }
        }
      }
    }
    return display;
  }

  return (
    <div className="Board">
      <div className="Board-info">
        <div>점수: {score}</div>
        <div>다음 블럭: {next.type}</div>
        {gameOver && <div className="game-over">게임 오버</div>}
      </div>
      {getDisplayBoard().map((row, rowIdx) => (
        <div className="Board-row" key={rowIdx}>
          {row.map((cell, colIdx) => (
            <Cell key={colIdx} value={cell} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;