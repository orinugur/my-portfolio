import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import useEnemyAI from "./Enemy";
import useGun from "./Gun";
import Map from "./Map";
import HUD from "./HUD";
import MiniMap from "./MiniMap";
import { initGame, animateGame, cleanupGame } from "../utils/gameUtils";
import usePlayerControls from "./Player";

/**
 * FPS 게임의 3D 캔버스 및 게임 루프를 담당하는 컴포넌트
 */
function GameCanvas() {
  const mountRef = useRef(null);

  // three.js 객체를 useRef로 관리
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const gameStateRef = useRef(null);

  // HUD, MiniMap 강제 리렌더링용
  const [, setTick] = useState(0);

  useEffect(() => {
    // mountRef에 기존 자식 노드가 있으면 모두 제거
    if (mountRef.current) {
      while (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
    }
    // three.js로 3D 씬 초기화
    const { scene, camera, renderer, gameState } = initGame(mountRef.current);
    sceneRef.current = scene;
    cameraRef.current = camera;
    gameStateRef.current = gameState;

    // 적 자동 배치 (랜덤 위치, 중복 방지)
    const enemyCount = 5;
    const positions = [];
    for (let i = 0; i < enemyCount; i++) {
      let x, z, valid;
      do {
        x = Math.floor(Math.random() * 30 - 15);
        z = Math.floor(Math.random() * 30 - 15);
        valid = positions.every(
          (pos) => Math.abs(pos.x - x) > 3 && Math.abs(pos.z - z) > 3
        );
      } while (!valid && positions.length > 0);
      positions.push({ x, z });
      gameState.enemies.push({
        id: i + 1,
        x,
        y: 1.5,
        z,
        hp: 100,
        mesh: null,
        alive: true,
      });
    }

    // 애니메이션 루프 시작
    let animationId = animateGame(scene, camera, renderer, gameState);

    // HUD, MiniMap 강제 리렌더링
    const interval = setInterval(() => setTick(t => t + 1), 50);

    // 언마운트 시 리소스 정리
    return () => {
      cleanupGame(renderer, animationId);
      clearInterval(interval);
    };
  }, []);

  // 1인칭 컨트롤, 총, 적 AI 훅 연결
  usePlayerControls(cameraRef, gameStateRef, mountRef);
  useGun(cameraRef, gameStateRef, mountRef, sceneRef);
  useEnemyAI(cameraRef, gameStateRef, sceneRef);

  return (
    <div
      ref={mountRef}
      style={{
        width: "900px",
        height: "600px",
        outline: "none",
        position: "relative",
      }}
      tabIndex={0}
    >
      {gameStateRef.current && (
        <>
          <HUD gameStateRef={gameStateRef} />
          <MiniMap gameStateRef={gameStateRef} />
        </>
      )}
    </div>
  );
}

export default GameCanvas;