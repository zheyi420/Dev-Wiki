# TypeGuard

TLC 到达了 3 个状态、2 步。图中画出 3 个状态、2 条箭头。
绘图运行以退出码 76 停止，所以图中只画出停止前到达的状态。

## TypeOK 不成立
最短路径有 2 步：
0. 0
1. Next: 1
2. Next: 2

## 未检查的规则
NeedsTypeOK, NoDeadlock
TLC 以退出码 76 停止，还没检查这些规则：
```
Error: Evaluating invariant NeedsTypeOK failed.
Attempted to apply tuple
<<"zero", "one">>
to integer 3 which is out of domain.
Error: The behavior up to this point is:
State 1: <Initial predicate>
x = 0

State 2: <Next line 6, col 9 to line 6, col 27 of module TypeGuard>
x = 1

State 3: <Next line 6, col 9 to line 6, col 27 of module TypeGuard>
x = 2
```
