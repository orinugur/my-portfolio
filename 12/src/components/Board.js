import React, { useRef, useEffect, useState } from 'react';
import '../App.css';
import './Board.css';
import { castRays } from '../utils/raycast';

// 여러 스테이지(맵, 도어, 적 스폰) 정의
const stages = [
  {
    name: 'STAGE 1',
    map: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
      [1,0,1,1,1,0,1,1,1,1,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,0,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    doors: [{ x: 1, y: 14, open: false }],
    player: { x: 2.5 * 64, y: 14.5 * 64, angle: 0, speed: 2.5 },
  },
  {
    name: 'STAGE 2',
    map: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
      [1,0,1,1,1,0,1,1,1,1,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,0,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    doors: [{ x: 1, y: 14, open: false }],
    player: { x: 2.5 * 64, y: 14.5 * 64, angle: 0, speed: 2.5 },
  },
  {
    name: 'STAGE 3',
    map: [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
      [1,0,1,1,1,0,1,1,1,1,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,0,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1],
      [1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ],
    doors: [{ x: 1, y: 14, open: false }, { x: 8, y: 7, open: false }],
    player: { x: 2.5 * 64, y: 14.5 * 64, angle: 0, speed: 2.5 },
  },
];

const TILE_SIZE = 64;
const FOV = Math.PI / 3;
const NUM_RAYS = 160;
const VIEW_DIST = 320;

// 랜덤 적 스폰(벽/도어/출구 제외, 중복X, 개수 제한, 최소 1마리 보장)
function getEnemySpawns(map, count = 4) {
  const candidates = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === 0) {
        candidates.push({ x: (x + 0.5) * TILE_SIZE, y: (y + 0.5) * TILE_SIZE });
      }
    }
  }
  // 랜덤 셔플 후 count개 추출, 최소 1마리 보장
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  const n = Math.max(1, Math.min(count, candidates.length));
  return candidates.slice(0, n).map((e) => ({
    ...e,
    alive: true,
    attackCooldown: 0,
    fireCooldown: 0,
  }));
}

// 벽 occlusion 체크: 플레이어→적 방향으로 레이캐스팅, 벽에 막히면 false
function isEnemyVisible(player, enemy, map, doors) {
  const dx = enemy.x - player.x;
  const dy = enemy.y - player.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);
  let rayX = player.x;
  let rayY = player.y;
  let step = 2;
  for (let d = 0; d < dist; d += step) {
    rayX += Math.cos(angle) * step;
    rayY += Math.sin(angle) * step;
    const mapX = Math.floor(rayX / TILE_SIZE);
    const mapY = Math.floor(rayY / TILE_SIZE);
    let cell = map[mapY][mapX];
    for (const door of doors) {
      if (door.x === mapX && door.y === mapY && door.open) cell = 0;
    }
    if (cell === 1 || cell === 2) return false;
    if (Math.abs(rayX - enemy.x) < step * 1.5 && Math.abs(rayY - enemy.y) < step * 1.5) break;
  }
  return true;
}

