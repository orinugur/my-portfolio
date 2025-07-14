/**
 * 적 블록 초기화
 */
export function createInitialEnemies(rows, cols, width, height) {
  const enemies = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      enemies.push({
        x: c * (width + 1) + 1,
        y: r * (height + 1) + 1,
      });
    }
  }
  return enemies;
}

/**
 * 충돌 판정
 * @param {object} a - {x, y}
 * @param {object} b - {x, y}
 * @param {number} bWidth
 * @param {number} bHeight
 * @param {number} aWidth (optional)
 */
export function checkCollision(a, b, bWidth, bHeight, aWidth = 1) {
  return (
    a.x < b.x + bWidth &&
    a.x + aWidth > b.x &&
    a.y < b.y + bHeight &&
    a.y + 1 > b.y
  );
}