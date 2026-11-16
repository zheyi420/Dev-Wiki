# DieHard

TLC 到达了 16 个状态、96 步。图中画出 16 个状态、58 条箭头。
图中没有画出停留在同一图状态里的 38 步。

## NotSolved 不成立
最短路径有 6 步：
0. big=0 small=0
1. FillBig: big=5 small=0
2. BigToSmall: big=2 small=3
3. EmptySmall: big=2 small=0
4. BigToSmall: big=0 small=2
5. FillBig: big=5 small=2
6. BigToSmall: big=4 small=3

## 成立的规则
TypeOK, NoDeadlock
