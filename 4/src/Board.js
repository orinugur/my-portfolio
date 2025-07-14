import React, { useState, useEffect, useRef, useCallback } from "react";
import Cell from "./Cell";
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  TETROMINOS,
  randomTetromino,
  checkCollision,
  rotate,
  createEmptyBoard,
  mergeTetromino,
  clearLines,
} from "./utils";
import "./Board.css";

function Board({ onScore, onGameOver, gameOver }) {
  const [board, setBoard] = useState(createEmptyBoard());
  const [current, setCurrent] = useState({
    tetromino: randomTetromino(),
    pos: { x: Math.floor(BOARD_WIDTH / 2) - 2, y: 0 },
    rotation: 0,
  });
  const [intervalMs, setIntervalMs] = useState(500);
  const [dropTime, setDropTime] = useState(Date.now());
  const [isRunning, setIsRunning] = useState(true);

  const requestRef = useRef();

  // 블록이 내려가는 타이밍
  useEffect(() => {
    if (!isRunning || gameOver) return;
    const tick = () => {
      if (Date.now() - dropTime > intervalMs) {
        moveDown();
        setDropTime(Date.now());
      }
      requestRef.current = requestAnimationFrame(tick);
    };
    requestRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(requestRef.current);
    // eslint-disable-next-line
  }, [dropTime, intervalMs, isRunning, gameOver, current]);

  // 키보드 이벤트
  useEffect(() => {
    if (gameOver) return;
    const handleKeyDown = (e) => {
      if (!isRunning) return;
      if (e.key === "ArrowLeft") {
        move(-1, 0, 0);
      } else if (e.key === "ArrowRight") {
        move(1, 0, 0);
      } else if (e.key === "ArrowDown") {
        moveDown();
      } else if (e.key === "ArrowUp") {
        rotateTetromino();
      } else if (e.key === " ") {
        hardDrop();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line
  }, [current, isRunning, gameOver]);

  // 게임 리셋
  useEffect(() => {
    if (!gameOver) {
      setBoard(createEmptyBoard());
      setCurrent({
        tetromino: randomTetromino(),
        pos: { x: Math.floor(BOARD_WIDTH / 2) - 2, y: 0 },
        rotation: 0,
      });
      setIsRunning(true);
      setIntervalMs(500);
      setDropTime(Date.now());
    } else {
      setIsRunning(false);
    }
    // eslint-disable-next-line
  }, [gameOver]);

  // 블록 이동
  const move = useCallback(
    (dx, dy, dr) => {
      const { tetromino, pos, rotation } = current;
      const newRotation = (rotation + dr + 4) % 4;
      const newPos = { x: pos.x + dx, y: pos.y + dy };
      if (
        !checkCollision(
          tetromino,
          newPos,
          newRotation,
          board
        )
      ) {
        setCurrent({
          tetromino,
          pos: newPos,
          rotation: newRotation,
        });
      }
    },
    [current, board]
  );

  // 블록 회전
  const rotateTetromino = useCallback(() => {
    move(0, 0, 1);
  }, [move]);

  // 블록 아래로 이동
  const moveDown = useCallback(() => {
    const { tetromino, pos, rotation } = current;
    const newPos = { x: pos.x, y: pos.y + 1 };
    if (
      !checkCollision(
        tetromino,
        newPos,
        rotation,
        board
      )
    ) {
      setCurrent({
        tetromino,
        pos: newPos,
        rotation,
      });
    } else {
      // 바닥에 닿음
      const merged = mergeTetromino(board, tetromino, pos, rotation);
      const { newBoard, linesCleared } = clearLines(merged);
      setBoard(newBoard);
      if (linesCleared > 0) {
        onScore(linesCleared);
        setIntervalMs((ms) => Math.max(100, ms - linesCleared * 20));
      }
      // 새 블록 생성
      const nextTetromino = randomTetromino();
      const startPos = { x: Math.floor(BOARD_WIDTH / 2) - 2, y: 0 };
      if (
        checkCollision(
          nextTetromino,
          startPos,
          0,
          newBoard
        )
      ) {
        // 게임 오버
        setIsRunning(false);
        onGameOver();
      } else {
        setCurrent({
          tetromino: nextTetromino,
          pos: startPos,
          rotation: 0,
        });
      }
    }
  }, [current, board, onScore, onGameOver]);

  // 하드드롭
  const hardDrop = useCallback(() => {
    let { tetromino, pos, rotation } = current;
    let y = pos.y;
    while (
      !checkCollision(
        tetromino,
        { x: pos.x, y: y + 1 },
        rotation,
        board
      )
    ) {
      y++;
    }
    setCurrent({
      tetromino,
      pos: { x: pos.x, y },
      rotation,
    });
    setTimeout(moveDown, 0);
  }, [current, board, moveDown]);

  // 현재 블록을 보드에 합쳐서 렌더링용 보드 생성
  const displayBoard = (() => {
    const temp = board.map((row) => [...row]);
    const { tetromino, pos, rotation } = current;
    for (let y = 0; y < tetromino.shape[rotation].length; y++) {
      for (let x = 0; x < tetromino.shape[rotation][y].length; x++) {
        if (tetromino.shape[rotation][y][x]) {
          const boardY = pos.y + y;
          const boardX = pos.x + x;
          if (
            boardY >= 0 &&
            boardY < BOARD_HEIGHT &&
            boardX >= 0 &&
            boardX < BOARD_WIDTH
          ) {
            temp[boardY][boardX] = {
              color: tetromino.color,
              ghost: false,
            };
          }
        }
      }
    }
    // 고스트 블록 표시
    let ghostY = pos.y;
    while (
      !checkCollision(
        tetromino,
        { x: pos.x, y: ghostY + 1 },
        rotation,
        board
      )
    ) {
      ghostY++;
    }
    for (let y = 0; y < tetromino.shape[rotation].length; y++) {
      for (let x = 0; x < tetromino.shape[rotation][y].length; x++) {
        if (tetromino.shape[rotation][y][x]) {
          const boardY = ghostY + y;
          const boardX = pos.x + x;
          if (
            boardY >= 0 &&
            boardY < BOARD_HEIGHT &&
            boardX >= 0 &&
            boardX < BOARD_WIDTH &&
            !temp[boardY][boardX]
          ) {
            temp[boardY][boardX] = {
              color: tetromino.color,
              ghost: true,
            };
          }
        }
      }
    }
    return temp;
  })();

  return (
    <div className="Board">
      {displayBoard.map((row, y) => (
        <div className="board-row" key={y}>
          {row.map((cell, x) => (
            <Cell key={x} value={cell} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;