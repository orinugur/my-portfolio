import * as THREE from "three";
import { createMap } from "../components/Map";

/**
 * three.js 기반 FPS 게임 초기화
 */
export function initGame(mountEl) {
  // 씬, 카메라, 렌더러 생성
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x22282f);

  const camera = new THREE.PerspectiveCamera(
    75, 900 / 600, 0.1, 1000
  );
  camera.position.set(0, 3, 10);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(900, 600);
  mountEl.appendChild(renderer.domElement);

  // 조명
  const light = new THREE.DirectionalLight(0xffffff, 1.2);
  light.position.set(10, 20, 10);
  scene.add(light);

  // 맵 생성
  createMap(scene);

  // 게임 상태 객체
  const gameState = {
    player: { x: 0, y: 1.5, z: 0, hp: 1000, ammo: 30, score: 0 },
    enemies: [],
    bullets: [],
    isRunning: true,
  };

  return { scene, camera, renderer, gameState };
}

/**
 * 게임 애니메이션 루프
 */
export function animateGame(scene, camera, renderer, gameState) {
  function animate() {
    if (!gameState.isRunning) return;
    // TODO: 플레이어/적/총알 상태 갱신 및 충돌 처리

    renderer.render(scene, camera);
    animationId = requestAnimationFrame(animate);
  }
  let animationId = requestAnimationFrame(animate);
  return animationId;
}

/**
 * 게임 리소스 정리
 */
export function cleanupGame(renderer, animationId) {
  cancelAnimationFrame(animationId);
  renderer.dispose?.();
}