
# Reference

Docker.com
- https://www.docker.com/
	- https://docs.docker.com/

Tutorial
- [yeasy.gitbook.io - Docker - 从入门到实践](https://yeasy.gitbook.io/docker_practice/)
- [菜鸟 - Docker 教程](https://www.runoob.com/docker/docker-tutorial.html)
- [阮一峰 - Docker 入门教程](https://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)


---

# Commands

## `docker version`


## `docker exec`

- 在正在运行的容器中执行命令，在容器上执行交互式 sh shell。
	- `docker exec -it mycontainer /bin/bash`


## `docker run`
> Create and run a new container from an image.

> Usage: `docker run [OPTIONS] IMAGE [COMMAND] [ARG...]`

> `docker run` 命令会在新容器中运行一个命令，必要时会调用镜像并启动容器。

- OPTIONS
	- `--name` Assign a name to the container
	- `--cpus` Number of CPUs
	- `--ulimit` Ulimit options
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

