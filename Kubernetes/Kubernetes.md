# Sub Category
- [kubectl](./kubectl.md)


# Reference
- [Kubernetes 文档](https://kubernetes.io/zh-cn/docs/home/)
- [Kubernetes API 参考 v1.27](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.27/)

# Concepts

## Nodes

- [节点](https://kubernetes.io/zh-cn/docs/concepts/architecture/nodes/) 
- [查看 Pod 和节点](https://kubernetes.io/zh-cn/docs/tutorials/kubernetes-basics/explore/explore-intro/) 




## Namespaces

- [K8s 文档 - 名字空间（Namespace）](https://kubernetes.io/zh-cn/docs/concepts/overview/working-with-objects/namespaces/)
- [K8s 文档 - 通过名字空间共享集群](https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/namespaces/)

- [k8s实践(5）k8s的命名空间Namespace](http://t.csdn.cn/hrZUl)

Namespaces 是 Kubernetes 用来支持隔离单个集群中的资源组的一种抽象。
- 它提供一种机制，将同一集群中的资源划分为相互隔离的组。
- 同一名字空间内的资源名称要唯一，但跨名字空间时没有这个要求。
- 名字空间作用域仅针对带有名字空间的[对象](https://kubernetes.io/zh-cn/docs/concepts/overview/working-with-objects/#kubernetes-objects)，（例如 Deployment、Service 等），这种作用域对集群范围的对象 （例如 StorageClass、Node、PersistentVolume 等）不适用。


## Pod


**重新部署服务** 和 **修改 Pod 数量为 0 后再增加** 的区别
- 重新部署服务会待新的 Pod 处于 `Running` 状态后再移除旧的 Pod，不会影响服务。
- 修改 Pod 数量为 0 后再增加会导致服务中断。

### 资源配置

- [k8s CPU limit和throttling的迷思](https://nanmu.me/zh-cn/posts/2021/myth-of-k8s-cpu-limit-and-throttle/) 
- [为 Pod 和容器管理资源](https://kubernetes.io/zh-cn/docs/concepts/configuration/manage-resources-containers/) 
- [为容器和 Pods 分配 CPU 资源](https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/assign-cpu-resource/) 
- [管理内存、CPU 和 API 资源](https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/manage-resources/) 
- [限制范围](https://kubernetes.io/zh-cn/docs/concepts/policy/limit-range/) limit-range 
- [资源配额](https://kubernetes.io/zh-cn/docs/concepts/policy/resource-quotas/) resource-quotas 


### Container Probe 容器探针
> **probe** 是由 kubelet 对容器执行的定期诊断。 要执行诊断，kubelet 既可以在容器内执行代码，也可以发出一个网络请求。


- [容器探针](https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/pod-lifecycle/#container-probes) 
- [探针](https://kubernetes.io/zh-cn/docs/reference/kubernetes-api/workload-resources/pod-v1/#Probe) 

#### 检查机制

- `httpGet`
	对容器的 IP 地址上指定端口和路径执行 HTTP `GET` 请求。如果响应的状态码大于等于 200 且小于 400，则诊断被认为是成功的。

#### 探测类型
##### livenessProbe 存活态探针

##### readinessProbe 就绪态探针

- 就绪探针在容器的整个生命周期中保持运行状态。
- 存活探针**不等待**就绪性探针成功。 如果要在执行存活探针之前等待，应该使用 `initialDelaySeconds` 或 `startupProbe`。


##### startupProbe 启动探针

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

