import React, { useEffect, useRef, useState } from "react";
import Cell from "./Cell";
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  createEmptyBoard,
  randomTetromino,
  checkCollision,
  mergeTetromino,
  clearLines,
  TETROMINO_COLORS,
} from "./utils";
import "./Board.css";

function Board({ onGameOver, onScoreChange, isGameOver, setIsGameOver }) {
  const [board, setBoard] = useState(createEmptyBoard());
  const [current, setCurrent] = useState(randomTetromino());
  const [pos, setPos] = useState({ x: 3, y: 0 });
  const [score, setScore] = useState(0);
  const [intervalMs, setIntervalMs] = useState(500);

  const requestRef = useRef();

  // 점수 변경 시 부모에 알림
  useEffect(() => {
    onScoreChange(score);
  }, [score, onScoreChange]);

  // 블록 자동 하강
  useEffect(() => {
    if (isGameOver) return;
    const tick = () => {
      moveDown();
      requestRef.current = setTimeout(tick, intervalMs);
    };
    requestRef.current = setTimeout(tick, intervalMs);
    return () => clearTimeout(requestRef.current);
    // eslint-disable-next-line
  }, [current, pos, intervalMs, isGameOver]);

  // 키보드 이벤트
  useEffect(() => {
    if (isGameOver) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") move(-1, 0);
      else if (e.key === "ArrowRight") move(1, 0);
      else if (e.key === "ArrowDown") moveDown();
      else if (e.key === "ArrowUp") rotate();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line
  }, [current, pos, board, isGameOver]);

  function move(dx, dy) {
    const newPos = { x: pos.x + dx, y: pos.y + dy };
    if (!checkCollision(board, current.shape, newPos)) {
      setPos(newPos);
    }
  }

  function moveDown() {
    const newPos = { x: pos.x, y: pos.y + 1 };
    if (!checkCollision(board, current.shape, newPos)) {
      setPos(newPos);
    } else {
      // 바닥에 닿음: 보드에 병합
      const merged = mergeTetromino(board, current.shape, pos, current.type);
      const { newBoard, linesCleared } = clearLines(merged);
      setBoard(newBoard);
      setScore((s) => s + linesCleared * 100);
      // 새 블록 생성
      const next = randomTetromino();
      const startPos = { x: 3, y: 0 };
      if (checkCollision(newBoard, next.shape, startPos)) {
        setIsGameOver(true);
        onGameOver();
      } else {
        setCurrent(next);
        setPos(startPos);
      }
    }
  }

  function rotate() {
    const rotated = current.shape[0].map((_, i) =>
      current.shape.map((row) => row[i]).reverse()
    );
    if (!checkCollision(board, rotated, pos)) {
      setCurrent({ ...current, shape: rotated });
    }
  }

  // 현재 블록을 보드에 임시로 합쳐서 렌더링
  function getDisplayBoard() {
    const display = board.map((row) => [...row]);
    current.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          const px = pos.x + x;
          const py = pos.y + y;
          if (py >= 0 && py < BOARD_HEIGHT && px >= 0 && px < BOARD_WIDTH) {
            display[py][px] = current.type;
          }
        }
      });
    });
    return display;
  }

  return (
    <div className="Board">
      {getDisplayBoard().map((row, y) => (
        <div className="Board-row" key={y}>
          {row.map((cell, x) => (
            <Cell key={x} value={cell} color={TETROMINO_COLORS[cell]} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;