const TETROMINOS = [
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

// 빈 보드 생성
export function createEmptyBoard(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(null));
}

// 랜덤 블록 생성
export function getRandomTetromino(cols) {
  const tetro = TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)];
  return {
    shape: tetro.shape,
    color: tetro.color,
    row: 0,
    col: Math.floor(cols / 2) - Math.floor(tetro.shape[0].length / 2)
  };
}

// 충돌 체크
export function checkCollision(board, tetromino) {
  const { shape, row, col } = tetromino;
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j]) {
        const y = row + i;
        const x = col + j;
        if (
          y < 0 ||
          y >= board.length ||
          x < 0 ||
          x >= board[0].length ||
          board[y][x]
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

// 블록을 보드에 병합
export function mergeTetromino(board, tetromino) {
  const { shape, row, col, color } = tetromino;
  const newBoard = board.map(r => [...r]);
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j]) {
        const y = row + i;
        const x = col + j;
        if (y >= 0 && y < newBoard.length && x >= 0 && x < newBoard[0].length) {
          newBoard[y][x] = color;
        }
      }
    }
  }
  return newBoard;
}

// 줄 삭제
export function clearRows(board) {
  let cleared = 0;
  const newBoard = board.filter(row => {
    if (row.every(cell => cell)) {
      cleared++;
      return false;
    }
    return true;
  });
  while (newBoard.length < board.length) {
    newBoard.unshift(Array(board[0].length).fill(null));
  }
  return { newBoard, cleared };
}