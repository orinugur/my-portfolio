import { useEffect } from "react";
import * as THREE from "three";
import { MAP_OBSTACLES } from "./Map";

/**
 * 무기(총) 및 발사/재장전/시각 효과
 * - 마우스 클릭: 총알 발사
 * - R키: 재장전(탄약 0일 때만)
 * - 카메라 앞에 총 mesh 렌더링
 */
function useGun(cameraRef, gameStateRef, mountRef, sceneRef) {
  useEffect(() => {
    if (!cameraRef.current || !gameStateRef.current || !sceneRef.current) return;

    // 플레이어 화면 앞에 총 mesh 추가
    let gunMesh = null;
    if (!gunMesh) {
      const geometry = new THREE.BoxGeometry(0.7, 0.3, 2);
      const material = new THREE.MeshPhongMaterial({ color: 0x222222 });
      gunMesh = new THREE.Mesh(geometry, material);
      gunMesh.castShadow = true;
      gunMesh.receiveShadow = true;
      sceneRef.current.add(gunMesh);
    }

    // 총 mesh를 카메라 앞에 고정
    function updateGunMesh() {
      if (cameraRef.current && gunMesh) {
        // 카메라 앞쪽(시야 기준) 위치
        const camera = cameraRef.current;
        const offset = new THREE.Vector3(0.4, -0.4, -1.2); // 오른쪽 아래로 살짝
        const gunPos = offset.clone().applyQuaternion(camera.quaternion).add(camera.position);
        gunMesh.position.copy(gunPos);
        gunMesh.quaternion.copy(camera.quaternion);
      }
      requestAnimationFrame(updateGunMesh);
    }
    updateGunMesh();

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

    // 마우스 좌클릭: 총알 발사
    const handleMouseDown = (e) => {
      if (e.button !== 0) return; // 좌클릭만
      const player = gameStateRef.current.player;
      if (player.ammo <= 0) return;

      // 탄약 감소
      player.ammo -= 1;

      // 총알 시각 효과(작은 구체)
      const camera = cameraRef.current;
      const scene = sceneRef.current;
      const bulletGeometry = new THREE.SphereGeometry(0.1, 8, 8);
      const bulletMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
      bullet.position.copy(camera.position);
      scene.add(bullet);

      // 총알 이동 방향(카메라 forward)
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      direction.normalize();

      // 총알 이동 및 제거
      let distance = 0;
      const maxDistance = 60;
      const speed = 2.5;
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
        if (distance > maxDistance) {
          scene.remove(bullet);
          bullet.geometry.dispose();
          bullet.material.dispose();
          return;
        }
        requestAnimationFrame(animateBullet);
      }
      animateBullet();

      // 레이캐스팅으로 적 피격 판정
      const raycaster = new THREE.Raycaster();
      raycaster.set(camera.position, direction);

      // 씬 내 모든 적 mesh 대상으로 교차 판정
      const enemies = gameStateRef.current.enemies;
      const enemyMeshes = enemies.filter(e => e.alive && e.mesh).map(e => e.mesh);
      const intersects = raycaster.intersectObjects(enemyMeshes, false);

      if (intersects.length > 0) {
        // 가장 가까운 적만 피격 처리
        const hitMesh = intersects[0].object;
        const hitEnemy = enemies.find(e => e.mesh === hitMesh);
        if (hitEnemy) {
          hitEnemy.hp -= 50;
          if (hitEnemy.hp <= 0) {
            hitEnemy.alive = false;
            hitEnemy.mesh.visible = false;
            player.score += 100;
          }
        }
      }
    };

    // R키: 재장전(탄약 0일 때만)
    const handleReload = (e) => {
      if (e.code === "KeyR") {
        const player = gameStateRef.current.player;
        if (player.ammo === 0) {
          player.ammo = 30;
        }
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("keydown", handleReload);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("keydown", handleReload);
      if (gunMesh && sceneRef.current) {
        sceneRef.current.remove(gunMesh);
        gunMesh.geometry.dispose();
        gunMesh.material.dispose();
      }
    };
  }, [cameraRef, gameStateRef, mountRef, sceneRef]);
}

export default useGun;