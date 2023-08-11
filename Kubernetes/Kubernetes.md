# Sub Category
- [kubectl](./kubectl.md)


# Reference
- [Kubernetes 文档](https://kubernetes.io/zh-cn/docs/home/)
- [Kubernetes API 参考 v1.27](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.27/)

# Concepts

## Namespaces

- [K8s 文档 - 名字空间（Namespace）](https://kubernetes.io/zh-cn/docs/concepts/overview/working-with-objects/namespaces/)
- [K8s 文档 - 通过名字空间共享集群](https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/namespaces/)

- [k8s实践(5）k8s的命名空间Namespace](http://t.csdn.cn/hrZUl)

Namespaces 是 Kubernetes 用来支持隔离单个集群中的资源组的一种抽象。
- 它提供一种机制，将同一集群中的资源划分为相互隔离的组。
- 同一名字空间内的资源名称要唯一，但跨名字空间时没有这个要求。
- 名字空间作用域仅针对带有名字空间的[对象](https://kubernetes.io/zh-cn/docs/concepts/overview/working-with-objects/#kubernetes-objects)，（例如 Deployment、Service 等），这种作用域对集群范围的对象 （例如 StorageClass、Node、PersistentVolume 等）不适用。


## Pod

Pod 内运行 free 用于显示内存状态
内存关系为：`total` = `used` + `free` + `buff/cache`

**重新部署服务** 和 **修改 Pod 数量为 0 后再增加** 的区别

### Container Probe 容器探针

- [容器探针](https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/pod-lifecycle/#container-probes)
- [探针](https://kubernetes.io/zh-cn/docs/reference/kubernetes-api/workload-resources/pod-v1/#Probe)



#### livenessProbe 存活态探针

#### readinessProbe 就绪态探针

#### startupProbe 启动探针

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

