# CounterDeadlock

TLC 到达了 4 个状态、3 步。图中画出 4 个状态、4 条箭头。
约束排除的 1 步结束了一条规则的路径，图中包含了这一步。TLC 会在这类步骤之后检查规则，但不会走这一步。
图中只标出 TLC 报告的死锁。在 CONSTRAINT 或 ACTION_CONSTRAINT 之下，图里没有向外步骤的状态仍可能有被约束排除的步骤，TLC 不会把它算作死锁。

## NotThree 不成立
最短路径有 1 步：
0. 0
1. Jump: 3

## NoDeadlock 不成立
最短路径有 3 步：
0. 0
1. Inc: 1
2. Inc: 2
3. Inc: 3
