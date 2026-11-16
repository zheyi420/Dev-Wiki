# MediaPlayerFixed

TLC 到达了 11 个状态、57 步。图中画出 7 个状态、13 条箭头。
步骤 a call comes in 同时改变 Playback 和 Volume。
步骤 you press stop 同时改变 Playback 和 Volume。
步骤 the track ends 同时改变 Playback 和 Volume。

## 成立的规则
TypeOK, LoudWhenStopped, NoDeadlock
