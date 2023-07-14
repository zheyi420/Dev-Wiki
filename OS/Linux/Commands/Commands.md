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

## `id`
> 打印每个指定用户的用户和组信息，
> 或(当USER省略时)为当前用户。



# File management

## `rm`
> remove file or directory.


## `chown`

使用示例
- `chown user:usergroup filename.txt`

## 空文件创建方法

# Disk management

## `du`
> ➡ disk usage
> 用于显示目录或文件的大小。
> 显示指定的目录或文件所占用的磁盘空间。

`du -s * | sort -nr`
> 显示当前目录下各子目录及文件的大小，并从大到小排序。

## `df`
> ➡ disk free
> 显示每个文件所在的文件系统的信息，
> 默认为所有文件系统。

## `mkdir`
> ➡ make directory


`mkdir -p ./parentDir1/parentDir2/targetDir/`
> 如果存在，则没有错误，根据需要创建父目录。