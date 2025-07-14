// 테트리스 블럭 모양 정의 (1x1 포함)
export const TETROMINOS = {
  I: [
    [1, 1, 1, 1]
  ],
  O: [
    [1, 1],
    [1, 1]
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1]
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0]
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1]
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1]
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1]
  ],
  D: [ // 1x1 블럭
    [1]
  ]
};

// 블럭 리스트 (랜덤 생성용)
export const BLOCK_TYPES = Object.keys(TETROMINOS);

// 블럭 회전 함수
export function rotate(matrix) {
  // 시계 방향 90도 회전
  return matrix[0].map((_, i) => matrix.map(row => row[i]).reverse());
}

// 충돌 체크 등 추가 유틸 함수는 Board.js에서 구현 예정