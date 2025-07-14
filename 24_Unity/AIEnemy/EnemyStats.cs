using UnityEngine;

[System.Serializable]
public class EnemyStats
{
    [Header("기본 스탯")]
    public float maxHP = 100f;
    public float attackPower = 10f;
    public float moveSpeed = 3.5f;
    public float attackRange = 2f;
    public float chaseRange = 10f;
    public float attackCooldown = 1.5f;
}