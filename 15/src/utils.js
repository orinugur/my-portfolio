// 유틸 함수 모음

// 거리 계산
export function getDistance(a, b) {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 +
    (a[1] - b[1]) ** 2 +
    (a[2] - b[2]) ** 2
  );
}

// 방향 벡터(정규화)
export function getDirection(from, to) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const dz = to[2] - from[2];
  const len = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
  return [dx / len, dy / len, dz / len];
}