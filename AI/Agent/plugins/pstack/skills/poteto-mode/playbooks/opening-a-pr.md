### 开 PR

在每份其他 playbook 的末尾调用。

从主干拉出的 git worktree 里干活，别把无关工作放进去。变基成小而可落地的 commit。commit 之前，对 diff 跑 `/deslop`（来自 `cursor-team-kit`）。

标题：`type(scope): subject`，有真实符号承载这次变更时，就点名它。正文：一份 40 行以内的一分钟简报，按顺序使用这些 `##` 标题，空的删掉：`## Why`、`## What changed`、`## Scope`、`## Tradeoffs`（只写评审者否则会问起来的、被否掉的替代方案）、`## Blast Radius`、`## Verification`。

按基线分支把后续 PR 叠起来。PR 以就绪状态打开，走这次运行的 PR 工具，并带上 `draft: false`。没有这种工具时，用不带 `--draft` 的 `gh pr create`；Origin 的 CLI 能解析这个仓库时，用 `origin pr create --status open`。开 PR 不会启动看护。
