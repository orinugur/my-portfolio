export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const TETROMINOS = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    type: "I",
  },
  J: {
    shape: [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0],
    ],
    type: "J",
  },
  L: {
    shape: [
      [0, 0, 3],
      [3, 3, 3],
      [0, 0, 0],
    ],
    type: "L",
  },
  O: {
    shape: [
      [4, 4],
      [4, 4],
    ],
    type: "O",
  },
  S: {
    shape: [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0],
    ],
    type: "S",
  },
  T: {
    shape: [
      [0, 6, 0],
      [6, 6, 6],
      [0, 0, 0],
    ],
    type: "T",
  },
  Z: {
    shape: [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0],
    ],
    type: "Z",
  },
};

export const TETROMINO_COLORS = {
  0: "#222",
  I: "#00f0f0",
  J: "#0000f0",
  L: "#f0a000",
  O: "#f0f000",
  S: "#00f000",
  T: "#a000f0",
  Z: "#f00000",
  1: "#00f0f0",
  2: "#0000f0",
  3: "#f0a000",
  4: "#f0f000",
  5: "#00f000",
  6: "#a000f0",
  7: "#f00000",
};

export function createEmptyBoard() {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array(BOARD_WIDTH).fill(0)
  );
}

export function randomTetromino() {
  const keys = Object.keys(TETROMINOS);
  const rand = keys[Math.floor(Math.random() * keys.length)];
  // 깊은 복사
  return {
    ...TETROMINOS[rand],
    shape: TETROMINOS[rand].shape.map((row) => [...row]),
  };
}

export function checkCollision(board, shape, pos) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const px = pos.x + x;
        const py = pos.y + y;
        if (
          px < 0 ||
          px >= BOARD_WIDTH ||
          py >= BOARD_HEIGHT ||
          (py >= 0 && board[py][px])
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

export function mergeTetromino(board, shape, pos, type) {
  const newBoard = board.map((row) => [...row]);
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const px = pos.x + x;
        const py = pos.y + y;
        if (py >= 0 && py < BOARD_HEIGHT && px >= 0 && px < BOARD_WIDTH) {
          newBoard[py][px] = type;
        }
      }
    }
  }
  return newBoard;
}

export function clearLines(board) {
  let linesCleared = 0;
  const newBoard = board.filter((row) => {
    if (row.every((cell) => cell)) {
      linesCleared++;
      return false;
    }
    return true;
  });
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(0));
  }
  return { newBoard, linesCleared };
}