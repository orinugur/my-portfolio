import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import * as THREE from "three";
import Player from "./Player";
import Enemy from "./Enemy";
import "./Board.css";

function Board() {
  return (
    <Canvas
      shadows
      camera={{ fov: 75, position: [0, 2, 8] }}
      style={{ width: "100vw", height: "100vh", display: "block", background: "#181818" }}
    >
      {/* 월드(맵) */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <boxGeometry args={[20, 1, 20]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      {/* 벽 */}
      <mesh position={[0, 2, -10]}>
        <boxGeometry args={[20, 4, 1]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[0, 2, 10]}>
        <boxGeometry args={[20, 4, 1]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[-10, 2, 0]}>
        <boxGeometry args={[1, 4, 20]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[10, 2, 0]}>
        <boxGeometry args={[1, 4, 20]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* 플레이어(1인칭 이동/점프/총쏘기) */}
      <PlayerFPS />
      {/* 마우스 시점 컨트롤 */}
      <PointerLockControls />
      {/* 적(임시 큐브) */}
      <mesh position={[3, 1, 0]} castShadow>
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial color="#f33" />
      </mesh>
      {/* 조명 */}
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </Canvas>
  );
}

/**
 * 1인칭 플레이어 컨트롤러 (이동, 점프, 마우스 시점, 총쏘기)
 */
function PlayerFPS() {
  const { camera } = useThree();
  const ref = useRef();
  const [pos, setPos] = useState([0, 1, 0]);
  const [vel, setVel] = useState([0, 0, 0]);
  const [isJumping, setIsJumping] = useState(false);
  const [ammo, setAmmo] = useState(30);
  const [health, setHealth] = useState(100);

  // 키 입력 상태
  const keys = useRef({});

  React.useEffect(() => {
    const down = (e) => (keys.current[e.code] = true);
    const up = (e) => (keys.current[e.code] = false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // 이동/점프/중력
  useFrame(() => {
    let [x, y, z] = pos;
    let [vx, vy, vz] = vel;

    // 이동(WASD)
    const speed = 0.12;
    let dx = 0, dz = 0;
    if (keys.current["KeyW"]) dz -= speed;
    if (keys.current["KeyS"]) dz += speed;
    if (keys.current["KeyA"]) dx -= speed;
    if (keys.current["KeyD"]) dx += speed;

    // 카메라 방향 기준 이동
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    const right = new THREE.Vector3().crossVectors(dir, camera.up).normalize();
    const forward = new THREE.Vector3(dir.x, 0, dir.z).normalize();

    x += forward.x * dz + right.x * dx;
    z += forward.z * dz + right.z * dx;

    // 점프
    if (keys.current["Space"] && !isJumping) {
      vy = 0.18;
      setIsJumping(true);
    }

    // 중력
    vy -= 0.01;
    y += vy;

    // 바닥 충돌
    if (y <= 1) {
      y = 1;
      vy = 0;
      setIsJumping(false);
    }

    setPos([x, y, z]);
    setVel([vx, vy, vz]);

    // 카메라 위치 동기화(1인칭)
    camera.position.set(x, y + 0.5, z);
  });

  // 마우스 클릭 시 총쏘기(총알 감소)
  React.useEffect(() => {
    const shoot = () => {
      if (ammo > 0) setAmmo((a) => a - 1);
    };
    window.addEventListener("mousedown", shoot);
    return () => window.removeEventListener("mousedown", shoot);
  }, [ammo]);

  // 플레이어 큐브(숨겨진 상태, 디버그용)
  return (
    <mesh ref={ref} position={pos} visible={false}>
      <boxGeometry args={[0.5, 1, 0.5]} />
      <meshStandardMaterial color="#0af" />
    </mesh>
  );
}

export default Board;