
- [kubectl](./kubectl.md)

# Doc
- https://kubernetes.io/

Pod 内运行 free 用于显示内存状态
内存关系为：`total` = `used` + `free` + `buff/cache`

# Solution

## 排查 Kubernetes 的内存增长问题

- 查看容器内存使用情况。
- 查看容器内存使用率。
- 查看占用的进程。
- 

1. 进入容器
	- 交互式进入容器 `kubectl exec -it <pod-name> -n <namespace-name> bash`
	- 或者 `工作负载` 中 `执行命令行`。
2. 