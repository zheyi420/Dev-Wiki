# Reference

- [菜鸟教程 Linux 命令大全](https://www.runoob.com/linux/linux-command-manual.html)
- [GNU Manuals Online](https://www.gnu.org/manual/) 
- https://tldp.org/
- https://www.kernel.org/

# Case

## jar 包运行，挂起，进程查看，杀掉

```bash
ps aux | grep XXX.jar
kill -9 PID号

# -- 挂起并写入日志
nohup <java编译器地址> -jar XXX.jar --spring.profiles.active=prd > log.log &
```


# Category

### `echo`

- 在 csv 文件首行增加一行
	```shell
	echo 'id,name,geom' > temp.csv
	cat targetFile.csv >> temp.csv
	mv temp.csv targetFile.csv
	```

### `ssh`
- [Linux 远程登录](https://www.runoob.com/linux/linux-remote-login.html) 

```bash
# ssh: Secure Shell
# Linux 系统中是通过 ssh 服务实现的远程登录功能，默认 ssh 服务端口号为 22。
ssh -p 22 服务器用户名@xxx.xxx.xxx.xxx # -p 后面是端口
```

> `-p` 指定的是**远程主机 SSH 服务的端口**；远程 SSH 服务默认 `22`，未修改时可省略。`scp` 同样基于 SSH，但其端口参数是**大写 `-P`**，见下文。

补充说明：

- SSH 既是一种**安全协议**，也是一组程序：客户端程序为 `ssh`，服务端守护进程为 `sshd`。
- `ssh` 用于**主动连接别人**（出站），`sshd` 用于**接受别人连接**（入站）。只装 `ssh` 时，本机能连其他主机，但其他主机无法 SSH 到本机。
- Linux 通常默认自带 `ssh` 客户端，但 `sshd` 服务端不一定默认安装/启用（如 Ubuntu Desktop 需手动安装 `openssh-server`）。
- 一台主机只需**一个 `sshd` 进程**即可同时监听多个端口，在 `/etc/ssh/sshd_config` 中写多个 `Port` 后重启服务即可：
  ```bash
  Port 22
  Port 2222
  ```

方向对照：

| 方向 | 能否 SSH | 说明 |
|---|---|---|
| 本机 → 其他主机 | ✅ 可以 | 用 `ssh user@remote` 主动连接远程的 `sshd` |
| 其他主机 → 本机 | ❌ 不可以 | 本机没有监听端口的服务，连接会被拒绝或超时 |



## User management

- `cat /etc/passwd`
  > 查看用户

- `cat /etc/group`
  > 查看用户组

- `w`
  > 查看当前活跃的用户列表

- `cat /etc/passwd|grep -v nologin|grep -v halt|grep -v shutdown|awk -F":" '{ print $1"|"$3"|"$4 }'|more`
  > 对于 `cat /etc/passwd` 的替换

### sudo & su

- [Exploring the differences between sudo and su commands in Linux](https://www.redhat.com/sysadmin/difference-between-sudo-su)
- [introduction to Sudo](https://www.sudo.ws/about/intro)



## System management

### `top`

`top -b -n 1 | grep nginx | awk '{print "VIRT:"$5,"RES:"$6,"cpu:"$9"%","mem:"$10"%"}'`
> `top -b -n 1` 以批处理模式输出仅更新一次的进程状态。
> about option `-b` :
> - [What does "batch mode" mean for the top command?](https://unix.stackexchange.com/questions/138484/what-does-batch-mode-mean-for-the-top-command)

`top -c`
> `-c` 显示完整的命令行而不截断。

### `free`
> 显示内存状态。

### `ps`
> `process status`

`ps -aux`

#### 监控某段时间内运行的所有进程

### `nohup`

> no hang up：忽略挂断信号（`SIGHUP`），让命令在终端关闭或 SSH 断开后继续运行。

普通前台/后台进程会绑在当前终端会话上。关掉终端或退出 SSH 时，内核向该会话里的进程发 `SIGHUP`，默认行为是**退出**。`nohup` 做两件事：

1. 让目标命令**忽略 `SIGHUP`**
2. 若标准输出仍连着终端，则把输出重定向到当前目录的 `nohup.out`（避免写终端失败）

```bash
# 基本用法：忽略挂断 + 后台运行
nohup command &

# 自行指定日志，避免落到 nohup.out
nohup command > app.log 2>&1 &
```

`2>&1` 表示把标准错误也并进标准输出，错误信息同样写入日志。末尾 `&` 仍表示后台运行，见下文 `du` 一节对 `&` 的说明。

**和单独加 `&` 的区别：**

| 写法 | 关掉终端 / 断开 SSH 后 |
|---|---|
| `command &` | 进程通常收到 `SIGHUP` 后退出 |
| `nohup command &` | 忽略 `SIGHUP`，进程继续跑 |

`nohup` 不负责「放到后台」；后台靠 `&`。两者常一起用：`nohup` 保活，`&` 不占终端。

查看与结束：

```bash
ps aux | grep command
kill PID
```

> `nohup` 只管「别因挂断而死」。若还要断线后随时回来看交互式输出，用 `tmux` / `screen`；长期服务更适合 `systemd` 等进程管理。

### `id`
> 打印每个指定用户的用户和组信息，
> 或(当USER省略时)为当前用户。



## File management


### `file`

- `file -bi filename.csv` 查看文件 MIME 类型及 MIME 编码。



### `cp`

- `cp -ri ./ /dir_name/` 复制目录内所有文件到指定目录。


### `scp`

> Secure Copy，基于 SSH 在本地与远程主机之间安全复制文件。

常用示例：

```bash
# 1. 上传本地文件到远程主机
scp /path/to/local/file.txt user@remote_host:/path/to/remote/

# 2. 从远程主机下载文件到本地
scp user@remote_host:/path/to/remote/file.txt /path/to/local/
```

其他常见用法：

```bash
# 递归复制整个目录
scp -r /path/to/local/dir user@remote_host:/path/to/remote/

# 指定端口（注意 scp 使用大写 -P）
scp -P 2222 /path/to/file.txt user@remote_host:/path/to/remote/
```

> 说明：`scp -P <port>` 指定的是**远程主机 SSH 服务的端口**，因为 `scp` 底层走 SSH。只有当远程 SSH 服务改成非默认端口（如 `2222`）时才需要显式指定。注意 `ssh` 用**小写 `-p`**，`scp` 用**大写 `-P`**。


### `cat`
> Concatenate FILE(s) to standard output.

- https://www.gnu.org/software/coreutils/cat

- `cat a.csv >> b.csv` 将 a.csv 的内容追加到 b.csv


#### 合并文件

使用 `cat` 将多个 `.tar.gz` 文件合并到单个 `.tar.gz` 文件。
- `cat a.tar.gz* > data.tar.gz`


### `rm`
> remove file or directory.

- `rm file.log`
- `rm -rf` 删除目录及目录下文件。

### `chmod`
> change mode

- `chmod 777 file` 修改文件权限为 `rwxrwxrwx`


### `chown`

- `chown user:usergroup file` 更改文件的拥有者及用户组
- `chown -R uid:gid .` 修改所在目录下所有文件及子目录内文件。


### `ln`
> link files

- [关于硬链接与软连接占用磁盘空间问题的分析研究](https://blog.51cto.com/jk6627/1949090) 


### Case

#### 查看文件编码字符集



#### 空文件创建方法

- `echo '' > file` 文件大小为 1 Byte，含有一个 `LF` 换行符
- `touch file` 创建空文件
- `: > file` 创建空文件
- `> file` 创建空文件，bash 下可用，tcsh 下不能使用。
- `& > file` 创建空文件，bash 下可用，tcsh 下不能使用。
- `cat /dev/null > file`
- `mktemp`


#### 清空不断增长的日志文件

> 背景：
> 现有一个不断写入的 `nginx_access.log` 日志文件，大小为 509GB。
> 执行 `echo '' > nginx_access.log` 后，仅减小几 G，后又停止，继续写入。


#### 查找文件/目录

##### `find`

`find [路径] [匹配条件] [动作]`
- `find / -name file.txt`
- `find / -type d -name dirName`
	按文件类型查找，可以是 `f`（普通文件）、`d`（目录）、`l`（符号链接）等。



## Disk management

### `ls`
> list directory contents

- [Linux文件权限属性后面的点的含义（ls -l）](https://blog.csdn.net/xinlongabc/article/details/46801641) 


- 按文件大小、时间等排序
	- `ls -S` 或者 `ls --sort=size` 按文件大小排序，最大的最先。
	- `ls -t` 或者 `ls --sort=time` 按文件时间排序，最新的最先。


### `du`
> ➡ disk usage
> 递归显示（磁盘）文件使用情况。默认为当前工作目录，除非另有说明。


- `du -s * | sort -nr`
  > 显示当前目录下各子目录及文件的大小，并从大到小排序。

- 同时显示总大小 + 各子项大小，并按大小排序
	- `du -h --max-depth=1 /usr/local/geoserver/data_dir/gwc/ws_test_mv_order_grid/ | sort -rh`
	- `du -h --max-depth=1 /usr/local/geoserver/data_dir/gwc/ws_test_mv_order_grid/ | sort -rh > /tmp/du_result.txt &`

**`&` 的含义：后台运行**

在 Linux/Unix 中，命令末尾加 `&` 表示将该命令**放到后台执行**，终端会立即返回，你可以继续输入其他命令，不会被阻塞。

执行后终端会输出类似：
```
[1] 12345
```
- `[1]` 是后台任务编号
- `12345` 是该进程的 PID

---

**对比一下：**

| 写法 | 效果 |
|---|---|
| `du ... > /tmp/du_result.txt` | 前台运行，终端**阻塞等待**，命令结束才能继续操作 |
| `du ... > /tmp/du_result.txt &` | 后台运行，终端**立即返回**，可继续做其他事 |

---

**配合使用的常用命令：**

```bash
# 查看后台任务列表
jobs

# 查看任务是否还在跑（通过PID）
ps aux | grep du

# 结果出来后查看
cat /tmp/du_result.txt
```

所以这条命令的完整含义是：**在后台执行 du 统计，把结果写入文件，终端不阻塞**，是专门针对"执行很久没返回"问题的解决方案。

### `df`
> ➡ disk free
> 以表格形式显示文件系统的使用情况。
> 显示每个文件所在的文件系统的信息，
> 默认为所有文件系统。

常用命令
- `df -h` 将大小以易读格式打印。
- `df -h /dir/dir1/dir2/` 对目录查询所属文件系统、磁盘用量

### `mkdir`
> ➡ make directory


- `mkdir -p ./parentDir1/parentDir2/targetDir/`
  > 如果存在，则没有错误，根据需要创建父目录。


## Document editing

### `grep`

- 输出显示 `匹配到二进制文件（标准输入）` 时，添加参数如下
	- `grep -a`
	- `grep --binary-files=text`
- 搜索目录下所有符合正则匹配的 csv 文件内是否存在某个字符串。
	- `grep '309383_5,' *road*.csv`
- 在匹配行之后显示指定数量的行
	- `docker inspect <容器ID或名称> | grep Mounts -A 10`
	> `-A 10` 表示在找到包含 "Mounts" 的行后，还会显示该行之后的10行内容。

### `sed`
> sed (stream editor) is a non-interactive command-line text editor.
> https://www.gnu.org/software/sed/manual/sed.html

- `sed -i '2,5000d' filename.csv`
  > 删除第 2 行至第 5000 行。（就地编辑源文件）

- `sed -i '/60169077/d' file.csv`
  > 删除文件中匹配的数据行

- `sed -n '100,200p' filename`
  > 查看文件中间一段，你可以使用sed命令，如上，这样你就可以只查看文件的第100行到第200行。  


### `tail`

- `tail -f file.log` 跟踪文件新增情况，`-f` 随着文件的增长，输出附加的数据。
- `tail -n 100 文件路径` 查看文件最后 xxx 行内容

## Backup compression

### `unzip`

常用命令
- `unzip -d <DIR> dist.zip` 把文件解压到指定目录。
- `unzip -l dist.zip` 查看 zip 压缩包内包含哪些文件，不执行解压。
- `unzip -o dist.zip -d <DIR>` 解压到指定目录，若已有相同文件存在，覆盖且不提示。
	- `-o`: overwrite files WITHOUT prompting

### `zip`

- `zip /dir_a/file.zip /dir_b/file1.csv /dir_b/file2.csv` 压缩文件
- `zip -m file.zip ./file2.csv` 向压缩文件file.zip中添加file2.csv文件，该命令会删除源文件，可以添加后再解压缩 :-|


### `tar`
> GNU  `tar` 将许多文件一起保存到单个磁带或磁盘归档中，并且可以从存档中恢复单个文件。

- manual https://www.gnu.org/software/tar/manual/


#### 备份 压缩

tar 默认只是打包不压缩
- `tar -cvf test.tar ./test` 得到 test.tar 备份文件
- `tar -cf archive.tar foo bar` 从文件 foo 和 bar 创建 archive.tar。


参数 `-z` 打包后进行 gzip 压缩
- `tar -zcvf test.tar.gz ./test` 得到 test.tar.gz 备份文件

参数 `-j` 打包后进行 bzip2 压缩
- `tar -jcvf test.tar.bz2 ./test` 得到 test.tar.bz2 备份文件

打包压缩时，排除某些文件和文件夹
- `tar -zcvf /dir/test.tar.gz test --exclude=conf.py --exclude=.git --exclude=config/*.json`
  - 不打包 `conf.py` 文件
  - 不打包 `.git` 文件夹
  - 不打包 `config` 文件夹下的所有 `json` 文件 ➡ 切记不要加上顶级目录，比如 `--exclude=test/conf.py` 这样是错误的。
  - 每个不打包的文件、文件夹、文件类型，都要用一个 `--exclude`。


#### 提取文件

- `tar -xf archive.tar` 从 archive.tar 中提取所有文件。


#### 解压缩

- `tar -zxvf file_name.tar.gz`

解压缩到指定目录下
- `tar -zxvf file_name.tar.gz -C /dir/`

#### 列出归档内容

在不解压的情况下查看压缩包内的内容详情
- `tar -ztvf file_name.tar.gz`

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

