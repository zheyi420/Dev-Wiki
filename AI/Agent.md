# Agent 运行模式

## ReAct 模式
> Reasoning and Acting
> 思考与行动
> 
> 目前最广泛常见的 Agent 构建模式

ReAct 执行流程图：

![](assets/Pasted%20image%2020260413215651.png)

核心流程：

![](assets/Pasted%20image%2020260413215805.png)

### ReAct 模式是如何实现的

- 和模型训练过程关系不大。
- 大部分奥秘在于系统提示词

系统提示词
> 跟用户问题一起给模型的提示词
> 规定了：模型角色（职责描述）、可用工具、运行规则（示例、注意事项）、环境信息 ... 
> 
> 相当于给模型安排了一个剧本，会严格按照剧本走完。
> 
> 规范实现时：系统提示词与用户任务应当分开传给模型

### ReAct 运行时序图

![](assets/Pasted%20image%2020260413223942.png)

![](assets/Pasted%20image%2020260413224612.png)

## Plan-And-Execute 模式

- 先规划再执行，每个 Agent 的实现多多少少有区别。

### 运行流程

![](assets/Pasted%20image%2020260413231340.png)


![](assets/Pasted%20image%2020260413233815.png)

# 参考

- [Agent 的概念、原理与构建模式 —— 从零打造一个简化版的 Claude Code](https://www.youtube.com/watch?v=GE0pFiFJTKo) 
- [langchain-ai/langgraph/Plan-and-Execute](https://github.com/langchain-ai/langgraph/blob/23961cff61a42b52525f3b20b4094d8d2fba1744/docs/docs/tutorials/plan-and-execute/plan-and-execute.ipynb) 
