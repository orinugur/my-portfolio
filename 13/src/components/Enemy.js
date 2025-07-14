import { useEffect } from "react";
import * as THREE from "three";
import { MAP_OBSTACLES } from "./Map";

/**
 * 적 캐릭터 및 AI
 * - 위치, 이동, 피격, 총 mesh, 총알 발사(플레이어 피격)
 */
function useEnemyAI(cameraRef, gameStateRef, sceneRef) {
  useEffect(() => {
    if (!cameraRef.current || !gameStateRef.current || !sceneRef.current) return;

    // 적 mesh/총 mesh가 없으면 생성해서 씬에 추가
    const enemies = gameStateRef.current.enemies;
    for (let enemy of enemies) {
      if (!enemy.mesh) {
        const geometry = new THREE.SphereGeometry(1, 16, 16);
        const material = new THREE.MeshPhongMaterial({ color: 0xff3333 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(enemy.x, enemy.y, enemy.z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        sceneRef.current.add(mesh);
        enemy.mesh = mesh;
      }
      if (!enemy.gunMesh) {
        const gunGeometry = new THREE.BoxGeometry(0.7, 0.3, 2);
        const gunMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
        const gunMesh = new THREE.Mesh(gunGeometry, gunMaterial);
        gunMesh.castShadow = true;
        gunMesh.receiveShadow = true;
        sceneRef.current.add(gunMesh);
        enemy.gunMesh = gunMesh;
      }
    }

    // 적 AI: 플레이어를 향해 이동 및 총 mesh 위치/회전
    let aiInterval = setInterval(() => {
      const player = gameStateRef.current.player;
      for (let enemy of enemies) {
        if (!enemy.alive || !enemy.mesh) continue;
        // 이동
        const dx = player.x - enemy.x;
        const dz = player.z - enemy.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist > 1) {
          enemy.x += (dx / dist) * 0.05;
          enemy.z += (dz / dist) * 0.05;
          enemy.mesh.position.set(enemy.x, enemy.y, enemy.z);
        }
        // 총 mesh를 적 mesh의 오른쪽+앞+아래(손 위치)에 위치시키고, lookAt 후 회전 적용
        if (enemy.gunMesh) {
          // 적이 플레이어를 바라보도록 회전
          const lookAt = new THREE.Vector3(player.x, enemy.y, player.z);
          enemy.mesh.lookAt(lookAt);

          // 총 mesh 위치: 적 mesh의 local (x=+0.5, y=-0.4, z=-1.2)
          const gunOffset = new THREE.Vector3(0.5, -0.4, -1.2);
          const gunPos = gunOffset.clone().applyQuaternion(enemy.mesh.quaternion).add(enemy.mesh.position);
          enemy.gunMesh.position.copy(gunPos);
          enemy.gunMesh.quaternion.copy(enemy.mesh.quaternion);
        }
        // 피격 시 mesh 숨김
        if (!enemy.alive && enemy.mesh.visible) {
          enemy.mesh.visible = false;
          if (enemy.gunMesh) enemy.gunMesh.visible = false;
        }
      }
    }, 50);

    // 총알-구조물 충돌 체크(AABB, 2D)
    function bulletHitsObstacle(pos) {
      for (const obj of MAP_OBSTACLES) {
        if (obj.type === "wall" || obj.type === "box") {
          const minX = obj.x - obj.w / 2;
          const maxX = obj.x + obj.w / 2;
          const minZ = obj.z - obj.d / 2;
          const maxZ = obj.z + obj.d / 2;
          if (pos.x > minX && pos.x < maxX && pos.z > minZ && pos.z < maxZ && pos.y < obj.y + obj.h / 2 && pos.y > obj.y - obj.h / 2) {
            return true;
          }
        }
        if (obj.type === "pillar") {
          const dx = pos.x - obj.x;
          const dz = pos.z - obj.z;
          const dist = Math.sqrt(dx * dx + dz * dz);
          if (dist < obj.r && pos.y < obj.y + obj.h / 2 && pos.y > obj.y - obj.h / 2) {
            return true;
          }
        }
      }
      return false;
    }

    // 적 총알 발사(일정 주기, 플레이어 피격)
    let shootInterval = setInterval(() => {
      const player = gameStateRef.current.player;
      for (let enemy of enemies) {
        if (!enemy.alive || !enemy.mesh || !enemy.gunMesh) continue;
        // 플레이어를 향해 총알 발사
        const scene = sceneRef.current;
        const bulletGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const bulletMaterial = new THREE.MeshBasicMaterial({ color: 0xff3333 });
        const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
        bullet.position.copy(enemy.gunMesh.position);
        scene.add(bullet);

        // 총알 이동 방향(플레이어 방향)
        const direction = new THREE.Vector3(
          player.x - enemy.x,
          0,
          player.z - enemy.z
        ).normalize();

        // 총알 이동 및 제거, 플레이어/구조물 피격 판정
        let distance = 0;
        const maxDistance = 60;
        const speed = 2.0;
        let hit = false;
        function animateBullet() {
          bullet.position.addScaledVector(direction, speed);
          distance += speed;
          // 구조물 충돌 체크
          if (bulletHitsObstacle(bullet.position)) {
            scene.remove(bullet);
            bullet.geometry.dispose();
            bullet.material.dispose();
            return;
          }
          // 플레이어 피격 판정(총알과 플레이어 거리)
          if (!hit && bullet.position.distanceTo(new THREE.Vector3(player.x, enemy.y, player.z)) < 1.2) {
            player.hp -= 10;
            hit = true;
            scene.remove(bullet);
            bullet.geometry.dispose();
            bullet.material.dispose();
            return;
          }
          if (distance > maxDistance) {
            scene.remove(bullet);
            bullet.geometry.dispose();
            bullet.material.dispose();
            return;
          }
          requestAnimationFrame(animateBullet);
        }
        animateBullet();
      }
    }, 1200);

    return () => {
      clearInterval(aiInterval);
      clearInterval(shootInterval);
      for (let enemy of enemies) {
        if (enemy.gunMesh && sceneRef.current) {
          sceneRef.current.remove(enemy.gunMesh);
          enemy.gunMesh.geometry.dispose();
          enemy.gunMesh.material.dispose();
        }
      }
    };
  }, [cameraRef, gameStateRef, sceneRef]);
}

export default useEnemyAI;