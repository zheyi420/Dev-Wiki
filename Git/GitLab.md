
# Case

## 密钥配置 / 无凭证


项目拉取报错：
```shell
$ git clone http://xxx.git
Cloning into 'xxx-xxx'...
remote: The project you were looking for could not be found or you don't have permission to view it.
fatal: repository 'http://xxx.git' not found
```

原因：
本地未配置凭证

解决：
windows 系统添加凭据，或者直接命令行执行，如下⤵
```shell
$ git clone http://用户名@xxx.git
```

