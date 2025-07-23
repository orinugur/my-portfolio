// 테트리스 게임 구현 (한국어 주석 포함)
const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 24;
const COLORS = [
  null,
  '#00f0f0', // I
  '#0000f0', // J
  '#f0a000', // L
  '#f0f000', // O
  '#00f000', // S
  '#a000f0', // T
  '#f00000', // Z
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
  [ // T
    [0,6,0],
    [6,6,6],
    [0,0,0]
  ],
  [ // Z
    [7,7,0],
    [0,7,7],
    [0,0,0]
  ]
];

let board = createBoard();
let current, next, score = 0, gameOver = false, dropInterval = 500, dropTimer = 0;

function createBoard() {
  return Array.from({length: ROWS}, () => Array(COLS).fill(0));
}

function drawBlock(x, y, colorId) {
  if (!colorId) return;
  ctx.fillStyle = COLORS[colorId];
  ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
  ctx.strokeStyle = '#222';
  ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 보드
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      drawBlock(x, y, board[y][x]);
    }
  }
  // 현재 블록
  if (current) {
    for (let y = 0; y < current.shape.length; y++) {
      for (let x = 0; x < current.shape[y].length; x++) {
        if (current.shape[y][x]) {
          drawBlock(current.x + x, current.y + y, current.shape[y][x]);
        }
      }
    }
  }
}

function randomPiece() {
  const typeId = Math.floor(Math.random() * (SHAPES.length - 1)) + 1;
  const shape = SHAPES[typeId].map(row => row.slice());
  return {
    x: Math.floor(COLS / 2) - Math.ceil(shape[0].length / 2),
    y: 0,
    shape,
    typeId
  };
}

function collide(board, piece) {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        let px = piece.x + x;
        let py = piece.y + y;
        if (px < 0 || px >= COLS || py >= ROWS) return true;
        if (py >= 0 && board[py][px]) return true;
      }
    }
  }
  return false;
}

function merge(board, piece) {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        let px = piece.x + x;
        let py = piece.y + y;
        if (py >= 0) board[py][px] = piece.typeId;
      }
    }
  }
}

function rotate(matrix) {
  // 시계방향 회전
  return matrix[0].map((_, i) => matrix.map(row => row[i])).reverse();
}

function playerDrop() {
  current.y++;
  if (collide(board, current)) {
    current.y--;
    merge(board, current);
    sweep();
    spawn();
    if (collide(board, current)) {
      gameOver = true;
      document.getElementById('score').textContent = score + ' (게임 오버)';
    }
  }
  dropTimer = 0;
}

function sweep() {
  let lines = 0;
  outer: for (let y = ROWS - 1; y >= 0; y--) {
    for (let x = 0; x < COLS; x++) {
      if (!board[y][x]) continue outer;
    }
    board.splice(y, 1);
    board.unshift(Array(COLS).fill(0));
    lines++;
    y++;
  }
  if (lines > 0) {
    score += [0, 100, 300, 500, 800][lines];
    document.getElementById('score').textContent = score;
    dropInterval = Math.max(100, 500 - Math.floor(score / 500) * 50);
  }
}

function spawn() {
  current = next || randomPiece();
  next = randomPiece();
}

function playerMove(dir) {
  current.x += dir;
  if (collide(board, current)) current.x -= dir;
}

function playerRotate() {
  const oldShape = current.shape;
  current.shape = rotate(current.shape);
  if (collide(board, current)) {
    // 벽킥
    current.x++;
    if (collide(board, current)) {
      current.x -= 2;
      if (collide(board, current)) {
        current.x++;
        current.shape = oldShape;
      }
    }
  }
}

function restart() {
  board = createBoard();
  score = 0;
  dropInterval = 500;
  gameOver = false;
  document.getElementById('score').textContent = score;
  spawn();
}

document.addEventListener('keydown', e => {
  if (gameOver) return;
  if (e.key === 'ArrowLeft') playerMove(-1);
  else if (e.key === 'ArrowRight') playerMove(1);
  else if (e.key === 'ArrowDown') playerDrop();
  else if (e.key === 'ArrowUp') playerRotate();
  drawBoard();
});

document.getElementById('restart').onclick = () => {
  restart();
  drawBoard();
};

function update(time = 0) {
  if (!gameOver) {
    dropTimer += 16;
    if (dropTimer > dropInterval) playerDrop();
    drawBoard();
    requestAnimationFrame(update);
  }
}
restart();
drawBoard();
requestAnimationFrame(update);