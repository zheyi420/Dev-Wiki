# HiddenClock

TLC 到达了 2 个状态、2 步。图中画出 2 个状态、1 条箭头。
图中没有画出停留在同一图状态里的 1 步。
使用 VIEW 时，TLC 对每一组计为相同的状态只保留一个代表。箭头可能指向这个代表，而不是步骤真正到达的状态。

## EndsAtZero 不成立
TLC 的反例在 tlc-EndsAtZero.out 里。它有 1 步：
0. x=0 clock=0
1. Tick: x=1 clock=1
这次运行永远停在 "x=1 clock=1"。
