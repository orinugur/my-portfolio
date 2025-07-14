using UnityEngine;
using UnityEngine.AI;

public class EnemyChaseState : IEnemyState
{
    private EnemyController enemy;
    private NavMeshAgent agent;
    private Transform target;

    public void Enter(EnemyController enemy)
    {
        this.enemy = enemy;
        agent = enemy.Agent;
        target = enemy.PlayerTarget;
        agent.isStopped = false;
        agent.speed = enemy.Stats.moveSpeed;
    }

    public void Update()
    {
        if (enemy.IsDead)
        {
            enemy.ChangeState(enemy.DeadState);
            return;
        }

        if (target == null)
            return;

        float dist = Vector3.Distance(enemy.transform.position, target.position);
        if (dist <= enemy.Stats.attackRange)
        {
            enemy.ChangeState(enemy.AttackState);
            return;
        }
        if (dist > enemy.Stats.chaseRange)
        {
            agent.isStopped = true;
            return;
        }

        agent.SetDestination(target.position);

        // NavMeshAgent의 velocity를 기반으로 Animator에 MoveX, MoveY, MoveZ 파라미터 전달
        Vector3 velocity = agent.velocity;
        enemy.Animator.SetFloat("MoveX", velocity.x);
        enemy.Animator.SetFloat("MoveY", velocity.y);
        enemy.Animator.SetFloat("MoveZ", velocity.z);
    }

    public void Exit()
    {
        agent.isStopped = true;
    }
}