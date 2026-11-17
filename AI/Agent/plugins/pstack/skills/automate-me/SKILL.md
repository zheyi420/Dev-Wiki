---
name: automate-me
description: "用于「automate me」、「创建/更新/刷新我的 -mode skill」、「把我的偏好或工作方式收成一份 skill」，或希望 agent 按用户的工作方式来。经 create-skill 加 unslop 起草或修订一份个人 -mode skill，可选地从最近的对话记录里拉新鲜证据。"
disable-model-invocation: true
---

# 把我自动化

一条引导流程，把用户的工作约定收成一份 agent 会遵守的 skill。产出是一份按他们定制的 `-mode` skill（例如 `jay-mode`、`priya-mode`）。

这个 skill 编排另外三个：一轮内联的挖掘（见第 1 步）、Cursor 内置的 `create-skill`（编写），以及 **unslop** skill（散文纪律）。它给它们排顺序。它不替代它们。

## 流程

### 0. 检查是否已有 skill

递归查找匹配用户标识的 `.cursor/skills/**/*-mode/SKILL.md` 和 `~/.cursor/skills/*-mode/SKILL.md`。mode skill 可以住在个人分类目录（`.cursor/skills/<handle>/`）里，不一定在顶层。已经有一份时，用 `AskQuestion` 确认意图（除非他们已经说了「update my skill」或类似的话）：

- 更新现有 skill（重复运行时的默认）
- 从头开始（少见，做之前先问为什么）

更新模式会改变后面的流程：
- 第 1 步只挖掘 skill 上次编辑之后的历史（`git log -1 --format=%cI <path>`）。
- 第 2 步问变了什么、缺了什么，不问从零要捕捉什么。
- 第 4 步就地编辑现有文件。用户没有否定的章节保留。有新证据的章节修订。只有真正的新规则才加新章节。

### 1. 挖掘他们的历史

扇出之前，先定位当前工作区的对话记录。系统 prompt 会点名这个工作区的 `agent-transcripts/` 目录。只用那条路径。不要跨 `~/.cursor/projects/*/` 做 glob。那会越过工作区边界，读到无关项目的私人聊天。

在这个范围内查看最近的 agent 对话，找反复出现的模式。对历史切片跑多个并行 subagent（例如最近 2 到 4 周，切成 3 片，让每片都有足够材料）。按 **poteto-mode** skill 的 Subagents 一节，为每个 subagent 按这项工作选定推理档位。每个切片挖掘 subagent 从父级给出的、限定在工作区的路径读取对话记录，寻找下面的信号，并返回一份短的结构化列表：它看到的模式，加上证据指针。默认值得找的信号：

- 回复偏好（长度、语气、格式、「说简单点」这类纠正）
- 委托习惯（subagent、模型、专门的工作流、并行）
- 验证姿态（「做完」是什么意思、单元测试还是现场复现、评审者）
- 代码和散文纪律（风格、引用的原则、lint 和格式工具）
- 流程约定（worktree、commit、PR、评审和合并工具）
- 元偏好（任务中途修 skill、提议新的 skill）

把一个信号抬上来之前，先跨切片核对。在 2 个及以上切片里出现的模式，置信度高。单独出现的信号弱，通常丢掉。

### 2. 直接问用户

挖掘会漏掉还没出现过的意图。用 `AskQuestion` 工具（结构化多选），不要让用户从空白开始打字。

形状：一到两个问题，每个 4 到 6 个选项，分类问题用 `allow_multiple: true`。先宽（「哪些方面最要紧？」），再对选中的方面用具体选项追问。结构化轮次之后，一个自由聊天问题接住选项没盖到的东西。

不要倒出 20 个问题。

### 3. 把发现归成簇

把合在一起的信号分成章节。常见的有这些（只用用得上的）：

- **回复风格**：长度、语气、格式。
- **自主**：不问就做多少，MCP 工具的使用。
- **先理解**：框定或调查一次改动时，先伸手拿哪些 skill。
- **Subagent**：默认、并行、模型对任务、专门的工作流。
- **散文 / 代码纪律**：原则、lint 工具、风格指南。
- **评审与验证**：复现姿态、验证 skill、现场测试工具。
- **流程**：git worktree、commit、PR、评审和合并工具。
- **Skill**：编写 skill 的习惯、先修 skill、提议新 skill。

**poteto-mode** skill 展示了这个形状。读它是为了看粒度。不要抄它的内容。用户的规则和 poteto-mode 的不是同一套。

### 4. 起草 skill

用 Cursor 内置的 `create-skill` skill 来编写。放置：

- 路径：保留现有 mode skill 的分类。新的 mode，仓库里这个标识已经有个人分类时用 `.cursor/skills/<handle>/<handle>-mode/SKILL.md`。否则默认放在项目的 `.cursor/skills/<handle>-mode/SKILL.md`（用户想要个人 skill 时用 `~/.cursor/skills/<handle>-mode/`）。
- 标识：用户的名字，或他们选定的标识。
- Frontmatter `description`：用他们的名字加上 `/<handle>-mode` 加上「按他们的风格工作」来触发，不要用「write code」或「review PR」这种泛关键词。
- Frontmatter 格式：遵循 `create-skill` 的 YAML 规则。`description` 保持为一个 YAML 标量。标点或换行需要时，给它加引号，或用 `description: >-` 加缩进的续行。
- Frontmatter 默认 `disable-model-invocation: true`。只有用户明确希望他们的 mode 在每一轮都生效时，才关掉。

### 5. 打磨散文

对每一行应用 **unslop** skill 和 `create-skill` 的写作指南。

把草稿给用户看，并接收反馈。预计要迭代多次。狠砍。一份 mode skill 不是手册。

### 6. 落地

在 main 拉出的 worktree 里干活。Commit 并开一个 PR。不要直接推到 main。

## 护栏

- **不要过拟合到一次对话。** 一个偏好说了一次，另一次又被否定，那是噪声。写进规则之前要有多次实例。
- **不要耍聪明。** 复述其他 skill 的内容、发明比喻，或给 agent 读者写「诗意」散文，是有成本没有收益。保持可操作。
- **引用，不要内联。** 用户依赖的其他 skill 应当以路径引用出现，不要粘贴摘录。他们在别处维护的原则文档也一样。
- **章节保持最小。** 只有用户在那里有一条具体的、非默认的规则时，才加一节。「把话说清楚」不是一节。「短段落。比较选项时用表格。只有各项真的并列时才用列表。」才是。
- **约定用通用称呼。** 祈使句里用「用户」或「人」，不要用作者的名字。
- **不要强行对称。** 用户没有值得写下的流程规则时，整节省掉流程一节。

## 评估

一份 `-mode` skill 是主观产出。`create-skill` 那种测试再迭代的基准循环在这里没用。跟用户对一下感觉：读起来像不像他们？有没有漏掉什么？然后交出去。

只有 skill 的触发准确度在实践里成了问题，才跑描述优化循环。

## 什么时候不用

- 用户要的是针对任务的 skill（不是工作约定）：只用 `create-skill`，不需要挖掘。
- 用户要捕捉一条窄的工作流（例如「我怎么写 commit 信息」）。那是一份普通 skill，不是 mode skill。
