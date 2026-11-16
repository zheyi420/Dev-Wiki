# LoginGuarded

TLC 到达了 8 个状态、11 步。图中画出 7 个状态、10 条箭头。
步骤 ThePasswordIsRight 同时改变 Session 和 Tries。
步骤 ThePasswordIsWrong 同时改变 Session 和 Tries。

## 成立的规则
TypeOK, SignedInWhileLocked, NoDeadlock
