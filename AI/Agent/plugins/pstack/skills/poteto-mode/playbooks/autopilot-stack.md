### Autopilot-stack

跑 Autopilot-full playbook，但不要合并。

1. **代替第 5 步，停在已验证。** 每个 PR 都在当前 head 上验证过、而且是绿的，就停，然后把这些 PR 交给操作者。交接之后，没有操作者点头，谁也不推送。每一轮 tick 的 prompt 都点名这个文件，所以每一拍都能看到不许合并这条规则。
2. **只有建在另一个 PR 之上时，才把 PR 放进 stack。** 这是第 3 步的唯一例外。按 `playbooks/opening-a-pr.md` 里的 **规模与 stack**，把 PR 的基线分支设成另一个 PR 的分支，而不是主干。代替第 2 步往主干变基：每个 PR 变基到父 PR 的分支上，stack 的根变基到主干。下层 PR 出现新的 head，就把它上面的 PR 重新 stack。某个 PR 的 `git patch-id` 在重新 stack 之后没有变化，就保留它的裁决。

**回复：** 列出每个 PR 及其裁决，代替『合并了什么』。
