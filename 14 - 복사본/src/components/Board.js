import React, { useState, useEffect, useRef } from "react";
import Player from "./Player";
import Enemy from "./Enemy";
import "../styles/Board.css";

// 월드 크기 및 벽 정보
const BOARD_ROWS = 12;
const BOARD_COLS = 20;

// 벽(1), 빈공간(0)으로 구성된 2차원 배열
const initialMap = [
  // 12행 20열, 사방이 1(벽)로 막혀있고 내부는 0(빈공간)
  ...Array(BOARD_ROWS).fill().map((_, r) =>
    Array(BOARD_COLS).fill().map((_, c) =>
      r === 0 || r === BOARD_ROWS - 1 || c === 0 || c === BOARD_COLS - 1 ? 1 : 0
    )
  ),
];

function Board({ health, ammo, isGameOver, onPlayerHit, onShoot }) {
  // 플레이어 위치/상태
  const [player, setPlayer] = useState({
    row: BOARD_ROWS - 2,
    col: 2,
    isJumping: false,
    facing: "right", // "left" or "right"
  });

  // 적 상태
  const [enemy, setEnemy] = useState({
    row: 1,
    col: BOARD_COLS - 3,
    health: 100,
    isAlive: true,
    shootCooldown: 0,
  });

  // 총알(플레이어/적)
  const [bullets, setBullets] = useState([]);

  // 키 입력 관리
  const keys = useRef({});

  // 이동/점프/사격 처리
  useEffect(() => {
    if (isGameOver) return;
    const handleKeyDown = (e) => {
      keys.current[e.code] = true;
    };
    const handleKeyUp = (e) => {
      keys.current[e.code] = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isGameOver]);

  // 게임 루프
  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(() => {
      setPlayer((prev) => {
        let { row, col, isJumping, facing } = prev;
        // 이동
        if (keys.current["ArrowLeft"] && initialMap[row][col - 1] === 0) {
          col -= 1;
          facing = "left";
        }
        if (keys.current["ArrowRight"] && initialMap[row][col + 1] === 0) {
          col += 1;
          facing = "right";
        }
        // 점프(위로 1칸)
        if (keys.current["Space"] && !isJumping && initialMap[row - 1][col] === 0) {
          isJumping = true;
          row -= 1;
        }
        // 점프 후 착지(아래가 빈공간이면 낙하)
        if (isJumping) {
          if (initialMap[row + 1][col] === 0) {
            row += 1;
            isJumping = false;
          } else {
            isJumping = false;
          }
        } else if (initialMap[row + 1][col] === 0) {
          // 중력(아래가 빈공간이면 낙하)
          row += 1;
        }
        return { row, col, isJumping, facing };
      });

      // 사격(플레이어)
      if (keys.current["KeyZ"] && ammo > 0) {
        setBullets((prev) => [
          ...prev,
          {
            from: "player",
            row: player.row,
            col: player.col,
            dir: player.facing,
          },
        ]);
        onShoot();
        keys.current["KeyZ"] = false; // 연사 방지
      }
    }, 60);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [ammo, isGameOver, player.row, player.col, player.facing, onShoot]);

  // 총알 이동 및 충돌 처리
  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(() => {
      setBullets((prev) =>
        prev
          .map((b) => {
            let { from, row, col, dir } = b;
            if (dir === "right") col += 1;
            else col -= 1;
            // 벽에 닿으면 소멸
            if (initialMap[row][col] === 1) return null;
            // 적 피격
            if (
              from === "player" &&
              enemy.isAlive &&
              row === enemy.row &&
              col === enemy.col
            ) {
              setEnemy((e) => ({
                ...e,
                health: e.health - 20,
                isAlive: e.health - 20 > 0,
              }));
              return null;
            }
            // 플레이어 피격
            if (
              from === "enemy" &&
              row === player.row &&
              col === player.col
            ) {
              onPlayerHit(20);
              return null;
            }
            return { from, row, col, dir };
          })
          .filter(Boolean)
      );
    }, 40);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [enemy, player, isGameOver, onPlayerHit]);

  // 적 인공지능(간단한 사격/이동)
  useEffect(() => {
    if (isGameOver || !enemy.isAlive) return;
    const interval = setInterval(() => {
      setEnemy((prev) => {
        let { row, col, health, isAlive, shootCooldown } = prev;
        // 플레이어와 같은 행에 있으면 사격
        if (shootCooldown === 0 && player.row === row) {
          setBullets((prevBullets) => [
            ...prevBullets,
            {
              from: "enemy",
              row,
              col,
              dir: player.col < col ? "left" : "right",
            },
          ]);
          shootCooldown = 20; // 쿨타임
        } else if (shootCooldown > 0) {
          shootCooldown -= 1;
        }
        // 플레이어 쪽으로 이동(벽 피해서)
        if (player.col < col && initialMap[row][col - 1] === 0) col -= 1;
        else if (player.col > col && initialMap[row][col + 1] === 0) col += 1;
        return { row, col, health, isAlive, shootCooldown };
      });
    }, 200);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [player, isGameOver, enemy.isAlive]);

  // 적 체력 0이면 사망 처리
  useEffect(() => {
    if (enemy.health <= 0 && enemy.isAlive) {
      setEnemy((e) => ({ ...e, isAlive: false }));
    }
  }, [enemy.health, enemy.isAlive]);

  // 맵 렌더링
  return (
    <div className="board">
      {initialMap.map((rowArr, r) => (
        <div className="board-row" key={r}>
          {rowArr.map((cell, c) => {
            // 플레이어
            if (player.row === r && player.col === c)
              return <Player key="player" facing={player.facing} />;
            // 적
            if (enemy.isAlive && enemy.row === r && enemy.col === c)
              return <Enemy key="enemy" />;
            // 총알
            const bullet = bullets.find((b) => b.row === r && b.col === c);
            if (bullet)
              return (
                <div
                  key={`bullet-${r}-${c}`}
                  className={`cell bullet ${bullet.from}`}
                />
              );
            // 벽/빈공간
            return (
              <div
                key={`cell-${r}-${c}`}
                className={`cell ${cell === 1 ? "wall" : "empty"}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Board;