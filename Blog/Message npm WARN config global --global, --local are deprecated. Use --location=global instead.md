### Environment
- OS: Windows 10
- Node.js: 16.16.0 (includes npm 8.11.0 in its installation directory)
	>installation dir: `C:\Program Files\nodejs\`
- npm: 8.15.1
	>installation dir: `C:\Users\<YourUserName>\AppData\Roaming\npm\`

### Reason
这个告警信息出现是 npm 的一个 BUG。

### Solution
我的解决方法与下列参考文章的不同。
1. 修改系统环境变量：将 npm 全局包目录置于 node 安装目录前。
如图：
![](Blog/assets/1681636-20220802190127374-252735311.png)
![](Blog/assets/1681636-20220802190250128-2132853003.png)

2. 重启命令行窗口后执行`npm --version`恢复正常。

### Other Solution
更多信息可以参考：
- [stackoverflow questions](https://stackoverflow.com/questions/72401421/message-npm-warn-config-global-global-local-are-deprecated-use-loc)
	可以主要参考Lars的回答
	>You have to use npm-windows-upgrade to update the wrapper script npm.cmd at the right location. [npmjs.com/package/npm-windows-upgrade](https://www.npmjs.com/package/npm-windows-upgrade "npmjs.com/package/npm-windows-upgrade")
- [GitHub npm\cli issue [BUG] npm.cmd uses deprecated switch -g #4980](https://github.com/npm/cli/issues/4980)