# Monorepo（单体仓库）结构



# Using

## `pnpm exec`

https://pnpm.io/zh/cli/exec

- `pnpm exec <command> [args...]` 可以直接执行项目依赖里的命令。


用 `pnpm` 直接执行一个命令，比如 `vite build --mode production`，但这个命令没有写在 `package.json` 的 `scripts` 里，可以用 `pnpm exec` 来执行。`pnpm exec` 会在项目的 `node_modules/.bin` 路径里查找命令，然后执行它

这里 `pnpm exec` 会帮你调用本地安装的 `vite`，并传递后面的参数 `build --mode production`，无需在 `package.json` 里定义脚本。