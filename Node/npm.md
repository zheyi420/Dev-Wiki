

### 下载源

#### 查看下载源

```sh
PS C:\Users\21632> npm config get registry
https://registry.npmjs.org/
```


#### 修改下载源

- 设置npm镜像源为淘宝镜像
	`npm config set registry https://registry.npm.taobao.org/`


### 安装位置

- 获取 npm 包的全局安装路径
	`npm config get prefix`
	如 `C:\Users\用户名\AppData\Roaming\npm`

- 设置 npm 包安装位置
	`npm config set prefix`

- 查询 npm 安装路径
	```cmd
	C:\Users\21632>where npm
	C:\Users\21632\AppData\Roaming\npm\npm
	C:\Users\21632\AppData\Roaming\npm\npm.cmd
	C:\Program Files\nodejs\npm
	C:\Program Files\nodejs\npm.cmd
	```
