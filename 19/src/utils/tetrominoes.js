export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

const TETROMINOES = [
  {
    shape: [
      [1, 1, 1, 1]
    ],
    color: '#00f0f0' // I
  },
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    color: '#00f000' // S
  },
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: '#f0f000' // Z
  },
  {
    shape: [
      [1, 1, 1],
      [0, 1, 0]
    ],
    color: '#0000f0' // T
  },
  {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: '#f0f000' // O
  },
  {
    shape: [
      [1, 1, 1],
      [1, 0, 0]
    ],
    color: '#f0a000' // L
  },
  {
    shape: [
      [1, 1, 1],
      [0, 0, 1]
    ],
    color: '#a000f0' // J
  }
];

export function getRandomTetromino() {
  const tetro = TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)];
  // 깊은 복사
  return {
    shape: tetro.shape.map(row => [...row]),
    color: tetro.color
  };
}

export function rotateTetromino(tetromino) {
  const newShape = tetromino.shape[0].map((_, i) =>
    tetromino.shape.map(row => row[i]).reverse()
  );
  return { ...tetromino, shape: newShape };
}

export function checkCollision(board, tetromino, pos) {
  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x]) {
        const boardY = pos.y + y;
        const boardX = pos.x + x;
        if (
          boardY < 0 ||
          boardY >= BOARD_HEIGHT ||
          boardX < 0 ||
          boardX >= BOARD_WIDTH ||
          board[boardY][boardX]
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

export function mergeTetromino(board, tetromino, pos) {
  const newBoard = board.map(row => [...row]);
  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x]) {
        const boardY = pos.y + y;
        const boardX = pos.x + x;
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = tetromino.color;
        }
      }
    }
  }
  return newBoard;
}

export function clearRows(board) {
  let clearedRows = 0;
  const newBoard = board.filter(row => {
    if (row.every(cell => cell)) {
      clearedRows++;
      return false;
    }
    return true;
  });
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(0));
  }
  return { clearedBoard: newBoard, clearedRows };
}