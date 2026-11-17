# LoginParallel

TLC 到达了 12 个状态、29 步。图中画出 7 个状态、10 条箭头。
步骤 ThePasswordIsWrong 同时改变 Session 和 Tries。
步骤 ThePasswordIsRight 同时改变 Session 和 Tries。

## SignedInWhileLocked 不成立
最短路径有 5 步：
0. Session Signed out, Tries No wrong tries
1. ThePasswordIsWrong: Session Signed out, Tries 1 wrong try
2. ThePasswordIsWrong: Session Signed out, Tries 2 wrong tries
3. ThePasswordIsWrong: Session Signed out, Tries Locked out
4. YouSubmitAPassword: Session Checking the password, Tries Locked out
5. ThePasswordIsRight: Session Signed in, Tries Locked out

## 成立的规则
TypeOK, NoDeadlock
