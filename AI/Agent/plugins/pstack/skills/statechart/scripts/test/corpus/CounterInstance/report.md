# CounterInstance

TLC 到达了 3 个状态、3 步。图中画出 3 个状态、3 条箭头。

## ReachesThree 不成立
TLC 的反例在 tlc-ReachesThree.out 里。它有 3 步：
0. 0
1. C!Up: 1
2. C!Up: 2
3. C!Back: 1
这次运行在 "1" 和 "2" 之间永远循环。

## 成立的规则
NoDeadlock
