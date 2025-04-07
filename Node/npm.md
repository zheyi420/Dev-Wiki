NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，常见的使用场景有以下几种：

- 允许用户从NPM服务器下载别人编写的第三方包到本地使用。
- 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
- 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。

Node-NPM 版本对应关系 https://nodejs.org/en/about/previous-releases

- [npmjs.com](https://www.npmjs.com/) 
- [npm Docs](https://docs.npmjs.com/) 
- [npm 中文文档](https://www.npmjs.cn/) 
- [cnpm 在 npm 库中的概述](https://www.npmjs.com/package/cnpm) ( [淘宝 NPM 镜像及使用文档](https://npmmirror.com/) )
- [The semantic versioner for npm ( npm的语义版本器 )](https://docs.npmjs.com/cli/v6/using-npm/semver) 
    - GitHub相关 [Semantic Versioning 语义版本控制](https://semver.org/) 
    - 博客：[Semver(语义化版本号)扫盲](https://juejin.cn/post/6844903591690534926) 


# 配置

## 下载源

查看下载源
```powershell
PS D:\> npm config get registry
https://registry.npmjs.org/
```

修改下载源

- 设置npm镜像源为淘宝镜像
	- `npm config set registry https://registry.npm.taobao.org/` 旧的
	- `npm config set registry https://registry.npmmirror.com/` 新的


## 各配置路径

- 查看 npm 配置
	- `npm config ls` 或者 `npm config list` 查看简单配置项
	- `npm config ls -l` 查看所有配置项


- npm 配置文件 `.npmrc` 默认在用户目录 `C:\Users\用户\` 下。
	查询命令：`npm config get userconfig`
	```shell
	PS E:\project> npm config get userconfig
	C:\Users\PC\.npmrc
	```


- 获取 npm 包的全局安装路径
	`npm config get prefix`
	如 `C:\Users\user_name\AppData\Roaming\npm`

- 设置 npm 包安装位置为当前位置
	`npm config set prefix`


- 查询 npm 安装路径（使用 cmd 查询）
	```cmd
	C:\Users\user_name>where npm
	C:\Users\user_name\AppData\Roaming\npm\npm
	C:\Users\user_name\AppData\Roaming\npm\npm.cmd
	C:\Program Files\nodejs\npm
	C:\Program Files\nodejs\npm.cmd
	```



# Pkgs

- [rimraf](https://www.npmjs.com/package/rimraf) 
	快速删除项目中的 node_modules 文件夹，于项目根目录下运行：`rimraf .\node_modules\`

- [http-server](https://www.npmjs.com/package/http-server) 
    `http-server ./ -c-1` 目前目录下启动服务且禁用缓存。
    http-server 是一个简单的、零配置的命令行静态 HTTP 服务器。

- [typescript](https://www.npmjs.com/package/typescript) 

- [npm-windows-upgrade](https://www.npmjs.com/package/npm-windows-upgrade) 
    Upgrading npm on Windows.

- [npx](https://www.npmjs.com/package/npx) **This package has been deprecated**
		**This package is now part of the npm CLI.**
	npx https://docs.npmjs.com/cli/v8/commands/npx
	Run a command from a local or remote npm package



# Using

## npm list
- [Where does npm install packages?](https://stackoverflow.com/questions/5926672/where-does-npm-install-packages/5926706#5926706) 
    `npm list -g pkg_name`
    查找包的安装版本及位置

`npm list -g --depth=0`
输出一个树形结构，显示所有全局安装的包及其版本，但不显示依赖项。

`npm root -g` 可以直接获取全局包的安装路径。

## npm install
- [v8 npm-install](https://docs.npmjs.com/cli/v8/commands/npm-install) 

    - `npm install -save-dev pkg_name` 包将出现在`devDependencies`中。
	    - `-save-dev` 缩写 `-D` 
    - `npm i pkg_name@13.x -save-dev` 下载某大版本下最新的小版本到`devDependencies`下。
    - `npm install pkg_name@3.6.2 --save` 安装指定版本号的包到“dependencies”中：`"pkg_name": "^3.6.2”` 
    - `npm install cesium@latest --save` 安装指定 TAG 版本的包到“dependencies”中。
    - `npm i -g npm@latest` 全局更新本地 npm 版本。

## npm uninstall
- [v8 npm-uninstall](https://docs.npmjs.com/cli/v8/commands/npm-uninstall) 
    - `npm uninstall pkg_name` 删除项目内的依赖包
    - `npm uninstall -g pkg_name` 删除全局依赖包

## npm run
- [v8 npm-run-script](https://docs.npmjs.com/cli/v8/commands/npm-run-script) 

## npm update
- [v8 npm-update](https://docs.npmjs.com/cli/v8/commands/npm-update) 

- `npm update -g @vue/cli` 升级全局的 Vue CLI 包。
    > 注意：全局安装的软件包会被当作是在指定了 caret semver 范围的情况下安装的。因此，如果你需要更新到最新的，你可能需要运行 `npm install -g pkg_name@latest` 。

    > [Vue] 如需升级项目中的 Vue CLI 相关模块（以 `@vue/cli-plugin-` 或 `vue-cli-plugin-` 开头），请在项目目录下运行 `vue upgrade` 



## npm view

- `npm view pkg_name versions` 
	查看可供下载的包版本。

# Problems

## npm ERR! code ETIMEOUT


1. 将网络代理设置为全局
2. `npm config set proxy false`
3. `npm cache clean`
4. 再执行 `npm i`


## npm ERR! cb() never called!

1. 删掉文件 `package-lock.json` 文件夹 `node_module` 。
2. `npm cache clean -f` 清除 npm 缓存。
3. `npm i` 下载依赖包。


## npm 与 node 安装目录下的 npm 的区别与冲突。

npm 全局安装配置。

## `npm install` 安装依赖时参照 `package-lock.json`，npm 版本不对导致警告。

若本地 npm 版本低于原本安装生成 `package-lock.json` 的人使用的 npm，则警告：
> npm `WARN` read-shrinkwrap This version of npm is compatible with lockfileVersion@1, but package-lock.json was generated for lockfileVersion@2. I'll try to do my best with it!

若本地 npm 版本高于原本安装生成 `package-lock.json` 的人使用的 npm，则警告：    
> npm `WARN` old lockfile The package-lock.json file was created with an old version of npm, so supplemental metadata must be fetched from the registry.

会继续运行安装依赖，会直接覆盖 package-lock.json，按照当前的npm版本生成新的一份文件。
- 参考 [Is there any way to fix package-lock.json lockfileVersion so npm uses a specific format?](https://stackoverflow.com/questions/64813775/is-there-any-way-to-fix-package-lock-json-lockfileversion-so-npm-uses-a-specific) 

- 原因
	`package-lock.json` 文件中的属性 `lockfileVersion` 值不同。
	原作者使用 npm v7/v8 安装依赖时生成的 `package-lock.json` 文件中的 `lockfileVersion` 值为 2。
	当其他开发者使用 npm v6 去安装依赖时就会发生冲突。
> 参考 [v8 package-lock-json#locakfileversion](https://docs.npmjs.com/cli/v8/configuring-npm/package-lock-json#lockfileversion) 
> `package-lock.json` 没有提供版本：来自 npm v5 之前的 npm 版本的 "古老" shrinkwrap 文件。
> `1`：npm v5 和 v6 使用的 lockfile 版本。
> `2`：npm v7 使用的锁文件版本，它向后兼容 v1 的锁文件。
> `3`：npm v7 使用的锁文件版本，没有向后兼容的能力。

- 解决办法
	- 可以不解决：
		`npm v6 will work with version 2 lockfiles in spite of the warning, so you can safely ignore the warning message.`
		不解决的问题在于：
		使用 npm v6 的开发者处理 `"lockfileVersion": 2` 时，生成 `"lockfileVersion": 1` 的 lock 文件，npm v7 的协同开发者接受又会处理生成 `"lockfileVersion": 2` 的 lock 文件。导致不断产生新的差异。
	- 如果自身的 npm 版本旧，则更新本地全局包到最新 `npm i -g npm@latest` 或更新到指定版本 `npm install -g npm@x.x.x` 
	- 如果自身的 npm 版本新，则可以通过指定运行的引擎来保持一致 [v8 package-lock-json#lockfileversion](https://docs.npmjs.com/cli/v8/configuring-npm/package-lock-json#lockfileversion) 

## `package.json` 中版本号前的 `^` 表示什么？

```json
"dependencies": {
  "core-js": "^3.6.5",
  "ol": "^6.9.0",
  "vue": "^3.0.0"
},
```

Ref：
- https://docs.npmjs.com/cli/v6/configuring-npm/package-json#dependencies
- https://docs.npmjs.com/cli/v6/using-npm/semver#caret-ranges-123-025-004

`^version` "Compatible with version" 兼容的版本
- 兼容模块新发布的补丁版本：~16.2.0、16.2.x、16.2
- 兼容模块新发布的小版本、补丁版本：^16.2.0、16.x、16
- 兼容模块新发布的大版本、小版本、补丁版本：\*、x 

## 如何禁止每次`npm install`都自动生成`package-lock.json`文件？

答：
> 不应当禁止，`package-lock.json` 的作用在于锁定安装时的包的版本号，并且需要上传到 git，以保证其他人在`npm install` 时大家的依赖能保证一致。

若要禁止，采用下列方法：

- 在当前项目禁用
	（需要确保在 powershell 中使用 echo 输出格式为 utf-8）[设置 PowerShell echo 输出到文件的格式]
	也可直接在项目目录里新增 `.npmrc` 文件，加入 `package-lock=false` 
	```powershell
	PS D:\\development\\project\\test_proj> echo 'package-lock=false' >> .npmrc
	```

- 在（当前机器的当前用户的）所有项目禁用
	```powershell
	PS D:\> npm config set package-lock false
	
	PS D:\> npm config list
	; "builtin" config from C:\Users\user_name\AppData\Roaming\npm\node_modules\npm\npmrc
	
	prefix = "C:\\Users\\user_name\\AppData\\Roaming\\npm"
	
	; "user" config from C:\Users\user_name\.npmrc
	
	registry = "https://registry.npmjs.org/"
	
	; node bin location = C:\Program Files\nodejs\node.exe
	; node version = v16.16.0
	; npm local prefix = D:\
	; npm version = 8.15.1
	; cwd = D:\
	; HOME = C:\Users\user_name
	; Run `npm config ls -l` to show all defaults.
	
	PS D:\> npm config list --json
	{
	  "json": true,
	  "user-agent": "npm/6.14.15 node/v14.18.1 win32 x64",
	  "metrics-registry": "<https://registry.npmjs.org/>",
	  "scope": "",
	  "package-lock": false,
	  "prefix": "C:\\\\Users\\\\user_name\\\\AppData\\\\Roaming\\\\npm",
	...
	...
	...
	```

	取消在（当前机器的当前用户的）所有项目禁用
	```powershell
	PS D:\\development\\project\\test_proj> npm config delete package-lock
	```



## 依赖包安装在 `dependencies` 和 `devDependencies` 有什么区别？

如果只是项目引用，实质没区别。
> 对于项目而言，npm install 会自动下载 `dependencies` 和 `devDependencies` 下面的模块。

如果要发布为 npm 包，有实质区别。
> 在发布 npm 包的时候，本身 `dependencies` 下的模块会作为依赖，一起被下载； `devDependencies` 下面的模块不会自动下载。

- [包应该放在devDependencies还是dependencies](https://guxinyan.github.io/2017/11/02/%E5%8C%85%E5%BA%94%E8%AF%A5%E6%94%BE%E5%9C%A8devDependencies%E8%BF%98%E6%98%AFdependencies/) 
- [docs.npmjs - Specifics of npm's package.json handling](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#devdependencies) 


## node-sass 安装失败

- [node-sass - Node version support policy](https://github.com/sass/node-sass?tab=readme-ov-file#node-version-support-policy) 

参考 [为什么node-sass总是安装失败？](https://segmentfault.com/a/1190000020993365) 


## PowerShell 执行全局 npm 包 报错 .ps1 文件无法加载

![](Node/assets/Pasted%20image%2020240509192823.png)

1. 执行 `get-ExecutionPolicy`，显示 `Restricted`，表示状态是禁止的，如果是 `RemoteSigned`，那么就不用往下执行了
2. 以管理员启动 PowerShell
3. 执行：`set-ExecutionPolicy RemoteSigned`
4. 这时再执行 `get-ExecutionPolicy`，就显示 `RemoteSigned`

