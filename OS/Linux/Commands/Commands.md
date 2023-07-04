# Reference

- [菜鸟教程 Linux 命令大全](https://www.runoob.com/linux/linux-command-manual.html)

# Category

- [sudo & su](./sudo&su.md)

# User management

`cat /etc/passwd`
> 查看用户

`cat /etc/group`
> 查看用户组

`w`
> 查看当前活跃的用户列表

`cat /etc/passwd|grep -v nologin|grep -v halt|grep -v shutdown|awk -F":" '{ print $1"|"$3"|"$4 }'|more`
> 对于 `cat /etc/passwd` 的替换

# System management

## `top`

`top -b -n 1 | grep nginx | awk '{print "VIRT:"$5,"RES:"$6,"cpu:"$9"%","mem:"$10"%"}'`
> `top -b -n 1` 以批处理模式输出仅更新一次的进程状态。
> about option `-b` :
> - [What does "batch mode" mean for the top command?](https://unix.stackexchange.com/questions/138484/what-does-batch-mode-mean-for-the-top-command)


## `free`
> 显示内存状态。

## `df`
> 



## `ps`
`process status`

### Common used

`ps -aux`

### 监控某段时间内运行的所有进程


# File management

## `chown`

使用示例
- `chown user:usergroup filename.txt`

## 空文件创建方法

