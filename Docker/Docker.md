
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

# Commands

## `docker version`


## `docker exec`
> Execute a command in a running container

> Usage: `docker exec [OPTIONS] CONTAINER COMMAND [ARG...]`


- 在正在运行的容器中执行命令，在容器上执行交互式 sh shell。
	- `docker exec -it mycontainer /bin/bash`

- OPTIONS
	- `--interactive` `-i` Keep STDIN open even if not attached
	- `--tty` `-t` Allocate a pseudo-TTY



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

- 列出本地所有容器。
	- `docker ps -a`

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

