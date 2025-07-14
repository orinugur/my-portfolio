using UnityEngine;

public class EnemyDeadState : IEnemyState
{
    private EnemyController enemy;

    public void Enter(EnemyController enemy)
    {
        this.enemy = enemy;
        enemy.Agent.isStopped = true;
        enemy.Animator.SetTrigger("Die");
        // 필요시 콜라이더 비활성화 등 추가
    }

    public void Update() { }

    public void Exit() { }
}