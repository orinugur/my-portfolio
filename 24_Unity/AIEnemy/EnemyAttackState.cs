using UnityEngine;

public class EnemyAttackState : IEnemyState
{
    private EnemyController enemy;
    private float lastAttackTime;

    public void Enter(EnemyController enemy)
    {
        this.enemy = enemy;
        lastAttackTime = -enemy.Stats.attackCooldown;
        enemy.Agent.isStopped = true;
    }

    public void Update()
    {
        if (enemy.IsDead)
        {
            enemy.ChangeState(enemy.DeadState);
            return;
        }

        float dist = Vector3.Distance(enemy.transform.position, enemy.PlayerTarget.position);
        if (dist > enemy.Stats.attackRange)
        {
            enemy.ChangeState(enemy.ChaseState);
            return;
        }

        if (Time.time - lastAttackTime >= enemy.Stats.attackCooldown)
        {
            enemy.Animator.SetTrigger("Attack"); // Animator 트리거
            lastAttackTime = Time.time;
            // 실제 데미지 처리는 Animation Event에서 호출 권장
        }
    }

    public void Exit() { }
}