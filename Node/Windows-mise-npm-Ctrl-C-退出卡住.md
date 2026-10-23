> 2026-10-23。PowerShell 7，mise 2026.9.5，默认 exe shim。在项目目录执行 `npm run serve` 后按 `Ctrl + C`，PowerShell、cmd、Node 抢着读键盘，终端已基本无法使用。临时处理是把 Windows shim 改成 file 模式：退出时仍要连续回答两次「终止批处理操作吗(Y/N)?」，但答完提示符就回来，终端可以接着用。
>
> 日常命令见 [mise](/Node/mise.md)。本机装机步骤见 [Windows-mise-Node-环境配置](/Node/Windows-mise-Node-环境配置.md)。

# 现象

项目以 `ek-web-vue2-97` 为例：`.nvmrc` 是 `20.10.0`，`npm run serve` 即 `vue-cli-service serve`，端口 84。PowerShell 里的 `npm` 来自 `%LOCALAPPDATA%\mise\shims\npm.exe`。

`Ctrl + C` 之后开发服务开始往屏幕打关闭日志，同时 cmd 要问「终止批处理操作吗(Y/N)?」。提示被刷掉，键盘和这几方抢在一起，终端已基本无法使用。

用 Node 安装目录里的程序直接跑同一条脚本，一次 `Ctrl + C` 就能回到提示符：

```powershell
& "$env:LOCALAPPDATA\mise\installs\node\20.10.0\node.exe" "$env:LOCALAPPDATA\mise\installs\node\20.10.0\node_modules\npm\bin\npm-cli.js" run serve
```

这条命令只在当次启动里使用 Node 20.10.0，不改其他项目。它说明卡住出在进入 `npm-cli.js` 之前的那几层，Node 20.10.0、npm 10.2.3 和 Vue CLI 4 本身都能退出。

# 原因

Windows 没有 SIGINT。`Ctrl + C` 发给同一控制台里的所有进程。默认的 exe shim 是一份 `mise-shim.exe`。从 mise 2026.2.7 起，这个进程收到 `Ctrl + C` 会自己先退出，底下的批处理还停着等输入。讨论见 [jdx/mise#10663](https://github.com/jdx/mise/discussions/10663)。

exe shim 实际执行的是：

```text
mise x -- npm run serve
→ %LOCALAPPDATA%\mise\installs\node\20.10.0\npm.cmd
```

`npm.cmd` 是批处理。它被打断时，cmd 固定提问「终止批处理操作吗(Y/N)?」，并继续读键盘。shim 已经退出，PowerShell 也回到了自己的输入，三方抢同一个控制台。

Node 20.10.0 的官方 Windows 包没有把 `npm.ps1` 放到安装根目录。`vcbuild.bat` 只复制 `npm`、`npm.cmd`、`npx`、`npx.cmd`。`npm.ps1` 在 `node_modules\npm\bin\` 里，那是 npm 10.2.3 自带的。把 ps1 装进安装根目录的改动是 [nodejs/node#52009](https://github.com/nodejs/node/pull/52009)（2024-03-27），晚于 20.10.0（2023-11-22）。它进过 20.13.0，又在 20.13.1 撤回。本机的 Node 20.20.1 根目录同样没有 `npm.ps1`；Node 22.23.3 的根目录有。用 mise 重装 20.10.0 拿到的仍是同一份官方包，根目录不会多出这个文件。

即便根目录有 `npm.ps1`，exe shim 仍按 cmd 的扩展名顺序选择 `npm.cmd`。本机 Node 22.23.3 已有根目录 `npm.ps1`，`MISE_DEBUG=1 npm --version` 打印的仍是 `npm.cmd`。

# 讨论里的处理，以及升级为什么不够

[jdx/mise#10663](https://github.com/jdx/mise/discussions/10663) 的现象和这次一致：exe shim 先退出，Yarn / npm 的批处理还在问要不要终止，键盘要连着敲才有反应。帖子里的绕过办法就是 `windows_shim_mode = "file"`。到 2026-09 这则讨论还没有合入「子进程退出前 shim 忽略 Ctrl+C」的修复。

[jdx/mise#13215](https://github.com/jdx/mise/discussions/13215) 说的是 `mise run` 里的任务，不是在 PowerShell 里直接打 `npm`。维护者说明：Windows 上的 `npm` 就是 `npm.cmd`，cmd 一定会问这句话。2026.9.10 的 [#13226](https://github.com/jdx/mise/releases/tag/v2026.9.10) 只让 `mise run` 在第一次 `Ctrl + C` 时继续等任务，第二次再拆进程树。2026.10.17 的 shim 仍是两种：exe 模式复制 `mise-shim.exe`，file 模式写成调用 `mise x -- npm` 的 `npm.cmd`。从 2026.9.5 升到 2026.10.17 不会让 `npm run serve` 绕过这层批处理。

`Terminate batch job (Y/N)?` 是 cmd 执行批处理时的老行为。fnm、nvm-windows 把某一版 Node 的安装目录放进 Path，中间没有这层 exe。安装根目录有 `npm.ps1` 时，PowerShell 走脚本，不出现这句提问。只有 `npm.cmd` 时提问会出现，但可以直接输入 `Y`。

# 临时处理

file 模式没有拿掉那两层批处理，退出时还是要回答两次。把它当作临时处理，是因为 exe 模式下终端已基本无法使用；改成 file 模式后，两次 `Y` 都能打进去，提示符回来，这个窗口可以接着用。

本机继续只用 shim，不写 PowerShell 配置文件。把用户配置 `%USERPROFILE%\.config\mise\config.toml` 设为：

```toml
[settings]
windows_shim_mode = "file"
```

只改这个文件不会换掉已经生成的 shim。当时 `mise settings get windows_shim_mode` 已经是 `file`，但 `%LOCALAPPDATA%\mise\shims\.mode` 仍是 `exe`，`npm.exe` 仍是 2026-09-10 的文件。需要再执行：

```powershell
mise reshim
```

新开一个 PowerShell 后确认：

```powershell
Get-Content "$env:LOCALAPPDATA\mise\shims\.mode"
Get-Command npm | Select-Object Source
```

`.mode` 应为 `file`，`npm` 的来源应为 `%LOCALAPPDATA%\mise\shims\npm.cmd`。

之后在项目目录照常 `npm run serve`。`Ctrl + C` 时连续输入两次 `Y` 再回车，提示符回来：

```text
终止批处理操作吗(Y/N)? Y
终止批处理操作吗(Y/N)? Y
```

# 为何是两次

file 模式的 shim 自己就是批处理。`%LOCALAPPDATA%\mise\shims\npm.cmd` 执行 `mise x -- npm`，并一直等到它结束。`mise x` 再启动安装目录里的 `%LOCALAPPDATA%\mise\installs\node\<版本>\npm.cmd`，后者执行 `node.exe` 加 `npm-cli.js`，也一直等到这个 Node 进程结束。`Ctrl + C` 打到这两层还停着的 cmd，所以各问一次。

`npm run` 再往里还有项目的 `node_modules\.bin\vue-cli-service.cmd`。它最后一行是 npm 的 cmd shim 写法：`goto #_undefined_# 2>NUL ||` 把 `node` 放到批处理外面，因此没有第三次提问。

# 相关笔记

- [mise](/Node/mise.md)
- [Windows-mise-Node-环境配置](/Node/Windows-mise-Node-环境配置.md)
- [npm](/Node/npm.md)
