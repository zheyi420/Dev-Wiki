
- [What is Bash?](https://www.gnu.org/software/bash/manual/html_node/What-is-Bash_003f.html) 
- [What is a shell?](https://www.gnu.org/software/bash/manual/html_node/What-is-a-shell_003f.html) 
- [POSIX Shell Command Language — `sh`](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/sh.html)

# `sh -c`

`-c` 是 **`sh`（shell）本身的参数**，不是 `docker exec` 或其它外层命令的参数。

## 含义

`-c` 告诉 shell：**不要进入交互模式，也不要读取脚本文件，而是把紧跟在后面的字符串当作命令来解析执行**。

```bash
sh -c '这里的整段字符串会被当作一条（或多条）命令来解析执行'
```

效果上等价于手动进入终端执行一条命令，执行完毕后 shell 退出。

## 三种常见用法

| 用法 | 行为 |
|---|---|
| `sh` | 进入**交互式**终端，逐行输入命令 |
| `sh script.sh` | 把 `script.sh` 当作**脚本文件**读取并执行 |
| `sh -c "command"` | 直接把字符串当命令执行，**不需要文件，也不进交互模式** |

## 在 `docker exec` 中的典型用法

在 [`/Docker/Docker.md`](/Docker/Docker.md) 的 `docker exec` 场景中，通常无法给容器一个交互终端（除非加 `-it`），也不想专门写脚本文件传进去，因此用 `sh -c` 一次性把命令交给容器内 shell 执行。

更关键的一点是：**环境变量必须在容器内展开**。例如 GeoServer 官方镜像中 Tomcat 的 `$CATALINA_HOME` 只在容器内有效；若不用 `sh -c`，该变量会在宿主机侧被解析（往往为空），导致路径错误。

```bash
# 变量在宿主机展开（错误）
docker exec mycontainer grep "$CATALINA_HOME/conf/server.xml"

# 变量在容器内展开（正确）
docker exec mycontainer sh -c 'grep "$CATALINA_HOME/conf/server.xml"'
```
