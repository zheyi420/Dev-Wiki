# MediaPlayer

TLC 到达了 12 个状态、64 步。图中画出 7 个状态、13 条箭头。
步骤 a call comes in 同时改变 Playback 和 Volume。
步骤 the track ends 同时改变 Playback 和 Volume。
步骤 you press stop 同时改变 Playback 和 Volume。

## LoudWhenStopped 不成立
最短路径有 1 步：
0. Playback Stopped, Volume Normal volume
1. you turn it up: Playback Stopped, Volume Loud

## 成立的规则
TypeOK, NoDeadlock, EventuallyStops
