import React, { useState, useEffect, useRef, useCallback } from 'react';

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

const TETROMINO_KEYS = Object.keys(TETROMINOS);
const COLORS = {
  I: '#00f0f0',
  J: '#0000f0',
  L: '#f0a000',
  O: '#f0f000',
  S: '#00f000',
  T: '#a000f0',
  Z: '#f00000'
};

const ROWS = 20;
const COLS = 10;
const EMPTY = { type: 0, color: '' };

function randomTetromino() {
  const key = TETROMINO_KEYS[Math.floor(Math.random() * TETROMINO_KEYS.length)];
  return { type: key, rotation: 0, shape: TETROMINOS[key][0], color: COLORS[key] };
}

function rotate(shape) {
  // 시계방향 90도 회전
  return shape[0].map((_, i) => shape.map(row => row[i]).reverse());
}

function getRotatedTetromino(tetromino, dir = 1) {
  const shapes = TETROMINOS[tetromino.type];
  let next = (tetromino.rotation + dir + shapes.length) % shapes.length;
  return {
    ...tetromino,
    rotation: next,
    shape: shapes[next]
  };
}

function checkCollision(board, tetromino, pos) {
  const { shape } = tetromino;
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const newY = pos.y + y;
        const newX = pos.x + x;
        if (
          newY < 0 ||
          newY >= ROWS ||
          newX < 0 ||
          newX >= COLS ||
          (board[newY] && board[newY][newX] && board[newY][newX].type)
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

function placeTetromino(board, tetromino, pos) {
  const newBoard = board.map(row => row.slice());
  tetromino.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const boardY = pos.y + y;
        const boardX = pos.x + x;
        if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
          newBoard[boardY][boardX] = { type: tetromino.type, color: tetromino.color };
        }
      }
    });
  });
  return newBoard;
}

function clearLines(board) {
  let cleared = 0;
  const newBoard = board.filter(row => {
    if (row.every(cell => cell.type)) {
      cleared++;
      return false;
    }
    return true;
  });
  while (newBoard.length < ROWS) {
    newBoard.unshift(Array(COLS).fill({ ...EMPTY }));
  }
  return { board: newBoard, cleared };
}

const SPEEDS = [800, 650, 500, 370, 250, 160, 100, 80, 60, 40];

