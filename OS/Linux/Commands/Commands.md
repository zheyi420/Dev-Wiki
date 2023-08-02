# Reference

- [菜鸟教程 Linux 命令大全](https://www.runoob.com/linux/linux-command-manual.html)
- [GNU Manuals Online](https://www.gnu.org/manual/)

# Category

- [sudo & su](./sudo&su.md)

# User management

- `cat /etc/passwd`
  > 查看用户

- `cat /etc/group`
  > 查看用户组

- `w`
  > 查看当前活跃的用户列表

- `cat /etc/passwd|grep -v nologin|grep -v halt|grep -v shutdown|awk -F":" '{ print $1"|"$3"|"$4 }'|more`
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

## `chmod`
> change mode


## `chown`

- `chown user:usergroup file`
- `chown -R uid:gid .` 修改所在目录下所有文件及子目录内文件。

## 查看文件编码字符集



## 空文件创建方法

- `echo '' > file` 文件大小为 1 Byte，含有一个 `LF` 换行符
- `touch file` 创建空文件
- `: > file` 创建空文件
- `> file` 创建空文件，bash 下可用，tcsh 下不能使用。
- `& > file` 创建空文件，bash 下可用，tcsh 下不能使用。
- `cat /dev/null > file`
- `mktemp`


## 清空不断增长的日志文件

> 背景：
> 现有一个不断写入的 `nginx_access.log` 日志文件，大小为 509GB。
> 执行 `echo '' > nginx_access.log` 后，仅减小几 G，后又停止，继续写入。





# Disk management

## `du`
> ➡ disk usage
> 用于显示目录或文件的大小。
> 显示指定的目录或文件所占用的磁盘空间。

- `du -s * | sort -nr`
  > 显示当前目录下各子目录及文件的大小，并从大到小排序。

## `df`
> ➡ disk free
> 显示每个文件所在的文件系统的信息，
> 默认为所有文件系统。

## `mkdir`
> ➡ make directory


- `mkdir -p ./parentDir1/parentDir2/targetDir/`
  > 如果存在，则没有错误，根据需要创建父目录。


# Document editing

## `sed`
> sed (stream editor) is a non-interactive command-line text editor.
> https://www.gnu.org/software/sed/manual/sed.html

- `sed -i '2,5000d' filename.csv`
  > 删除第 2 行至第 5000 行。（就地编辑源文件）

- `sed -i '/60169077/d' file.csv`
  > 删除文件中匹配的数据行

- `sed -n '100,200p' filename`
  > 查看文件中间一段，你可以使用sed命令，如上，这样你就可以只查看文件的第100行到第200行。  


# Backup compression

## `tar`
> GNU  `tar` 将许多文件一起保存到单个磁带或磁盘归档中，并且可以从存档中恢复单个文件。

### 备份 压缩

tar 默认只是打包不压缩
- `tar -cvf test.tar ./test` 得到 test.tar 备份文件

参数 -z 打包后进行 gzip 压缩
- `tar -zcvf test.tar.gz ./test` 得到 test.tar.gz 备份文件

参数 -j 打包后进行 bzip2 压缩
- `tar -jcvf test.tar.bz2 ./test` 得到 test.tar.bz2 备份文件

### 提取文件

- `tar -xf archive.tar` 从 archive.tar 中提取所有文件。


### 解压缩

- `tar -zxvf file_name.tar.gz`

解压缩到指定目录下
- `tar -zxvf file_name.tar.gz -C /dir/`

### 列出归档内容

在不解压的情况下查看压缩包内的内容详情
- `tar -tvf file_name.tar.gz`

详细列出 archive.tar 中的所有文件。
- `tar -tvf archive.tar`


Usage
```sh
-c, --create               create a new archive

压缩选项:
-a, --auto-compress        use archive suffix to determine the compression
                             program
-j, --bzip2                filter the archive through bzip2
-z, --gzip, --gunzip, --ungzip   filter the archive through gzip
    --zstd                 filter the archive through zstd
-Z, --compress, --uncompress   filter the archive through compress


-v, --verbose              verbosely list files processed
    --warning=KEYWORD      warning control
-x, --extract, --get       extract files from an archive
-t, --list                 list the contents of an archive
    --test-label           test the archive volume label and exit
-f, --file=ARCHIVE         use archive file or device ARCHIVE
    --force-local          archive file is local even if it has a colon
-C, --directory=DIR        change to directory DIR
```

