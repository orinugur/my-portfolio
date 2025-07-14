import React, { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import "./Player.css";

function Player() {
  // 상태: 위치, 속도, 점프, 체력, 총알
  const [position, setPosition] = useState([0, 1, 0]);
  const [velocity, setVelocity] = useState([0, 0, 0]);
  const [isJumping, setIsJumping] = useState(false);
  const [health, setHealth] = useState(100);
  const [ammo, setAmmo] = useState(30);

  const ref = useRef();
  const { camera } = useThree();

  // 키 입력 처리
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" && !isJumping) {
        setVelocity((v) => [v[0], 0.18, v[2]]);
        setIsJumping(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isJumping]);

  // 이동/중력/점프 처리
  useFrame(() => {
    let [x, y, z] = position;
    let [vx, vy, vz] = velocity;

    // 중력
    vy -= 0.01;
    y += vy;
    x += vx;
    z += vz;

    // 바닥 충돌
    if (y <= 1) {
      y = 1;
      vy = 0;
      setIsJumping(false);
    }

    setPosition([x, y, z]);
    setVelocity([vx, vy, vz]);

    // 카메라 위치 동기화
    camera.position.set(x, y + 0.5, z);
  });

  // 사격(마우스 클릭)
  useEffect(() => {
    const handleClick = () => {
      if (ammo > 0) setAmmo((a) => a - 1);
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [ammo]);

  // 플레이어 모델(간단한 큐브)
  return (
    <mesh ref={ref} position={position} castShadow>
      <boxGeometry args={[0.5, 1, 0.5]} />
      <meshStandardMaterial color="#0af" />
    </mesh>
  );
}

export default Player;