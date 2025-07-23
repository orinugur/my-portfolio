// 테트리스 게임 구현 (한국어 주석 포함)

const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 24;
const COLORS = [
  null,
  '#0ff', // I
  '#00f', // J
  '#fa0', // L
  '#ff0', // O
  '#0f0', // S
  '#f00', // Z
  '#a0f'  // T
];

const SHAPES = [
  [],
  [ // I
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]
  ],
  [ // J
    [2,0,0],
    [2,2,2],
    [0,0,0]
  ],
  [ // L
    [0,0,3],
    [3,3,3],
    [0,0,0]
  ],
  [ // O
    [4,4],
    [4,4]
  ],
  [ // S
    [0,5,5],
    [5,5,0],
    [0,0,0]
  ],
  [ // Z
    [6,6,0],
    [0,6,6],
    [0,0,0]
  ],
  [ // T
    [0,7,0],
    [7,7,7],
    [0,0,0]
  ]
];

let board = createMatrix(COLS, ROWS);
let current, next, pos, score = 0, dropInterval = 600, dropTimer = null, gameOver = false;

function createMatrix(w, h) {
  const matrix = [];
  for (let i = 0; i < h; i++) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

function drawBlock(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
  ctx.strokeStyle = '#222';
  ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 보드
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (board[y][x]) {
        drawBlock(x, y, COLORS[board[y][x]]);
      }
    }
  }
  // 현재 블록
  if (current) {
    for (let y = 0; y < current.length; y++) {
      for (let x = 0; x < current[y].length; x++) {
        if (current[y][x]) {
          drawBlock(pos.x + x, pos.y + y, COLORS[current[y][x]]);
        }
      }
    }
  }
}

function collide(matrix, piece, offset) {
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < piece[y].length; x++) {
      if (piece[y][x] &&
        (matrix[y + offset.y] &&
         matrix[y + offset.y][x + offset.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

function merge(matrix, piece, offset) {
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < piece[y].length; x++) {
      if (piece[y][x]) {
        matrix[y + offset.y][x + offset.x] = piece[y][x];
      }
    }
  }
}

function rotate(matrix) {
  // 시계방향 회전
  return matrix[0].map((_, i) => matrix.map(row => row[i])).reverse();
}

function playerDrop() {
  pos.y++;
  if (collide(board, current, pos)) {
    pos.y--;
    merge(board, current, pos);
    resetPiece();
    sweep();
    if (collide(board, current, pos)) {
      gameOver = true;
      clearInterval(dropTimer);
      alert('게임 오버! 점수: ' + score);
    }
  }
  drawBoard();
}

function playerMove(dir) {
  pos.x += dir;
  if (collide(board, current, pos)) {
    pos.x -= dir;
  }
  drawBoard();
}

function playerRotate() {
  const old = current;
  current = rotate(current);
  if (collide(board, current, pos)) {
    current = old;
  }
  drawBoard();
}

function sweep() {
  let lines = 0;
  outer: for (let y = ROWS - 1; y >= 0; y--) {
    for (let x = 0; x < COLS; x++) {
      if (!board[y][x]) continue outer;
    }
    board.splice(y, 1);
    board.unshift(new Array(COLS).fill(0));
    lines++;
    y++;
  }
  if (lines > 0) {
    score += lines * 100;
    document.getElementById('score').textContent = score;
    if (dropInterval > 100) dropInterval -= 20 * lines;
    restartDropTimer();
  }
}

function resetPiece() {
  const typeId = next || (Math.random() * (SHAPES.length - 1) + 1) | 0;
  current = SHAPES[typeId].map(row => row.slice());
  pos = { x: ((COLS / 2) | 0) - ((current[0].length / 2) | 0), y: 0 };
  next = (Math.random() * (SHAPES.length - 1) + 1) | 0;
}

function restartDropTimer() {
  clearInterval(dropTimer);
  dropTimer = setInterval(playerDrop, dropInterval);
}

function startGame() {
  board = createMatrix(COLS, ROWS);
  score = 0;
  dropInterval = 600;
  gameOver = false;
  document.getElementById('score').textContent = score;
  resetPiece();
  drawBoard();
  restartDropTimer();
}

document.addEventListener('keydown', e => {
  if (gameOver) return;
  if (e.key === 'ArrowLeft') playerMove(-1);
  else if (e.key === 'ArrowRight') playerMove(1);
  else if (e.key === 'ArrowDown') playerDrop();
  else if (e.key === 'ArrowUp') playerRotate();
});

document.getElementById('start-btn').addEventListener('click', startGame);

drawBoard();