// 테트리스 게임 구현 (간단 버전)
const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 24;
const COLORS = [
  null,
  '#0ff', // I
  '#ff0', // O
  '#f0f', // T
  '#0f0', // S
  '#f00', // Z
  '#00f', // J
  '#fa0'  // L
];

// 테트로미노 도형 정의
const SHAPES = [
  [],
  [[1,1,1,1]], // I
  [[2,2],[2,2]], // O
  [[0,3,0],[3,3,3]], // T
  [[0,4,4],[4,4,0]], // S
  [[5,5,0],[0,5,5]], // Z
  [[6,0,0],[6,6,6]], // J
  [[0,0,7],[7,7,7]]  // L
];

let board = Array.from({length: ROWS}, () => Array(COLS).fill(0));
let current, pos, score = 0, dropInterval, gameOver = false;

function resetGame() {
  board = Array.from({length: ROWS}, () => Array(COLS).fill(0));
  score = 0;
  gameOver = false;
  document.getElementById('score').textContent = score;
  spawn();
  if (dropInterval) clearInterval(dropInterval);
  dropInterval = setInterval(drop, 500);
  draw();
}

function spawn() {
  const type = Math.floor(Math.random() * (SHAPES.length - 1)) + 1;
  current = SHAPES[type].map(row => [...row]);
  pos = {x: Math.floor(COLS/2) - Math.ceil(current[0].length/2), y: 0, type};
  if (collide(board, current, pos)) {
    gameOver = true;
    clearInterval(dropInterval);
    alert('게임 오버!');
  }
}

function collide(board, shape, pos) {
  for (let y=0; y<shape.length; ++y) {
    for (let x=0; x<shape[y].length; ++x) {
      if (shape[y][x] &&
        (board[y+pos.y] && board[y+pos.y][x+pos.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

function merge(board, shape, pos, type) {
  for (let y=0; y<shape.length; ++y) {
    for (let x=0; x<shape[y].length; ++x) {
      if (shape[y][x]) {
        board[y+pos.y][x+pos.x] = type;
      }
    }
  }
}

function rotate(shape) {
  return shape[0].map((_, i) => shape.map(row => row[i]).reverse());
}

function drop() {
  if (gameOver) return;
  pos.y++;
  if (collide(board, current, pos)) {
    pos.y--;
    merge(board, current, pos, pos.type);
    clearLines();
    spawn();
  }
  draw();
}

function move(dir) {
  pos.x += dir;
  if (collide(board, current, pos)) pos.x -= dir;
  draw();
}

function hardDrop() {
  while (!collide(board, current, {...pos, y: pos.y+1})) {
    pos.y++;
  }
  drop();
}

function rotateCurrent() {
  const rotated = rotate(current);
  const old = current;
  current = rotated;
  if (collide(board, current, pos)) current = old;
  draw();
}

function clearLines() {
  let lines = 0;
  for (let y=ROWS-1; y>=0; y--) {
    if (board[y].every(cell => cell !== 0)) {
      board.splice(y, 1);
      board.unshift(Array(COLS).fill(0));
      lines++;
      y++;
    }
  }
  if (lines > 0) {
    score += lines * 100;
    document.getElementById('score').textContent = score;
  }
}

function drawBlock(x, y, type) {
  ctx.fillStyle = COLORS[type];
  ctx.fillRect(x*BLOCK_SIZE, y*BLOCK_SIZE, BLOCK_SIZE-1, BLOCK_SIZE-1);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 보드
  for (let y=0; y<ROWS; ++y) {
    for (let x=0; x<COLS; ++x) {
      if (board[y][x]) drawBlock(x, y, board[y][x]);
    }
  }
  // 현재 블록
  for (let y=0; y<current.length; ++y) {
    for (let x=0; x<current[y].length; ++x) {
      if (current[y][x]) drawBlock(x+pos.x, y+pos.y, pos.type);
    }
  }
}

document.addEventListener('keydown', e => {
  if (gameOver) return;
  if (e.key === 'ArrowLeft') move(-1);
  else if (e.key === 'ArrowRight') move(1);
  else if (e.key === 'ArrowDown') drop();
  else if (e.key === 'ArrowUp') rotateCurrent();
  else if (e.key === ' ') hardDrop();
});

document.getElementById('start-btn').onclick = resetGame;

// 최초 시작
resetGame();