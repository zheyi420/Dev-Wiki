# CounterFan

TLC 到达了 25 个状态、36 步。图中画出 25 个状态、36 条箭头。

## NotDone 不成立
最短路径有 2 步：
0. done=FALSE x=0
1. Pick: done=FALSE x=1
2. Finish: done=TRUE x=1

## 成立的规则
NoDeadlock
