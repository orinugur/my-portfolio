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

/**
 * Creates a 2D array (matrix) of the specified width and height filled with zeros.
 * @param {number} w - The number of columns in the matrix.
 * @param {number} h - The number of rows in the matrix.
 * @return {number[][]} A matrix representing an empty game board.
 */
function createMatrix(w, h) {
  const matrix = [];
  for (let i = 0; i < h; i++) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

/**
 * Draws a single Tetris block at the specified grid coordinates with the given color.
 * @param {number} x - The horizontal grid position of the block.
 * @param {number} y - The vertical grid position of the block.
 * @param {string} color - The fill color for the block.
 */
function drawBlock(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
  ctx.strokeStyle = '#222';
  ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

/**
 * Renders the entire game board and the current falling piece on the canvas.
 */
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

/**
 * Determines whether a Tetris piece at a given position collides with the board or existing blocks.
 * @param {number[][]} matrix - The game board matrix.
 * @param {number[][]} piece - The matrix representing the Tetris piece.
 * @param {{x: number, y: number}} offset - The position on the board to check for collision.
 * @return {boolean} True if the piece collides with the board boundaries or occupied cells; otherwise, false.
 */
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

/**
 * Integrates a Tetris piece into the game board matrix at the specified position.
 * 
 * Copies all non-empty cells from the piece into the corresponding locations on the board, effectively placing the piece onto the board.
 */
function merge(matrix, piece, offset) {
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < piece[y].length; x++) {
      if (piece[y][x]) {
        matrix[y + offset.y][x + offset.x] = piece[y][x];
      }
    }
  }
}

/**
 * Returns a new matrix representing the input matrix rotated 90 degrees clockwise.
 * @param {number[][]} matrix - The matrix to rotate.
 * @return {number[][]} The rotated matrix.
 */
function rotate(matrix) {
  // 시계방향 회전
  return matrix[0].map((_, i) => matrix.map(row => row[i])).reverse();
}

/**
 * Moves the current Tetris piece down by one row, handling collision, merging, line clearing, and game over logic.
 */
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

/**
 * Moves the current Tetris piece horizontally by the specified direction if possible.
 * @param {number} dir - The direction to move the piece: -1 for left, 1 for right.
 */
function playerMove(dir) {
  pos.x += dir;
  if (collide(board, current, pos)) {
    pos.x -= dir;
  }
  drawBoard();
}

/**
 * Rotates the current falling Tetris piece clockwise if possible.
 * If rotation would cause a collision, the piece remains in its original orientation. Updates the board display after attempting rotation.
 */
function playerRotate() {
  const old = current;
  current = rotate(current);
  if (collide(board, current, pos)) {
    current = old;
  }
  drawBoard();
}

/**
 * Clears completed lines from the board, updates the score, increases game speed, and restarts the drop timer.
 */
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

/**
 * Sets the current falling Tetris piece to the next piece or a new random piece, positions it at the top center of the board, and selects the next piece type.
 */
function resetPiece() {
  const typeId = next || (Math.random() * (SHAPES.length - 1) + 1) | 0;
  current = SHAPES[typeId].map(row => row.slice());
  pos = { x: ((COLS / 2) | 0) - ((current[0].length / 2) | 0), y: 0 };
  next = (Math.random() * (SHAPES.length - 1) + 1) | 0;
}

/**
 * Resets the automatic piece drop timer based on the current drop interval.
 */
function restartDropTimer() {
  clearInterval(dropTimer);
  dropTimer = setInterval(playerDrop, dropInterval);
}

/**
 * Initializes and starts a new Tetris game session.
 *
 * Resets the game board, score, drop interval, and game state, updates the score display, sets the current piece, redraws the board, and starts the automatic piece drop timer.
 */
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