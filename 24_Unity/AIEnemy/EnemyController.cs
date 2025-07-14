using UnityEngine;
using UnityEngine.AI;

[RequireComponent(typeof(NavMeshAgent), typeof(Animator))]
public class EnemyController : MonoBehaviour
{
    [Header("스탯")]
    public EnemyStats Stats = new EnemyStats();

    [Header("플레이어 레이어")]
    public LayerMask playerLayer;

    [Header("애니메이터 트리거명")]
    public string attackTrigger = "Attack";
    public string dieTrigger = "Die";

    [HideInInspector] public Animator Animator;
    [HideInInspector] public NavMeshAgent Agent;
    [HideInInspector] public Transform PlayerTarget;

    public IEnemyState ChaseState { get; private set; }
    public IEnemyState AttackState { get; private set; }
    public IEnemyState DeadState { get; private set; }

    private IEnemyState currentState;
    private float currentHP;
    public bool IsDead => currentHP <= 0;

    void Awake()
    {
        Animator = GetComponent<Animator>();
        Agent = GetComponent<NavMeshAgent>();
        currentHP = Stats.maxHP;

        ChaseState = new EnemyChaseState();
        AttackState = new EnemyAttackState();
        DeadState = new EnemyDeadState();
    }

    void Start()
    {
        FindPlayer();
        ChangeState(ChaseState);
    }

    void FixedUpdate()
    {
        if (PlayerTarget == null)
            FindPlayer();

        currentState?.Update();
    }

    public void ChangeState(IEnemyState newState)
    {
        currentState?.Exit();
        currentState = newState;
        currentState.Enter(this);
    }

    public void TakeDamage(float amount)
    {
        if (IsDead) return;
        currentHP -= amount;
        if (IsDead)
            ChangeState(DeadState);
    }

    private void FindPlayer()
    {
        Collider[] hits = Physics.OverlapSphere(transform.position, Stats.chaseRange, playerLayer);
        if (hits.Length > 0)
            PlayerTarget = hits[0].transform;
    }

    // Animation Event에서 호출 (공격 타이밍에 맞춰)
    public void DealDamageToPlayer()
    {
        if (PlayerTarget != null)
        {
            // 예시: Player에 IDamageable 인터페이스 구현 권장
            var dmg = PlayerTarget.GetComponent<IDamageable>();
            if (dmg != null)
                dmg.TakeDamage(Stats.attackPower);
        }
    }
}