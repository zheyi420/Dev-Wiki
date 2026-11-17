# 功能图例子

把 Benny 可能复现的每一个面向用户的功能都画进来。驱动应用之前先读相关小节。这张图保持用户视角。内部实现和当前代码路径留到运行时再发现，不要在这里冻住。

把这个文件复制到 `.cursor/automations/benny/` 之外，例如 `.cursor/benny/feature-map.md`，并把 `control.feature_map_path` 指到这份副本。包刷新不得覆盖它。

## 按功能的模板

### `<feature name>`

`<one-line user-visible purpose>`

#### 用户怎么到那里

- 点击路径：`<screen> -> <menu, tab, or panel> -> <control>`
- 键盘快捷键：`<shortcut or none>`

#### 控制适配器怎么驱动它

- `<adapter action>` 配合 `<inputs>` 应该 `<visible result>`。
- 重置：`<how the adapter returns to a fresh state>`。

#### 稳定选择器

- `<role and accessible name>`
- `<ARIA relationship>`
- `<data-component or purpose-named data attribute>`

绝不要用生成的 CSS 或 StyleX class、动态哈希、子节点序号，或脆弱的 DOM 位置。

#### 要演练的状态

- 默认、悬停、focus-visible、激活、禁用
- 加载中、空、错误
- 已选、打开、展开
- `<relevant feature-specific variants>`

标出不适用的状态。

#### 前置条件和准备

- 认证：`<account state>`
- 数据：`<fixture>`
- 权限：`<role>`
- flag：`<flag or none>`
- 服务：`<required availability>`

#### 证据和交叉核对

- 截图：`<app identity, feature, and discriminating state>`
- 视频：`<entry path, interaction, and final state>`
- 交叉核对：`<read-only state or value that confirms the UI>`

#### 易错点

- `<known dead end or wrong surface>`
- `<safe environment translation>`

## 虚构例子

这些功能属于一个虚构的任务应用。它们是例子，不是 Benny 必备功能。

### 登录

让用户进入这个任务应用。

#### 用户怎么到那里

- 打开应用并选择 `Sign in`。没有快捷键。

#### 控制适配器怎么驱动它

- `open_app`、`click Sign in`、`fill credentials` 和 `click Continue` 应该打开条目列表。
- 退出登录并清掉一次性会话来重置。

#### 稳定选择器

- 按钮 `Sign in`，文本框 `Email` 和 `Password`，`data-component="sign-in-form"`

#### 要演练的状态

- 默认、focus-visible、提交中、禁用、加载中、错误

#### 前置条件和准备

- 一次性账号和可用的认证服务

#### 证据和交叉核对

- 从落地页录到条目列表。检查只读的会话状态。

#### 易错点

- 营销页是错误的界面。认证服务缺失就是阻塞。

### 条目列表和详情

让用户浏览条目并打开其中一条。

#### 用户怎么到那里

- 打开 `Items` 标签页，然后选一行。

#### 控制适配器怎么驱动它

- `select_tab Items` 和 `click <fixture item>` 应该打开它的详情。
- 关掉详情并清掉选择来重置。

#### 稳定选择器

- 名为 `Items` 的标签页和列表、以夹具命名的行、`data-component="item-detail"`

#### 要演练的状态

- 加载中、空、错误、已选、打开、展开

#### 前置条件和准备

- 具名的夹具条目、读取权限、可用的条目服务

#### 证据和交叉核对

- 显示选择和匹配的详情标题。检查已选条目 ID。

#### 易错点

- 搜索结果看起来可能很像，但走的是另一条路径。

### 条目编辑器

让用户创建或编辑一条条目。

#### 用户怎么到那里

- 从详情选择 `Edit`，或从列表选择 `New item`。

#### 控制适配器怎么驱动它

- `click Edit`、`fill <field>` 和 `click Save` 应该更新详情。
- 恢复夹具来重置。

#### 稳定选择器

- 按钮 `Edit`、`New item`、`Save`，表单 `Item editor`，与标签关联的字段

#### 要演练的状态

- 默认、focus-visible、已修改、校验中、禁用、保存中、错误、成功

#### 前置条件和准备

- 可编辑的夹具、写入权限、可用的保存服务

#### 证据和交叉核对

- 从字段变更显示到更新后的详情。只读检查存下的条目值。

#### 易错点

- 不要注入表单状态。只读的详情字段不是编辑器。

### 设置

让用户更改个人偏好。

#### 用户怎么到那里

- 打开个人资料菜单，然后选择 `Settings`。

#### 控制适配器怎么驱动它

- `open_menu Profile`、`click Settings` 和 `toggle <preference>` 应该更新这个控件。
- 恢复起始偏好来重置。

#### 稳定选择器

- 按钮 `Profile`，菜单项 `Settings`，区域 `Settings`，按用途命名的偏好属性

#### 要演练的状态

- 关闭、打开、已选、focus-visible、禁用、加载中、错误

#### 前置条件和准备

- 已登录的测试账号、已知偏好、可用的偏好服务

#### 证据和交叉核对

- 显示菜单路径和最终控件状态。只读检查偏好值。

#### 易错点

- 操作系统设置是另一个界面。

## 完整性核对清单

- 每个可复现的面向用户的功能都有一节。
- 每一节都写明用户路径、适配器动作和重置。
- 选择器用角色、名称、ARIA、稳定的组件标记，或按用途命名的属性。
- 没有选择器使用生成的 class 或 DOM 位置。
- 相关的交互、加载、空、错误、已选和展开状态都覆盖到了。
- 认证、夹具、权限、flag 和服务都写明了。
- 截图、视频和底层交叉核对的要求都写明了。
- 列出了错误界面、死路和安全的环境转译。
- 实现细节仍留到运行时再发现。