function Tetris() {
  const [board, setBoard] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill({ ...EMPTY })));
  const [tetromino, setTetromino] = useState(randomTetromino());
  const [pos, setPos] = useState({ x: 3, y: -2 });
  const [next, setNext] = useState(randomTetromino());
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);

  const dropInterval = SPEEDS[Math.min(level, SPEEDS.length - 1)];
  const requestRef = useRef();

  const resetGame = () => {
    setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill({ ...EMPTY })));
    setTetromino(randomTetromino());
    setPos({ x: 3, y: -2 });
    setNext(randomTetromino());
    setScore(0);
    setLevel(0);
    setLines(0);
    setGameOver(false);
    setPaused(false);
  };

  const move = useCallback((dx, dy, rotateDir = 0) => {
    if (gameOver || paused) return;
    let newTetromino = tetromino;
    let newPos = { x: pos.x + dx, y: pos.y + dy };
    if (rotateDir) {
      newTetromino = getRotatedTetromino(tetromino, rotateDir);
    }
    if (!checkCollision(board, newTetromino, newPos)) {
      setTetromino(newTetromino);
      setPos(newPos);
    } else if (dy === 1 && dx === 0 && rotateDir === 0) {
      // 바닥에 닿음
      const placed = placeTetromino(board, tetromino, pos);
      const { board: clearedBoard, cleared } = clearLines(placed);
      setBoard(clearedBoard);
      setScore(s => s + [0, 100, 300, 500, 800][cleared]);
      setLines(l => {
        const newLines = l + cleared;
        setLevel(Math.floor(newLines / 10));
        return newLines;
      });
      // 새 블록
      const newTet = next;
      const newStart = { x: 3, y: -2 };
      if (checkCollision(clearedBoard, newTet, newStart)) {
        setGameOver(true);
      } else {
        setTetromino(newTet);
        setPos(newStart);
        setNext(randomTetromino());
      }
    }
  }, [board, tetromino, pos, next, gameOver, paused]);

  // 키보드 이벤트
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      if (e.key === 'ArrowLeft') move(-1, 0);
      else if (e.key === 'ArrowRight') move(1, 0);
      else if (e.key === 'ArrowDown') move(0, 1);
      else if (e.key === 'ArrowUp') move(0, 0, 1);
      else if (e.key === ' ') {
        // 하드드롭
        let dropY = pos.y;
        while (!checkCollision(board, tetromino, { x: pos.x, y: dropY + 1 })) {
          dropY++;
        }
        setPos({ x: pos.x, y: dropY });
        move(0, 1);
      }
      else if (e.key === 'p' || e.key === 'P') setPaused(p => !p);
      else if (e.key === 'r' || e.key === 'R') resetGame();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move, board, tetromino, pos, gameOver, paused]);

  // 자동 낙하
  useEffect(() => {
    if (gameOver || paused) return;
    const interval = setInterval(() => {
      move(0, 1);
    }, dropInterval);
    return () => clearInterval(interval);
  }, [move, dropInterval, gameOver, paused]);

  // 고스트 블록 위치 계산
  const getGhostPos = () => {
    let ghostY = pos.y;
    while (!checkCollision(board, tetromino, { x: pos.x, y: ghostY + 1 })) {
      ghostY++;
    }
    return { x: pos.x, y: ghostY };
  };

  // 보드 렌더링
  const renderBoard = () => {
    // 현재 블록, 고스트 블록 반영
    const display = board.map(row => row.map(cell => ({ ...cell })));
    // 고스트 블록
    const ghost = getGhostPos();
    tetromino.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          const gy = ghost.y + y;
          const gx = ghost.x + x;
          if (gy >= 0 && gy < ROWS && gx >= 0 && gx < COLS && !display[gy][gx].type) {
            display[gy][gx] = { type: 'ghost', color: tetromino.color };
          }
        }
      });
    });
    // 현재 블록
    tetromino.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          const by = pos.y + y;
          const bx = pos.x + x;
          if (by >= 0 && by < ROWS && bx >= 0 && bx < COLS) {
            display[by][bx] = { type: tetromino.type, color: tetromino.color };
          }
        }
      });
    });
    return display;
  };

  return (
    <div className="tetris-root">
      <div className="tetris-board">
        {renderBoard().map((row, y) => (
          <div className="tetris-row" key={y}>
            {row.map((cell, x) => (
              <div
                className={`tetris-cell${cell.type ? ' filled' : ''}${cell.type === 'ghost' ? ' ghost' : ''}`}
                key={x}
                style={{ background: cell.type && cell.type !== 'ghost' ? cell.color : undefined }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="tetris-info">
        <div className="tetris-next">
          <div>다음 블록</div>
          {next.shape.map((row, y) => (
            <div className="tetris-row" key={y}>
              {row.map((cell, x) => (
                <div
                  className={`tetris-cell next${cell ? ' filled' : ''}`}
                  key={x}
                  style={{ background: cell ? next.color : undefined }}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="tetris-score">점수: {score}</div>
        <div className="tetris-level">레벨: {level}</div>
        <div className="tetris-lines">줄: {lines}</div>
        <div className="tetris-controls">
          <div>← → : 이동</div>
          <div>↓ : 빠른 낙하</div>
          <div>↑ : 회전</div>
          <div>Space : 하드드롭</div>
          <div>P : 일시정지</div>
          <div>R : 재시작</div>
        </div>
        {gameOver && (
          <div className="tetris-gameover">
            <div>게임 오버</div>
            <button onClick={resetGame}>다시 시작</button>
          </div>
        )}
        {paused && !gameOver && (
          <div className="tetris-paused">일시정지</div>
        )}
      </div>
    </div>
  );
}

export default Tetris;