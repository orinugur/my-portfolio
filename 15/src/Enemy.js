import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import "./Enemy.css";

function Enemy() {
  // 상태: 위치, 체력, 사격 쿨타임
  const [position, setPosition] = useState([3, 1, 3]);
  const [health, setHealth] = useState(100);
  const [cooldown, setCooldown] = useState(0);

  const ref = useRef();

  // 적 사격(일정 주기로 총알 발사)
  useFrame((state) => {
    if (cooldown <= 0) {
      // 총알 발사 로직(추후 구현)
      setCooldown(120); // 2초(60fps 기준)
    } else {
      setCooldown((c) => c - 1);
    }
  });

  // 적 모델(간단한 큐브)
  return (
    <mesh ref={ref} position={position} castShadow>
      <boxGeometry args={[0.5, 1, 0.5]} />
      <meshStandardMaterial color="#f33" />
    </mesh>
  );
}

export default Enemy;