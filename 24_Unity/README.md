# Unity NavMesh 기반 Enemy AI (State Pattern, Animator 연동)

---

## Q&A 이력

### Q. NavMesh를 사용하여 Player Layer를 체크, 추격/공격/사망 상태패턴, Animator 트리거, 스탯 인스펙터 노출까지 구현하고 싶어요.

#### A.
- NavMeshAgent로 Player를 추적
- State Pattern으로 Chase/Attack/Dead 상태 분리
- Animator 트리거(Attack/Die)로 애니메이션 제어
- HP, 공격력, 이동속도 등 Inspector에서 조정
- **Update → FixedUpdate로 변경, 이동 벡터 기반 Move(float) 파라미터 애니메이터에 전달**
- 구조/코드/설정법은 아래 예시 참고

---

## 디렉토리 구조 예시

```
/AIEnemy/
  EnemyController.cs
  IEnemyState.cs
  EnemyChaseState.cs
  EnemyAttackState.cs
  EnemyDeadState.cs
  EnemyStats.cs
```

---

## Animator 세팅

- Trigger 파라미터: `Attack`, `Die`
- Float 파라미터: `MoveX`, `MoveY`, `MoveZ` (NavMeshAgent의 velocity.x, y, z 값이 실시간 전달됨)
- 공격 Animation Clip에 Animation Event로 `EnemyController.DealDamageToPlayer()` 호출

---

## 확장/주의

- 플레이어는 `IDamageable` 인터페이스 구현 필요
- 사망 시 콜라이더 비활성화, 오브젝트 풀링 등 추가 가능
- 스탯은 ScriptableObject로 분리해도 좋음

---

## 핵심 코드 구조

- EnemyController: MonoBehaviour, 상태 전환 및 스탯 관리, Animator/Agent 연동
- IEnemyState: 상태 패턴 인터페이스
- EnemyChaseState/EnemyAttackState/EnemyDeadState: 상태별 로직 분리
- EnemyStats: 인스펙터 노출용 스탯 클래스

---

## 사용법 요약

1. Enemy 프리팹에 EnemyController, NavMeshAgent, Animator 컴포넌트 추가
2. Animator에 Attack, Die 트리거 파라미터 생성
3. 공격 Animation Clip에 Animation Event로 DealDamageToPlayer() 호출
4. EnemyController의 playerLayer에 Player가 속한 Layer 지정
5. 스탯(HP, 공격력, 이동속도 등)은 Inspector에서 조정

---