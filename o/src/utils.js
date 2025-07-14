export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

const TETROMINOS = [
  {
    shape: [
      [1, 1, 1, 1]
    ],
    color: 1 // I
  },
  {
    shape: [
      [0, 2, 0],
      [2, 2, 2]
    ],
    color: 2 // J
  },
  {
    shape: [
      [0, 0, 3],
      [3, 3, 3]
    ],
    color: 3 // L
  },
  {
    shape: [
      [4, 4],
      [4, 4]
    ],
    color: 4 // O
  },
  {
    shape: [
      [0, 5, 5],
      [5, 5, 0]
    ],
    color: 5 // S
  },
  {
    shape: [
      [0, 6, 0],
      [6, 6, 6]
    ],
    color: 6 // T
  },
  {
    shape: [
      [7, 7, 0],
      [0, 7, 7]
    ],
    color: 7 // Z
  }
];

// 랜덤 블록 반환
export function getRandomTetromino() {
  const tetro = TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)];
  // 깊은 복사
  return {
    shape: tetro.shape.map(row => [...row]),
    color: tetro.color
  };
}

// 충돌 검사
export function checkCollision(board, tetro, pos) {
  for (let y = 0; y < tetro.shape.length; y++) {
    for (let x = 0; x < tetro.shape[y].length; x++) {
      if (tetro.shape[y][x]) {
        const ny = pos.y + y;
        const nx = pos.x + x;
        if (
          ny < 0 ||
          ny >= BOARD_HEIGHT ||
          nx < 0 ||
          nx >= BOARD_WIDTH ||
          board[ny][nx]
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

// 블록 고정 및 줄 삭제
export function getNextBoard(board, tetro, pos) {
  const newBoard = board.map(row => [...row]);
  for (let y = 0; y < tetro.shape.length; y++) {
    for (let x = 0; x < tetro.shape[y].length; x++) {
      if (tetro.shape[y][x]) {
        const ny = pos.y + y;
        const nx = pos.x + x;
        if (ny >= 0 && ny < BOARD_HEIGHT && nx >= 0 && nx < BOARD_WIDTH) {
          newBoard[ny][nx] = tetro.color;
        }
      }
    }
  }
  // 줄 삭제
  let cleared = 0;
  for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
    if (newBoard[y].every(cell => cell)) {
      newBoard.splice(y, 1);
      newBoard.unshift(Array(BOARD_WIDTH).fill(0));
      cleared++;
      y++;
    }
  }
  return { newBoard, cleared };
}