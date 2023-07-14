# Sub Category
- [kubectl](./kubectl.md)


# Reference
- [Kubernetes 文档](https://kubernetes.io/zh-cn/docs/home/)
- [Kubernetes API 参考 v1.27](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.27/)

# Concepts

## Pod

Pod 内运行 free 用于显示内存状态
内存关系为：`total` = `used` + `free` + `buff/cache`

**重新部署服务** 和 **修改 Pod 数量为 0 后再增加** 的区别

### Container Probe 容器探针
- [容器探针](https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/pod-lifecycle/#container-probes)
- [探针](https://kubernetes.io/zh-cn/docs/reference/kubernetes-api/workload-resources/pod-v1/#Probe)



#### livenessProbe 存活态探针

#### readinessProbe 就绪态探针

## PV

### PVC - PersistentVolumeClaim

# Solution & Debug

## 排查 Kubernetes 的内存增长问题

- 查看容器内存使用情况。
- 查看容器内存使用率。
- 查看占用的进程。
- 

1. 进入容器
	- 交互式进入容器 `kubectl exec -it <pod-name> -n <namespace-name> bash`
	- 或者 `工作负载` 中 `执行命令行`。

## Pod 内容器重启

