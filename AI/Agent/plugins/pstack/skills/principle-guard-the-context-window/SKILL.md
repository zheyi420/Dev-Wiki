---
name: principle-guard-the-context-window
description: "上下文快满时使用：大段输出、长文件、反复读取、扇出规划。把大块内容交给 subagent；主线程里留摘要，不留原始载荷。"
disable-model-invocation: true
---

# 守住上下文窗口

**为什么：** 上下文溢出会降低推理质量，制造压缩痕迹，并让进度停住。

**做法：**
- **控制阶段规模并封顶范围。** 限制每个阶段的文件数，设定轮次预算，把机制本身的开销算进去。
