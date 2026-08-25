
# Reference

Docker.com
- https://www.docker.com/
	- https://docs.docker.com/
	- [docs.docker.com - Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/) 
- [hub.docker.com - Docker Hub](https://hub.docker.com/) 提供了庞大的镜像集合供使用。
- [www.digitalocean.com - How To Install and Use Docker on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04) 

Tutorial
- [yeasy.gitbook.io - Docker - 从入门到实践](https://yeasy.gitbook.io/docker_practice/)
- [菜鸟 - Docker 教程](https://www.runoob.com/docker/docker-tutorial.html)
- [阮一峰 - Docker 入门教程](https://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)


---
# 常见需求

## 查看文件/目录-Docker挂载情况

1. `docker ps -a` 获取容器ID或名称
2. `docker inspect <容器ID或名称>` 查看容器的详细信息，包括挂载的目录
3. `docker inspect <容器ID或名称> | grep Mounts -A 10` 查找挂载信息：在输出中，查找 "Mounts" 部分，这里会列出所有挂载的目录和文件
	> `Source` 表示宿主机上的路径
	> `Destination` 表示容器内的路径

# Commands
## `docker cp`

- 复制文件到Docker容器
	`docker cp <本地文件路径> <容器ID或名称>:<容器内目标路径>`
	如`docker cp /path/to/local/file.txt my_container:/path/in/container/`

- 将Docker内文件复制到宿主机中
	`docker cp <容器ID>:<容器内文件路径> <宿主机目标路径>`
## `docker version`


## `docker exec`
> Execute a command in a running container

> Usage: `docker exec [OPTIONS] CONTAINER COMMAND [ARG...]`


- 在正在运行的容器中执行命令，在容器上执行交互式 shell。
	- `docker exec -it mycontainer /bin/bash`
	- `/bin/bash` 是要在容器内执行的命令（即 `COMMAND` 参数），这里指定启动一个 Bash shell。Bash（Bourne Again Shell）是 Linux 中最常用的 shell，支持命令补全、历史记录、脚本语法等丰富功能。
	- 并非所有容器镜像都包含 Bash。许多精简镜像（如基于 Alpine Linux 的镜像）为了减小体积不会安装 Bash，此时执行 `/bin/bash` 会报错：
		- `OCI runtime exec failed: exec failed: unable to start container process: exec: "/bin/bash": stat /bin/bash: no such file or directory`
	- 遇到这种情况，可改用更轻量的 `sh`（几乎所有 Linux 镜像都包含）：
		- `docker exec -it mycontainer /bin/sh`
	- 若不确定容器中有哪些 shell 可用，可以通过以下命令查看：
		- `docker exec mycontainer cat /etc/shells`
		- 或尝试 `docker exec mycontainer which bash sh ash zsh`

- 退出交互式 shell
	- 输入 `exit` 命令或按 `Ctrl+D`：退出 shell 并断开与容器的连接（容器本身继续运行）。
	- 按 `Ctrl+P` 然后 `Ctrl+Q`：从交互式 shell 中分离（detach），保持 shell 进程在容器内继续运行，之后可通过 `docker attach mycontainer` 重新连接到该容器的主进程（PID 1）。
		- 注意：`docker attach` 连接的是容器的主进程，而非之前 `docker exec` 启动的 shell。若要重新进入之前的交互式 shell，应再次执行 `docker exec -it mycontainer /bin/bash`。

- OPTIONS
	- `--interactive` `-i` Keep STDIN open even if not attached
	- `--tty` `-t` Allocate a pseudo-TTY

- 非交互执行：`sh -c`
	- `docker exec` 默认把 `COMMAND` 及其后的参数当作「可执行文件 + 参数数组」直接传给容器执行，**不经过 shell**，因此 `$VAR`、管道 `|`、通配符 `*` 等不会在容器内解析。
	- 若命令依赖容器内环境变量、管道或 shell 语法，应通过 `sh -c '...'` 让容器内的 shell 解析整段字符串。`-c` 是 [`sh`](/OS/Linux/shell.md) 的参数，含义见该笔记。
	- 错误写法（`$CATALINA_HOME` 会在宿主机展开，通常为空）：
		```bash
		docker exec geoserver2242 grep -nE "Connector|compression" "$CATALINA_HOME/conf/server.xml"
		```
	- 正确写法（单引号内字符串原样传入容器，由容器内 `sh` 展开 `$CATALINA_HOME`）：
		```bash
		docker exec geoserver2242 sh -c 'grep -nE "Connector|compression|compressibleMimeType" "$CATALINA_HOME/conf/server.xml"'
		```
	- 上例用于在 GeoServer 容器内查看 Tomcat `server.xml` 的 HTTP Connector 与 gzip 压缩配置；容器名按实际替换。业务背景见 [`/GIS/GeoServer.md`](/GIS/GeoServer.md)。



## `docker run`
> Create and run a new container from an image.

> Usage: `docker run [OPTIONS] IMAGE [COMMAND] [ARG...]`

> Description:
> `docker run` 命令会在新容器中运行一个命令，必要时会调用镜像并启动容器。
> 你可以使用 `docker start` 重启已停止的容器，并保留其之前的所有更改。使用 `docker ps -a `查看所有容器的列表，包括已停止的容器。

- OPTIONS
	- `--name` Assign a name to the container
	- `--cpus` Number of CPUs
	- `--ulimit` Ulimit options 限制进程的资源使用量。
		- [如何验证 ulimit 中的资源限制？如何查看当前使用量？](https://feichashao.com/ulimit_demo/) 
	- `--volume` `-v` Bind mount a volume 绑定挂载卷
		- [Add bind mounts or volumes using the --mount flag](https://docs.docker.com/engine/reference/commandline/run/#mount) 
		- [Bind mounts](https://docs.docker.com/storage/bind-mounts/) 
	- `--publish` `-p` Publish a container's port(s) to the host
		- [Publish or expose port (-p, --expose)](https://docs.docker.com/engine/reference/commandline/run/#publish) 
	- `--detach` `-d` Run container in background and print container ID



## `docker ps`
> List containers

- 列出本地容器
	- `docker ps` — 只显示运行中的容器
	- `docker ps -a` / `docker ps --all` — 显示所有容器（包括已停止的）

- 通过 `--filter` / `-f` 过滤容器
	- 按名称过滤
		- `docker ps --filter name=nginx`
		- 支持通配：`-f name=^/nginx`（完整名称匹配需带前导 `/`）
	- 按容器状态过滤
		- `docker ps --filter status=running`
		- 可选状态：`created`、`restarting`、`running`、`removing`、`paused`、`exited`、`dead`
	- 按镜像过滤（只显示基于某镜像启动的容器）
		- `docker ps --filter ancestor=nginx`
		- `docker ps --filter ancestor=nginx:latest`
	- 按容器 ID 过滤
		- `docker ps --filter id=abc123`
	- 按退出码过滤（常用于查找异常退出的容器）
		- `docker ps -a --filter exited=1`
	- 按端口映射过滤
		- `docker ps --filter publish=80`
		- `docker ps --filter expose=8080`
	- 按挂载卷过滤
		- `docker ps --filter volume=/var/lib/mysql`
	- 按标签（label）过滤
		- `docker ps --filter label=env=prod`
	- 按健康检查状态过滤
		- `docker ps --filter health=healthy`
	- 按启动先后过滤
		- `docker ps -a --filter before=my_container`
		- `docker ps -a --filter since=another_container`

- 组合多个过滤条件（条件之间为“与”关系）
	- `docker ps --filter name=nginx --filter status=running`

- 使用 `grep` 在输出中二次筛选
	- `docker ps -a | grep nginx`
	- `docker ps -a | grep -E 'Exited|Created'`

## `docker images`

- 列出镜像
	- `docker images`



## `docker restart`

- `docker restart my_container`

- 在Linux机器上重新启动Docker服务
	- `systemctl restart docker`

## `docker load`
> 从tar存档文件或STDIN加载图像

- `docker load -i xxx.tar`



## `docker logs`

- `docker logs -f CONTAINER`
	`docker logs --follow` 命令将继续从容器的 `STDOUT` 和 `STDERR` 中流式输出新的输出。

