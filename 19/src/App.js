import React, { useState, useEffect, useRef } from 'react';
import Board from './components/Board';
import { getRandomTetromino, rotateTetromino, checkCollision, mergeTetromino, clearRows, BOARD_WIDTH, BOARD_HEIGHT } from './utils/tetrominoes';
import './index.css';

function App() {
  const [board, setBoard] = useState(Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0)));
  const [current, setCurrent] = useState(getRandomTetromino());
  const [position, setPosition] = useState({ x: 3, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [intervalMs, setIntervalMs] = useState(500);
  const intervalRef = useRef();

  useEffect(() => {
    if (gameOver) return;
    intervalRef.current = setInterval(() => {
      moveDown();
    }, intervalMs);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line
  }, [current, position, intervalMs, gameOver]);

  const resetGame = () => {
    setBoard(Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0)));
    setCurrent(getRandomTetromino());
    setPosition({ x: 3, y: 0 });
    setScore(0);
    setGameOver(false);
    setIntervalMs(500);
  };

  const moveDown = () => {
    if (!checkCollision(board, current, { x: position.x, y: position.y + 1 })) {
      setPosition(pos => ({ ...pos, y: pos.y + 1 }));
    } else {
      const newBoard = mergeTetromino(board, current, position);
      const { clearedBoard, clearedRows } = clearRows(newBoard);
      setBoard(clearedBoard);
      setScore(s => s + clearedRows * 100);
      const next = getRandomTetromino();
      if (checkCollision(clearedBoard, next, { x: 3, y: 0 })) {
        setGameOver(true);
      } else {
        setCurrent(next);
        setPosition({ x: 3, y: 0 });
      }
    }
  };

  const move = dir => {
    const newPos = { x: position.x + dir, y: position.y };
    if (!checkCollision(board, current, newPos)) {
      setPosition(newPos);
    }
  };

  const rotate = () => {
    const rotated = rotateTetromino(current);
    if (!checkCollision(board, rotated, position)) {
      setCurrent(rotated);
    }
  };

  const handleKeyDown = e => {
    if (gameOver) return;
    if (e.key === 'ArrowLeft') move(-1);
    else if (e.key === 'ArrowRight') move(1);
    else if (e.key === 'ArrowDown') moveDown();
    else if (e.key === 'ArrowUp') rotate();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line
  }, [board, current, position, gameOver]);

  return (
    <div className="App">
      <h1>테트리스</h1>
      <div className="score">점수: {score}</div>
      <Board board={board} current={current} position={position} gameOver={gameOver} />
      {gameOver && (
        <div className="game-over">
          <div>게임 오버</div>
          <button onClick={resetGame}>다시 시작</button>
        </div>
      )}
    </div>
  );
}

export default App;