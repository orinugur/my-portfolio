import * as THREE from "three";

/**
 * 맵 구조 및 오브젝트 배치
 * - 바닥, 4면 벽, 방 구조물(내부 벽, 기둥, 장애물 등)
 */

// 구조물 정보(미니맵/충돌용)
export const MAP_OBSTACLES = [
  // 4면 벽
  { type: "wall", x: 0, y: 4, z: -40.5, w: 80, h: 8, d: 1 },
  { type: "wall", x: 0, y: 4, z: 40.5, w: 80, h: 8, d: 1 },
  { type: "wall", x: -40.5, y: 4, z: 0, w: 1, h: 8, d: 80 },
  { type: "wall", x: 40.5, y: 4, z: 0, w: 1, h: 8, d: 80 },
  // 중앙 십자 벽
  { type: "wall", x: 0, y: 3, z: 0, w: 30, h: 6, d: 1 },
  { type: "wall", x: 0, y: 3, z: 0, w: 1, h: 6, d: 30 },
  // 기둥
  { type: "pillar", x: -20, y: 4, z: -20, r: 1.5, h: 8 },
  { type: "pillar", x: 20, y: 4, z: -20, r: 1.5, h: 8 },
  { type: "pillar", x: -20, y: 4, z: 20, r: 1.5, h: 8 },
  { type: "pillar", x: 20, y: 4, z: 20, r: 1.5, h: 8 },
  // 박스 장애물
  { type: "box", x: -10, y: 1, z: -10, w: 4, h: 2, d: 4 },
  { type: "box", x: 10, y: 1, z: 10, w: 4, h: 2, d: 4 },
  { type: "box", x: 0, y: 1, z: 20, w: 4, h: 2, d: 4 },
  { type: "box", x: 0, y: 1, z: -20, w: 4, h: 2, d: 4 },
  { type: "box", x: -25, y: 1, z: 0, w: 4, h: 2, d: 4 },
  { type: "box", x: 25, y: 1, z: 0, w: 4, h: 2, d: 4 },
];

export function createMap(scene) {
  // 바닥
  const floorGeometry = new THREE.PlaneGeometry(80, 80);
  const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  floor.receiveShadow = true;
  scene.add(floor);

  // 4면 벽 (BoxGeometry)
  const wallMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
  // 북쪽 벽
  const wallN = new THREE.Mesh(new THREE.BoxGeometry(80, 8, 1), wallMaterial);
  wallN.position.set(0, 4, -40.5);
  wallN.receiveShadow = true;
  scene.add(wallN);
  // 남쪽 벽
  const wallS = new THREE.Mesh(new THREE.BoxGeometry(80, 8, 1), wallMaterial);
  wallS.position.set(0, 4, 40.5);
  wallS.receiveShadow = true;
  scene.add(wallS);
  // 서쪽 벽
  const wallW = new THREE.Mesh(new THREE.BoxGeometry(1, 8, 80), wallMaterial);
  wallW.position.set(-40.5, 4, 0);
  wallW.receiveShadow = true;
  scene.add(wallW);
  // 동쪽 벽
  const wallE = new THREE.Mesh(new THREE.BoxGeometry(1, 8, 80), wallMaterial);
  wallE.position.set(40.5, 4, 0);
  wallE.receiveShadow = true;
  scene.add(wallE);

  // 방 구조물: 내부 벽, 기둥, 장애물
  // 중앙 십자 벽
  const crossWall1 = new THREE.Mesh(new THREE.BoxGeometry(30, 6, 1), wallMaterial);
  crossWall1.position.set(0, 3, 0);
  scene.add(crossWall1);

  const crossWall2 = new THREE.Mesh(new THREE.BoxGeometry(1, 6, 30), wallMaterial);
  crossWall2.position.set(0, 3, 0);
  scene.add(crossWall2);

  // 기둥 4개
  const pillarGeometry = new THREE.CylinderGeometry(1.5, 1.5, 8, 16);
  const pillarMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
  const pillarPositions = [
    [-20, 4, -20],
    [20, 4, -20],
    [-20, 4, 20],
    [20, 4, 20],
  ];
  for (const [x, y, z] of pillarPositions) {
    const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
    pillar.position.set(x, y, z);
    pillar.castShadow = true;
    pillar.receiveShadow = true;
    scene.add(pillar);
  }

  // 장애물(박스) 여러 개
  const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
  const boxPositions = [
    [-10, 1, -10],
    [10, 1, 10],
    [0, 1, 20],
    [0, 1, -20],
    [-25, 1, 0],
    [25, 1, 0],
  ];
  for (const [x, y, z] of boxPositions) {
    const box = new THREE.Mesh(new THREE.BoxGeometry(4, 2, 4), boxMaterial);
    box.position.set(x, y, z);
    box.castShadow = true;
    box.receiveShadow = true;
    scene.add(box);
  }
}