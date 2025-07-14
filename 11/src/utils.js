// 셀 타입 상수
// 셀 타입 상수
export const GROUND = 0;
export const OBSTACLE = 1;
export const MARIO = 2;
export const ENEMY = 3;
export const GOAL = 4;
// 셀 타입 상수
export const BULLET = 5; // 총알
export const MUSHROOM = 6; // 버섯(파워업)

// 맵 데이터(2차원 배열)
// 0: 땅, 1: 벽/장애물, 2: 마리오, 3: 적, 4: 골, 5: 총알

const baseMap = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

/**
 * seed 기반 단순 난수 생성기
 */
function makeRand(seed) {
  let s = seed;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// 랜덤 시드 기반 ENEMY 배치
export function generateRandomEnemies(map, seed = 42, count = 2) {
  const rand = makeRand(seed);
  const newMap = map.map((row) => [...row]);
  let placed = 0;
  while (placed < count) {
    const x = Math.floor(rand() * (map[0].length - 4)) + 3;
    const y = Math.floor(rand() * (map.length - 4)) + 2;
    if (newMap[y][x] === 0) {
      newMap[y][x] = ENEMY;
      placed++;
    }
  }
  return newMap;
}

// 랜덤 시드 기반 버섯(파워업) 배치
export function generateRandomMushroom(map, seed = 99) {
  const rand = makeRand(seed);
  const newMap = map.map((row) => [...row]);
  let placed = false;
  while (!placed) {
    const x = Math.floor(rand() * (map[0].length - 4)) + 3;
    const y = Math.floor(rand() * (map.length - 4)) + 2;
    if (newMap[y][x] === 0) {
      newMap[y][x] = MUSHROOM;
      placed = true;
    }
  }
  return newMap;
}

// 맵 생성 함수
export function createInitialMap(seed = 42, enemyCount = 2) {
  let m = generateRandomEnemies(baseMap, seed, enemyCount);
  m = generateRandomMushroom(m, seed + 1000);
  return m;
}

export const initialMap = createInitialMap();

// 마리오 초기 위치 반환
export function getMarioInitPos(map) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === MARIO) return [x, y];
    }
  }
  return [1, 9];
}