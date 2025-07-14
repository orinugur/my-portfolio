import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MAP_OBSTACLES } from "./Map";

/**
 * 1인칭 플레이어 컨트롤 (WASD 이동, 마우스 시점, 점프, 충돌)
 */
function usePlayerControls(cameraRef, gameStateRef, mountRef) {
  useEffect(() => {
    if (!cameraRef.current || !gameStateRef.current || !mountRef.current) return;

    // Pointer Lock API로 마우스 시점 전환
    const dom = mountRef.current;
    let isLocked = false;
    let yaw = 0;
    let pitch = 0;
    const move = { forward: false, backward: false, left: false, right: false, jump: false };

    // 점프/중력 상태
    let vy = 0;
    let isGrounded = true;
    const gravity = -0.015;
    const jumpPower = 0.38;
    const playerHeight = 1.5;
    const playerRadius = 1.0;

    // 마우스 클릭 시 포인터락 요청
    const handleClick = () => {
      dom.requestPointerLock();
    };

    // 포인터락 상태 변경
    const handlePointerLockChange = () => {
      isLocked = document.pointerLockElement === dom;
    };

    // 마우스 이동(시점 회전)
    const handleMouseMove = (e) => {
      if (!isLocked) return;
      yaw -= e.movementX * 0.002;
      pitch -= e.movementY * 0.002;
      pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
      cameraRef.current.rotation.set(pitch, yaw, 0, "YXZ");
    };

    // WASD/점프 이동
    const handleKeyDown = (e) => {
      if (e.code === "KeyW") move.forward = true;
      if (e.code === "KeyS") move.backward = true;
      if (e.code === "KeyA") move.left = true;
      if (e.code === "KeyD") move.right = true;
      if (e.code === "Space") move.jump = true;
    };
    const handleKeyUp = (e) => {
      if (e.code === "KeyW") move.forward = false;
      if (e.code === "KeyS") move.backward = false;
      if (e.code === "KeyA") move.left = false;
      if (e.code === "KeyD") move.right = false;
      if (e.code === "Space") move.jump = false;
    };

    // 충돌 체크(AABB, 2D)
    function checkCollision(nx, ny, nz) {
      for (const obj of MAP_OBSTACLES) {
        if (obj.type === "wall" || obj.type === "box") {
          const minX = obj.x - obj.w / 2 - playerRadius;
          const maxX = obj.x + obj.w / 2 + playerRadius;
          const minZ = obj.z - obj.d / 2 - playerRadius;
          const maxZ = obj.z + obj.d / 2 + playerRadius;
          if (nx > minX && nx < maxX && nz > minZ && nz < maxZ && ny < obj.y + obj.h / 2) {
            return true;
          }
        }
        if (obj.type === "pillar") {
          const dx = nx - obj.x;
          const dz = nz - obj.z;
          const dist = Math.sqrt(dx * dx + dz * dz);
          if (dist < obj.r + playerRadius && ny < obj.y + obj.h / 2) {
            return true;
          }
        }
      }
      return false;
    }

    // 이동/점프/중력/충돌 처리 (애니메이션 프레임마다)
    let prevTime = performance.now();
    const update = () => {
      if (isLocked) {
        const camera = cameraRef.current;
        const player = gameStateRef.current.player;
        const speed = 0.15;
        const time = performance.now();
        const delta = (time - prevTime) / 16.67;
        prevTime = time;

        // 카메라 forward, right 벡터(y=0 평면 투영)
        const forward = new THREE.Vector3();
        camera.getWorldDirection(forward);
        forward.y = 0;
        forward.normalize();

        // 오른손 좌표계 기준 right 벡터 (forward x up)
        const right = new THREE.Vector3();
        right.crossVectors(forward, camera.up).normalize();

        let moveVec = new THREE.Vector3();
        if (move.forward) moveVec.add(forward);
        if (move.backward) moveVec.sub(forward);
        if (move.left) moveVec.sub(right);
        if (move.right) moveVec.add(right);

        // 점프
        if (move.jump && isGrounded) {
          vy = jumpPower;
          isGrounded = false;
        }

        // 중력 적용
        vy += gravity * delta;
        let nextY = player.y + vy * delta;

        // 이동 적용(충돌 체크)
        let nextX = player.x;
        let nextZ = player.z;
        if (moveVec.length() > 0) {
          moveVec.normalize();
          const tryX = player.x + moveVec.x * speed * delta;
          const tryZ = player.z + moveVec.z * speed * delta;
          // x축 이동 충돌 체크
          if (!checkCollision(tryX, nextY, player.z)) nextX = tryX;
          // z축 이동 충돌 체크
          if (!checkCollision(nextX, nextY, tryZ)) nextZ = tryZ;
        }

        // y축(점프/중력) 충돌 체크(바닥/구조물 위)
        let onGround = false;
        if (nextY <= playerHeight) {
          nextY = playerHeight;
          vy = 0;
          onGround = true;
        } else {
          // 구조물 위 착지 체크
          for (const obj of MAP_OBSTACLES) {
            if (obj.type === "wall" || obj.type === "box") {
              const minX = obj.x - obj.w / 2 - playerRadius;
              const maxX = obj.x + obj.w / 2 + playerRadius;
              const minZ = obj.z - obj.d / 2 - playerRadius;
              const maxZ = obj.z + obj.d / 2 + playerRadius;
              const topY = obj.y + obj.h / 2;
              if (
                nextX > minX &&
                nextX < maxX &&
                nextZ > minZ &&
                nextZ < maxZ &&
                player.y >= topY - 0.2 &&
                nextY <= topY
              ) {
                nextY = topY;
                vy = 0;
                onGround = true;
                break;
              }
            }
            if (obj.type === "pillar") {
              const dx = nextX - obj.x;
              const dz = nextZ - obj.z;
              const dist = Math.sqrt(dx * dx + dz * dz);
              const topY = obj.y + obj.h / 2;
              if (
                dist < obj.r + playerRadius &&
                player.y >= topY - 0.2 &&
                nextY <= topY
              ) {
                nextY = topY;
                vy = 0;
                onGround = true;
                break;
              }
            }
          }
        }
        isGrounded = onGround;

        // 맵 벽 통과 방지 (x/z -39~39)
        nextX = Math.max(-39, Math.min(39, nextX));
        nextZ = Math.max(-39, Math.min(39, nextZ));

        // 위치 갱신
        player.x = nextX;
        player.y = nextY;
        player.z = nextZ;

        // 카메라 위치 갱신
        camera.position.set(player.x, player.y, player.z);
      }
      requestAnimationFrame(update);
    };
    update();

    dom.addEventListener("click", handleClick);
    document.addEventListener("pointerlockchange", handlePointerLockChange);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      dom.removeEventListener("click", handleClick);
      document.removeEventListener("pointerlockchange", handlePointerLockChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [cameraRef, gameStateRef, mountRef]);
}

export default usePlayerControls;