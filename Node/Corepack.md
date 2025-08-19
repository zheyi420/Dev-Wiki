> 零运行时依赖的包，充当Node项目与其包管理器之间的桥梁
> 
> 从 v16.13 开始，Node.js 附带 [Corepack](https://nodejs.org/api/corepack.html) 用于管理包管理器。

# 机制

**自动版本管理**：当在项目根目录执行 `corepack install` 命令时，Corepack 会：

1. **读取 `package.json` 里的 `packageManager` 字段**
   例如：

   ```json
   {
     "packageManager": "pnpm@9.15.0"
   }
   ```
   Corepack 会看到项目需要 **pnpm@9.15.0**。

2. **检查本地是否已经有这个版本的包管理器**
	- Corepack 在自己的缓存目录里找
		- 通常在 `~/.cache/corepack` 或 `%LocalAppData%\Corepack` 
		- 如果是随 Node 下载的 corepack，在目录 `LOCALAPPDATA\node\corepack`
			```powershell
			PS C:\AIRace> dir $env:LOCALAPPDATA\node\corepack


			    目录: C:\Users\21632\AppData\Local\node\corepack


			Mode                 LastWriteTime         Length Name
			----                 -------------         ------ ----
			d-----         2025/8/18     14:21                v1
			-a----         2025/8/18     10:43            159 lastKnownGood.json
			```

	- 如果没有，就从 npm registry 拉取并缓存。

3. **确保该版本可用**
   * 相当于执行了 `corepack prepare pnpm@9.15.0 --activate`（但只对当前项目生效，不会全局替换默认版本）。
   * Corepack 会生成一个 shim，让 `pnpm` 命令指向正确的版本。

4. **不会直接安装项目依赖**
   * `corepack install` 只是“确保包管理器就绪”。
   * 真正装依赖，还需要你再运行：`pnpm install` 
	（此时用的就是 `package.json` 里指定的 pnpm 版本）。


## 🔑 总结

* `corepack install` = **确保项目所需的包管理器版本可用**
* 不等于 `pnpm install`，它不会修改 `node_modules`
* 核心作用：**让团队成员/CI 环境自动获取并使用正确版本的包管理器**，避免版本不一致

👉 换句话说，**`corepack install` 是为项目准备包管理器，而不是为项目安装依赖**。


## 不显式执行 `corepack install` 的机制

