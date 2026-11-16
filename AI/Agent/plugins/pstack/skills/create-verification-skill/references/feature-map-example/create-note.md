# 创建笔记

创建笔记让用户从浏览器或 CLI 保存一条带标题的笔记，取消一份没写完的草稿，并从第二个面向用户的视图确认已保存的笔记。

## 子功能

- `create-open` 从每个浏览器入口打开一个空白编辑器。
- `create-save` 持久化标题和正文。
- `create-cancel` 丢掉一份没写完的浏览器草稿。
- `create-cli` 从终端创建同样形状的笔记。

## 怎么到达（用户视角）

- 在浏览器工具栏选择 `New note` 按钮。
- 焦点不在可编辑字段里时，在浏览器按 `n`。
- 在终端运行 `notes create --title <title> --body <body>`。

## 用 control-notes 驱动

前提：

- Notes 在 `http://127.0.0.1:4173` 是健康的。
- 没有标题为 `Release checklist` 的笔记。
- `control-notes doctor` 报告预期的 URL 和一次性数据目录。

- **打开编辑器。** 选择 `New note`。运行 `control-notes browser click --role button --name "New note"`。出现一个名为 `Note editor` 的表单，焦点在 `Title` 文本框里。
- **输入内容。** 输入标题和正文。运行 `control-notes browser fill --role textbox --name "Title" --value "Release checklist"` 和 `control-notes browser fill --role textbox --name "Body" --value "Tag and publish"`。`Save note` 按钮变为可用。
- **保存笔记。** 选择 `Save note`。运行 `control-notes browser click --role button --name "Save note"`。出现一个名为 `Note saved` 的状态，标题读作 `Release checklist`。
- **确认持久化。** 回到笔记列表并重新打开这条笔记。运行 `control-notes browser click --role link --name "All notes"` 和 `control-notes browser click --role link --name "Release checklist"`。编辑器显示两个已保存的值。
- **取消草稿。** 打开一条新笔记，输入 `Discard me`，并选择 `Cancel`。运行 `control-notes browser click --role button --name "New note"`、`control-notes browser fill --role textbox --name "Title" --value "Discard me"` 和 `control-notes browser click --role button --name "Cancel"`。笔记列表回来了，并且没有 `Discard me` 链接。
- **CLI 入口。** 创建第二条笔记。运行 `control-notes cli -- notes create --title "CLI note" --body "Created from terminal" --format json`。退出码 `0` 和 stdout 包含新笔记的 ID 和标题。
- **证明。** 从 `All notes` 重新打开两条已保存的笔记。运行 `control-notes browser snapshot --aria --path artifacts/create-note/list.aria.txt` 和 `control-notes browser screenshot --path artifacts/create-note/list.png`。产物显示 `Release checklist` 和 `CLI note`。

## 陷阱

- 文本框有焦点时按 `n`，会输入这个字符，而不是打开新编辑器。
- 保存时标题会被去掉首尾空白。断言渲染出来的标题，不要断言草稿输入框的值。
- 只有保存状态不够当证明。从列表重新打开这条笔记。
- 清理夹具时去掉 `Release checklist` 和 `CLI note`，但保留它们的证明产物。
