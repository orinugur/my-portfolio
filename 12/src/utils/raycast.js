/**
 * 레이캐스팅으로 3D 벽을 그리는 함수
 * @param {CanvasRenderingContext2D} ctx
 * @param {object} player
 * @param {number[][]} map
 * @param {number} tileSize
 * @param {number} fov
 * @param {number} numRays
 * @param {number} viewDist
 * @param {number} width
 * @param {number} height
 */
export function castRays(ctx, player, map, tileSize, fov, numRays, viewDist, width, height) {
  const { x: px, y: py, angle: pa } = player;
  const halfFov = fov / 2;
  for (let i = 0; i < numRays; i++) {
    // 각 레이의 각도 계산
    const rayAngle = pa - halfFov + (i / numRays) * fov;
    let rayX = px;
    let rayY = py;
    let distance = 0;
    let hit = false;

    // DDA 방식으로 벽 탐색
    while (!hit && distance < viewDist) {
      rayX += Math.cos(rayAngle) * 2;
      rayY += Math.sin(rayAngle) * 2;
      distance += 2;
      const mapX = Math.floor(rayX / tileSize);
      const mapY = Math.floor(rayY / tileSize);
      if (
        mapY < 0 ||
        mapY >= map.length ||
        mapX < 0 ||
        mapX >= map[0].length ||
        map[mapY][mapX] === 1 ||
        map[mapY][mapX] === 2 ||
        map[mapY][mapX] === 3
      ) {
        hit = true;
      }
    }

    // 피쉬아이 보정
    const correctedDist = distance * Math.cos(rayAngle - pa);

    // 벽 높이 계산
    const wallHeight = Math.min((tileSize * 4 * height) / (correctedDist + 0.0001), height);

    // 벽/도어/출구 색상(거리감 표현)
    let shade = Math.max(0, 200 - correctedDist * 0.5);
    let color = `rgb(${shade},${shade},${shade})`;
    // 도어(2): 파란색, 출구(3): 초록색
    const mapX = Math.floor(rayX / tileSize);
    const mapY = Math.floor(rayY / tileSize);
    if (mapY >= 0 && mapY < map.length && mapX >= 0 && mapX < map[0].length) {
      if (map[mapY][mapX] === 2) color = `rgb(60,60,255)`; // 도어
      if (map[mapY][mapX] === 3) color = `rgb(60,255,60)`; // 출구
    }
    ctx.fillStyle = color;

    // 벽/도어/출구 그리기
    const colWidth = width / numRays;
    ctx.fillRect(i * colWidth, (height - wallHeight) / 2, colWidth + 1, wallHeight);
  }
}