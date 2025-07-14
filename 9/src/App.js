import React, { useState, useEffect, useRef } from 'react';
import Board from './Board';
import { getRandomTetromino, checkCollision, mergeTetromino, clearRows, createEmptyBoard } from './utils';
import './App.css';

const ROWS = 20;
const COLS = 10;
const DROP_INTERVAL = 700;

function App() {
  const [board, setBoard] = useState(createEmptyBoard(ROWS, COLS));
  const [current, setCurrent] = useState(getRandomTetromino(COLS));
  const [next, setNext] = useState(getRandomTetromino(COLS));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const dropTime = useRef();

  useEffect(() => {
    if (isRunning && !gameOver) {
      dropTime.current = setInterval(() => {
        moveDown();
      }, DROP_INTERVAL);
      return () => clearInterval(dropTime.current);
    }
  }, [isRunning, current, gameOver]);

  const startGame = () => {
    setBoard(createEmptyBoard(ROWS, COLS));
    setCurrent(getRandomTetromino(COLS));
    setNext(getRandomTetromino(COLS));
    setScore(0);
    setGameOver(false);
    setIsRunning(true);
  };

  const moveDown = () => {
    if (!isRunning) return;
    const moved = { ...current, row: current.row + 1 };
    if (!checkCollision(board, moved)) {
      setCurrent(moved);
    } else {
      const merged = mergeTetromino(board, current);
      const { newBoard, cleared } = clearRows(merged);
      setBoard(newBoard);
      setScore((prev) => prev + cleared * 100);
      if (current.row <= 0) {
        setGameOver(true);
        setIsRunning(false);
        return;
      }
      setCurrent({ ...next, row: 0, col: Math.floor(COLS / 2) - 2 });
      setNext(getRandomTetromino(COLS));
    }
  };

  const move = (dir) => {
    if (!isRunning) return;
    const moved = { ...current, col: current.col + dir };
    if (!checkCollision(board, moved)) {
      setCurrent(moved);
    }
  };

  const rotate = () => {
    if (!isRunning) return;
    const rotated = {
      ...current,
      shape: current.shape[0].map((_, i) => current.shape.map(row => row[i]).reverse())
    };
    if (!checkCollision(board, rotated)) {
      setCurrent(rotated);
    }
  };

  const handleKeyDown = (e) => {
    if (!isRunning) return;
    if (e.key === 'ArrowLeft') move(-1);
    else if (e.key === 'ArrowRight') move(1);
    else if (e.key === 'ArrowDown') moveDown();
    else if (e.key === 'ArrowUp') rotate();
    else if (e.key === ' ') {
      // Hard drop
      let dropTetromino = { ...current };
      while (!checkCollision(board, { ...dropTetromino, row: dropTetromino.row + 1 })) {
        dropTetromino.row += 1;
      }
      setCurrent(dropTetromino);
      moveDown();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line
  }, [current, isRunning, gameOver, board]);

  useEffect(() => {
    if (gameOver) clearInterval(dropTime.current);
  }, [gameOver]);

  return (
    <div className="App">
      <h1>테트리스</h1>
      <div className="game-container">
        <Board board={board} current={current} />
        <div className="side-panel">
          <div className="next-block">
            <h3>다음 블록</h3>
            <Board board={createEmptyBoard(4, 4)} current={{ ...next, row: 0, col: 0 }} preview />
          </div>
          <div className="score">점수: {score}</div>
          {gameOver && <div className="game-over">게임 오버</div>}
          <button onClick={startGame}>{isRunning ? '다시 시작' : '게임 시작'}</button>
        </div>
      </div>
    </div>
  );
}

export default App;