import React, { useEffect, useState } from "react";
import { MAP_OBSTACLES } from "./Map";

/**
 * 미니맵: 플레이어 기준으로 구조물/적/플레이어 위치를 2D로 표시 (탑다운)
 * - 맵 크기: 80x80 (gameUtils.js 기준)
 * - 플레이어: 파란색, 적: 빨간색, 벽/구조물: 회색/진회색
 */
function MiniMap({ gameStateRef }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 100);
    return () => clearInterval(interval);
  }, []);

  const player = gameStateRef.current?.player;
  const enemies = gameStateRef.current?.enemies || [];

  // 미니맵 크기 및 변환
  const mapSize = 80;
  const scale = 2.5; // 미니맵 내 표시 크기
  const center = mapSize / 2;

  function toMapCoord(x, z) {
    // 플레이어 기준 상대좌표로 변환
    if (!player) return { x: center, y: center };
    return {
      x: center + (x - player.x) * scale,
      y: center + (z - player.z) * scale,
    };
  }

  return (
    <svg
      width={120}
      height={120}
      style={{
        position: "absolute",
        right: 24,
        top: 24,
        background: "#2228",
        borderRadius: 12,
        border: "2px solid #fff",
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      {/* 맵 테두리 */}
      <rect x={10} y={10} width={100} height={100} fill="#333" stroke="#fff" strokeWidth={2} rx={10} />
      {/* 구조물(벽/기둥/박스) */}
      {MAP_OBSTACLES.map((obj, i) => {
        if (obj.type === "wall" || obj.type === "box") {
          // Box: 중심좌표(x, z), 크기(w, d)
          const { x, z, w, d } = obj;
          const pos = toMapCoord(x, z);
          return (
            <rect
              key={i}
              x={pos.x - (w * scale) / 2}
              y={pos.y - (d * scale) / 2}
              width={w * scale}
              height={d * scale}
              fill={obj.type === "wall" ? "#888" : "#444"}
              stroke="#222"
              strokeWidth={1}
              opacity={0.7}
            />
          );
        }
        if (obj.type === "pillar") {
          // 원: 중심좌표(x, z), 반지름(r)
          const { x, z, r } = obj;
          const pos = toMapCoord(x, z);
          return (
            <circle
              key={i}
              cx={pos.x}
              cy={pos.y}
              r={r * scale}
              fill="#666"
              stroke="#222"
              strokeWidth={1}
              opacity={0.7}
            />
          );
        }
        return null;
      })}
      {/* 플레이어 (항상 중심) */}
      {player && (
        <circle
          cx={center}
          cy={center}
          r={6}
          fill="#3af"
          stroke="#fff"
          strokeWidth={2}
        />
      )}
      {/* 적들 */}
      {enemies.map(
        (enemy, i) =>
          enemy.alive && enemy.mesh && (
            <circle
              key={enemy.id || i}
              cx={toMapCoord(enemy.x, enemy.z).x}
              cy={toMapCoord(enemy.x, enemy.z).y}
              r={5}
              fill="#f33"
              stroke="#fff"
              strokeWidth={1}
            />
          )
      )}
    </svg>
  );
}

export default MiniMap;