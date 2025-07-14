const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart');

const COLS = 10;
const ROWS = 20;
const BLOCK = 24;
const COLORS = [
  null,
  '#3af', // I
  '#f33', // J
  '#fc0', // L
  '#6f3', // O
  '#c3f', // S
  '#0cf', // T
  '#fa3', // Z
];

const SHAPES = [
  [],
  [[1,1,1,1]], // I
  [[2,0,0],[2,2,2]], // J
  [[0,0,3],[3,3,3]], // L
  [[4,4],[4,4]], // O
  [[0,5,5],[5,5,0]], // S
  [[0,6,0],[6,6,6]], // T
  [[7,7,0],[0,7,7]], // Z
];

function createMatrix(w, h) {
  const m = [];
  while (h--) m.push(new Array(w).fill(0));
  return m;
}

function collide(matrix, player) {
  const [m, o] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] && (matrix[y + o.y] && matrix[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

function merge(matrix, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((val, x) => {
      if (val) matrix[y + player.pos.y][x + player.pos.x] = val;
    });
  });
}

function rotate(matrix, dir) {
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < y; ++x) {
      [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
    }
  }
  if (dir > 0) matrix.forEach(row => row.reverse());
  else matrix.reverse();
}

function playerDrop() {
  player.pos.y++;
  if (collide(arena, player)) {
    player.pos.y--;
    merge(arena, player);
    playerReset();
    arenaSweep();
    updateScore();
    if (collide(arena, player)) {
      gameOver();
    }
  }
  dropCounter = 0;
}

function playerMove(dir) {
  player.pos.x += dir;
  if (collide(arena, player)) player.pos.x -= dir;
}

function playerRotate(dir) {
  const pos = player.pos.x;
  let offset = 1;
  rotate(player.matrix, dir);
  while (collide(arena, player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > player.matrix[0].length) {
      rotate(player.matrix, -dir);
      player.pos.x = pos;
      return;
    }
  }
}

function playerReset() {
  const type = Math.floor(Math.random() * (SHAPES.length - 1)) + 1;
  player.matrix = SHAPES[type].map(row => row.slice());
  player.pos.y = 0;
  player.pos.x = Math.floor(COLS / 2) - Math.floor(player.matrix[0].length / 2);
  if (collide(arena, player)) {
    arena.forEach(row => row.fill(0));
    score = 0;
    updateScore();
  }
}

function arenaSweep() {
  let rowCount = 1;
  outer: for (let y = arena.length - 1; y >= 0; --y) {
    if (arena[y].every(val => val !== 0)) {
      arena.splice(y, 1);
      arena.unshift(new Array(COLS).fill(0));
      score += rowCount * 100;
      rowCount *= 2;
      y++;
    }
  }
}

function updateScore() {
  scoreEl.textContent = score;
}

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((val, x) => {
      if (val) {
        ctx.fillStyle = COLORS[val];
        ctx.fillRect((x + offset.x) * BLOCK, (y + offset.y) * BLOCK, BLOCK-1, BLOCK-1);
      }
    });
  });
}

function draw() {
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(arena, {x:0, y:0});
  drawMatrix(player.matrix, player.pos);
}

function update(time = 0) {
  const delta = time - lastTime;
  lastTime = time;
  dropCounter += delta;
  if (dropCounter > dropInterval) {
    playerDrop();
  }
  draw();
  if (!isGameOver) requestAnimationFrame(update);
}

function gameOver() {
  isGameOver = true;
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(0, canvas.height/2-40, canvas.width, 80);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 28px Pretendard, Arial';
  ctx.textAlign = 'center';
  ctx.fillText('게임 오버', canvas.width/2, canvas.height/2);
}

function restart() {
  isGameOver = false;
  arena.forEach(row => row.fill(0));
  score = 0;
  updateScore();
  playerReset();
  lastTime = 0;
  dropCounter = 0;
  update();
}

document.addEventListener('keydown', e => {
  if (isGameOver) return;
  if (e.key === 'ArrowLeft') playerMove(-1);
  else if (e.key === 'ArrowRight') playerMove(1);
  else if (e.key === 'ArrowDown') playerDrop();
  else if (e.key === 'ArrowUp') playerRotate(1);
  else if (e.key === ' ') {
    while (!collide(arena, player)) {
      player.pos.y++;
    }
    player.pos.y--;
    playerDrop();
  }
});

restartBtn.addEventListener('click', restart);

let arena = createMatrix(COLS, ROWS);
let player = {
  pos: {x:0, y:0},
  matrix: null,
};
let score = 0;
let dropCounter = 0;
let dropInterval = 500;
let lastTime = 0;
let isGameOver = false;

playerReset();
updateScore();
update();