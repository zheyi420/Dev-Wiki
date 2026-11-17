### 开 PR

在每份其他 playbook 的末尾调用。

**Worktree。** 从 main 拉出的 git worktree 里干活。subagent 继承它。同一分支上的多次 `Task` 调用，各自拿到自己的 worktree，或者在两次之间用 `git fetch && git reset --hard origin/<branch>`。分支是脏的，还夹着无关工作：把补丁摘出来，开一个干净 worktree，再应用。worktree 缠住了：从 main 重置，按最小范围重做。

**Commit。** 勤于 commit。开 PR 之前，变基成小而有序的 commit。每个 commit 都是未来的一个 PR：能够落地，顺序要能把故事讲清楚。修复属于刚做好的那个 commit，就 amend。能分开，就新开一个 commit。commit 正文不重复主题。

**PR。** commit 之前，对 diff 跑 `/deslop`（来自 `cursor-team-kit`），评审之前跑 `/no-comments`。每个 PR 的标题、描述和 commit 正文都用 `/technical-writing` 来写（Diátaxis 以外的每一层，并套用 STE 用词规则：一个动作一个词，保留冠词，有朴素动词就不用 `-ing`），然后再套 `/unslop`。

**标题。** Conventional Commits `type(scope): subject`，末尾不加句号。类型例如 `feat`、`fix`、`docs`、`refactor`、`test`、`chore` 或 `perf`。范围是区域，例如 `pstack` 或 `poteto-mode`。主题要短、用祈使语气；有真实符号承载这次变更时，就点名它，例如 `fix(pstack): retarget opening-a-pr babysit trigger`。

**描述。** PR 正文是一分钟简报，不是实验笔记，写给已经拿着 diff 的评审者。它要说清改动为什么存在、故意没做什么、可能弄坏什么，以及你怎么证明它能工作。句子短、简单，标识符少，不要砌成文字墙。正文会变成 squash commit 的正文，所以这个 commit 控制在大约 40 行以内。按下面的顺序使用 `##` 标题，不要用粗体领句；一节没什么可说就删掉：

- `## Why`：问题和做法，1–3 句短句。不要 SHA，不要变基谱系，也不要「基于 main」这种开场白。
- `## What changed`：1–3 条短条目。只有真实符号或路径承载这次变更时才点名。重命名或改目标时，两边都写。
- `## Scope`：这一节始终要有。1–3 条短项，写它覆盖什么、故意留下什么（一项后续、一个已知缺口）。不要符号、路径，也不要逐文件的长文。
- `## Tradeoffs`：只写评审者否则会问起来的、被否掉的替代方案。没有真正的取舍就跳过。
- `## Blast Radius`：1–2 句，写它碰到谁或什么，以及为什么这样是安全的，或风险在哪。main 若是红的，写明让它继续红着的代价。
- `## Verification`：1–3 条，每条是一条真实的运行路径和它的结果。性能：一个主数字，带上单位、`before → after`，以及指向其余内容的 arena 或 swarm 目录链接。不要写样本量方法论、swarm 复述或指标表。

这些节之后，视频或截图能证明某个说法时就附上。完整 SHA、swarm 或 arena 的通道复述、杠杆修正的长文、逐文件清单，以及「CLEAN」判定，放进链接出去的产物，不放进正文。

**托管平台。** 第一次 PR 操作之前先解析托管平台，创建、编辑、查看、监视和合并都沿用这个选择。GitHub CLI（`gh`）是默认。若 `command -v origin` 成功，且 Origin 能解析这个仓库，优先用 `origin pr ...`。Origin 不在，或解析不了这个仓库，就留在 `gh`，并记下回退。不要要求 Graphite（`gt`）。

**内置 PR 工具。** 这次运行若提供内置 PR 工具，创建、编辑、改目标和标为就绪都走它，绝不走托管平台的 CLI。用 CLI 开出来的 PR，会漏掉工具所跟踪的东西。工具没覆盖到的，以及这次运行没有这种工具时的每一次 PR 操作，用已经解析好的托管平台。

**规模和 stack。** 五个窄 PR，好过一个大 PR。stack 是一条基线分支链。根 PR 指向主干。每个子分支变基到父分支的精确尖端，它的 PR 指向父分支。父级一合并，就按 `playbooks/shipping.md` 第 4 步把子级移到主干上。没有内置 PR 工具时，按已解析的托管平台，用 `origin pr create --status open --base <parent-branch>` 或 `gh pr create --base <parent-branch>` 创建子 PR，用 `origin pr edit <pr> --base <parent-branch>` 或 `gh pr edit <pr> --base <parent-branch>` 给一个 PR 改目标。只有彼此独立的工作才从主干拉分支。做大块 stack 工作之前，先变基到主干。

**就绪。** 每个 PR 都直接以就绪打开，不要开成草稿。内置 PR 工具可能默认草稿，所以经它发出的每一次创建调用都带上 `draft: false`。用 Origin 时传入 `--status open`。用 `gh` 时省掉 `--draft`。PR 若仍然以草稿打开，就通过 PR 工具标为就绪，或按已解析的托管平台跑 `origin pr ready <number>` 或 `gh pr ready <number>`。引用 PR 状态之前，先跑 `origin pr view <number>` 或 `gh pr view <number>`。

**看护。** 开 PR 不会启动看护。贴出 URL，继续构建。先把这个阶段或整个 stack 做完。只有整个 stack 已经在，而且用户提出要求，才单独跑一遍看护。每个新 PR 都看护，会拖住构建，并把检查花在后面的波次会推倒重来的 commit 上。反馈偏离意图时，顶回去。

开出 PR 的 subagent 要跑 `/deslop` 和 `/no-comments`，并贴出 URL。它回到父级，不进入看护，除非它是 Autopilot-full 或 Autopilot-stack 的负责人。这个负责人的简报指定了看护循环，而这正是 `playbooks/babysit.md` 在等的那个请求。负责人在代码就绪报告之后启动循环，报告可合并，并且不受这里以及 `playbooks/babysit.md` 里那些「等到整个 stack 建完才看护」的规则约束。
