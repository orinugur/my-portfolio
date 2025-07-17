import { useEffect, useState } from "react";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

type Cell = 0 | 1;

const emptyBoard = (): Cell[][] =>
  Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0));

const TETROMINO = [
  // I 블록
  [
    [1, 1, 1, 1]
  ]
];

const TETROMINO_WIDTH = 4;
const TETROMINO_HEIGHT = 1;

function Tetris() {
  const [board] = useState<Cell[][]>(emptyBoard());
  const [pos, setPos] = useState({ x: 3, y: 0 });

  // 블록이 한 칸씩 아래로 내려감
  useEffect(() => {
    const interval = setInterval(() => {
      setPos((prev) => {
        // 바닥에 닿으면 멈춤
        if (prev.y + TETROMINO_HEIGHT >= BOARD_HEIGHT) return prev;
        return { ...prev, y: prev.y + 1 };
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // 블록을 보드에 그림
  const displayBoard = () => {
    const temp = board.map((row) => [...row]);
    for (let i = 0; i < TETROMINO_HEIGHT; i++) {
      for (let j = 0; j < TETROMINO_WIDTH; j++) {
        if (TETROMINO[0][i][j]) {
          const y = pos.y + i;
          const x = pos.x + j;
          if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
            temp[y][x] = 1;
          }
        }
      }
    }
    return temp;
  };

  return (
    <div>
      <h2>테트리스</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, 24px)`,
          gap: 2,
          background: "#222",
          width: BOARD_WIDTH * 24 + (BOARD_WIDTH - 1) * 2,
          margin: "0 auto"
        }}
      >
        {displayBoard().map((row, i) =>
          row.map((cell, j) => (
            <div
              key={i + "-" + j}
              style={{
                width: 24,
                height: 24,
                background: cell ? "#00f6ff" : "#222",
                border: "1px solid #444"
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Tetris;