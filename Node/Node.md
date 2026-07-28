# Reference

## Sites
- https://nodejs.org/
- https://github.com/nodejs/node
- https://nodejs.cn/


## API
- https://nodejs.org/docs/latest-v16.x/api/
- https://nodejs.dev/en/api/
- https://nodejs.cn/api/


## Tutorials
- [CNODE Node.js 入门](https://cnodejs.org/getstart) 
- [菜鸟教程 Node.js 教程](https://www.runoob.com/nodejs/nodejs-install-setup.html) 


# Others


查询 Nodejs 安装路径 （cmd 下运行）
```cmd
C:\Users\user_name>where node
C:\Program Files\nodejs\node.exe
```


### 关于 NodeJS 版本控制
- [NVM](./NVM.md) 
- 使用 [n](https://github.com/tj/n)，[nvm](https://github.com/nvm-sh/nvm) 或 [nvm-windows](https://github.com/coreybutler/nvm-windows) 在同一台电脑中管理多个 Node 版本。
- win10 Node.js 版本更新
	> 解决方法：`cmd` 命令窗口使用 `where node` 查看之前的 node 版本安装的路径，在官网下载 nodejs Windows Installer (.msi) 并安装覆盖即可。

### 最佳实践

使用 nvm-windows，参考 [Installation & Upgrades](https://github.com/coreybutler/nvm-windows#installation--upgrades) 
> 为了简单起见，我们建议在Windows上使用NVM之前卸载所有现有版本的Node.js。删除任何现有的Node.js安装目录(例如，`%ProgramFiles%\nodejs`)。


# Problems

## MaxListenersExceededWarning

```sh
(node:3612) MaxListenersExceededWarning: Possible EventEmitter memory leak detected.
11 upgrade listeners added to [Server].
Use emitter.setMaxListeners() to increase limit
```