function Board() {
  const [stageIndex, setStageIndex] = useState(0);
  const [stage, setStage] = useState(stages[0]);
  const [player, setPlayer] = useState(stages[0].player);
  const [keys, setKeys] = useState({});
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [enemies, setEnemies] = useState(getEnemySpawns(stages[0].map, 4));
  const [bullets, setBullets] = useState([]);
  const [enemyBullets, setEnemyBullets] = useState([]);
  const [fireCooldown, setFireCooldown] = useState(0);
  const [doors, setDoors] = useState(stages[0].doors.map((d) => ({ ...d })));
  const [gameState, setGameState] = useState('playing'); // 'playing', 'win', 'lose', 'ending'
  const [hp, setHp] = useState(100);
  const canvasRef = useRef(null);

  // 스테이지/게임 리셋 및 stageIndex 변경 시 상태 동기화
  useEffect(() => {
    setStage(stages[stageIndex]);
    setPlayer(stages[stageIndex].player);
    setEnemies(getEnemySpawns(stages[stageIndex].map, 3 + Math.floor(Math.random() * 3)));
    setBullets([]);
    setEnemyBullets([]);
    setFireCooldown(0);
    setDoors(stages[stageIndex].doors.map((d) => ({ ...d })));
    setGameState('playing');
    setHp(100);
  }, [stageIndex]);

  // 키 입력 처리
  useEffect(() => {
    const handleKeyDown = (e) => setKeys((k) => ({ ...k, [e.code]: true }));
    const handleKeyUp = (e) => setKeys((k) => ({ ...k, [e.code]: false }));
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // 마우스 시점 처리
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isPointerLocked) {
        setPlayer((p) => ({
          ...p,
          angle: p.angle + e.movementX * 0.002,
        }));
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isPointerLocked]);

  // 포인터 락 처리
  useEffect(() => {
    const handlePointerLockChange = () => {
      setIsPointerLocked(document.pointerLockElement === canvasRef.current);
    };
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    return () => document.removeEventListener('pointerlockchange', handlePointerLockChange);
  }, []);

  // 도어 열기(E키)
  useEffect(() => {
    if (keys['KeyE']) {
      for (const door of doors) {
        const px = player.x / TILE_SIZE;
        const py = player.y / TILE_SIZE;
        if (
          Math.abs(door.x + 0.5 - px) < 1.2 &&
          Math.abs(door.y + 0.5 - py) < 1.2 &&
          !door.open
        ) {
          setDoors((prev) =>
            prev.map((d) =>
              d.x === door.x && d.y === door.y ? { ...d, open: true } : d
            )
          );
        }
      }
    }
  }, [keys, player, doors]);

  // 게임 루프(플레이어 이동)
  useEffect(() => {
    if (gameState !== 'playing') return;
    let animationId;
    const update = () => {
      setPlayer((p) => {
        let { x, y, angle } = p;
        let nx = x, ny = y;
        // 이동
        if (keys['KeyW']) {
          nx += Math.cos(angle) * p.speed;
          ny += Math.sin(angle) * p.speed;
        }
        if (keys['KeyS']) {
          nx -= Math.cos(angle) * p.speed;
          ny -= Math.sin(angle) * p.speed;
        }
        if (keys['KeyA']) {
          nx += Math.sin(angle) * p.speed;
          ny -= Math.cos(angle) * p.speed;
        }
        if (keys['KeyD']) {
          nx -= Math.sin(angle) * p.speed;
          ny += Math.cos(angle) * p.speed;
        }
        // 벽/도어 충돌
        let mapVal = stage.map[Math.floor(ny / TILE_SIZE)][Math.floor(nx / TILE_SIZE)];
        for (const door of doors) {
          if (
            door.x === Math.floor(nx / TILE_SIZE) &&
            door.y === Math.floor(ny / TILE_SIZE) &&
            door.open
          ) {
            mapVal = 0;
          }
        }
        if (mapVal === 0 || mapVal === 3) {
          return { ...p, x: nx, y: ny };
        }
        return p;
      });
      animationId = requestAnimationFrame(update);
    };
    animationId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationId);
  }, [keys, doors, gameState, stage.map]);

  // 적 AI, 총알, 렌더링 등 useEffect 추가 (생략)

  // 캔버스 클릭 시 포인터 락
  const handleCanvasClick = () => {
    canvasRef.current.requestPointerLock();
  };

  // 다시 시작/다음 스테이지 버튼
  const handleRestart = () => {
    if (gameState === 'win') {
      if (stageIndex < stages.length - 1) {
        setStageIndex(stageIndex + 1);
      } else {
        setStageIndex(0);
      }
    } else if (gameState === 'lose' || gameState === 'ending') {
      setStageIndex(0);
    }
  };

  // 렌더링 useEffect (canvas에 castRays, 적, 총알, 미니맵, HUD 등 모두 그림)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 도어가 열려있으면 맵에서 0(공간)으로 간주
    const mapWithDoors = stage.map.map((row, y) =>
      row.map((cell, x) => {
        for (const door of doors) {
          if (door.x === x && door.y === y && door.open) cell = 0;
        }
        return cell;
      })
    );

    // 레이캐스팅으로 벽/도어/출구 그리기
    castRays(ctx, player, mapWithDoors, TILE_SIZE, FOV, NUM_RAYS, VIEW_DIST, canvas.width, canvas.height);

    // 적 그리기(3D, 벽 occlusion 체크, 사각형+눈)
    enemies.forEach((e) => {
      if (!e.alive) return;
      if (!isEnemyVisible(player, e, stage.map, doors)) return;
      const dx = e.x - player.x;
      const dy = e.y - player.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angleToEnemy = Math.atan2(dy, dx);
      let relAngle = angleToEnemy - player.angle;
      while (relAngle < -Math.PI) relAngle += Math.PI * 2;
      while (relAngle > Math.PI) relAngle -= Math.PI * 2;
      if (Math.abs(relAngle) < FOV / 2) {
        const screenX = (0.5 + relAngle / FOV) * canvas.width;
        const size = Math.min(12000 / (dist + 1), 80);
        ctx.save();
        ctx.globalAlpha = 0.98;
        ctx.fillStyle = '#f44';
        ctx.fillRect(screenX - size / 2, canvas.height / 2 - size, size, size * 2);
        // 눈(흰색)
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(screenX - size / 4, canvas.height / 2 - size / 2, size / 7, 0, 2 * Math.PI);
        ctx.arc(screenX + size / 4, canvas.height / 2 - size / 2, size / 7, 0, 2 * Math.PI);
        ctx.fill();
        // 눈동자(검은색)
        ctx.fillStyle = '#111';
        ctx.beginPath();
        ctx.arc(screenX - size / 4, canvas.height / 2 - size / 2, size / 16, 0, 2 * Math.PI);
        ctx.arc(screenX + size / 4, canvas.height / 2 - size / 2, size / 16, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      }
    });

    // ... (총알, 미니맵, HUD 등 기존 렌더링 코드 동일하게 추가)
    // (생략)
  }, [player, enemies, bullets, enemyBullets, doors, gameState, hp, stage, stageIndex]);

  return (
    <div className="board-container">
      <canvas
        ref={canvasRef}
        width={640}
        height={400}
        tabIndex={0}
        className="game-canvas"
        onClick={handleCanvasClick}
      />
      <div className="controls">
        <p>
          WASD 이동, 마우스 시점, 클릭 후 조작, 마우스 클릭/스페이스바로 총 발사, <b>E</b>로 도어 열기
        </p>
        {(gameState === 'win' || gameState === 'lose' || gameState === 'ending') && (
          <button className="restart-btn" onClick={handleRestart}>
            {gameState === 'win' && stageIndex < stages.length - 1
              ? '다음 스테이지'
              : '처음부터 다시 시작'}
          </button>
        )}
      </div>
    </div>
  );
}

export default Board;