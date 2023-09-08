- [命令行工具 (kubectl)](https://kubernetes.io/zh-cn/docs/reference/kubectl/)
- [kubectl 参考文档](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands)

# Commands


`kubectl version -o='json'`
> 打印当前环境的客户端和服务器版本信息。


`kubectl top pod <pod-name> -n=<namespace-name>`
> 显示 pods 的资源(CPU/内存)使用情况。


`kubectl top pod -n=<namespace-name> --containers`
> 显示给定命名空间及其容器的度量。

### `exec`
> 在 Pod 中的容器上执行命令


`kubectl exec -it -n=<namespace-name> <pod-name> bash`
> 交互式进入 Pod，在容器中执行命令。
> 和从 K8s 的 UI 界面进入工作负载 `执行命令行` 一样。


### `logs`
>  打印 Pod 中容器的日志

`kubectl logs -n=<namespace-name> <pod-name>`
> 查看指定 Pod 中的日志。
> 和从 K8s 的 UI 界面进入工作负载查看 Pods 日志内容一样。
> 
> 建议执行以下这些避免刷屏
> - `kubectl logs <pod-name> -n <namespace-name> | head -50`
> - `kubectl logs <pod-name> -n <namespace-name> | tail -50`
> - `kubectl logs <pod-name> -n=<namespace-name> --tail=50`


`kubectl logs -n=<namespace-name> <pod-name> -c=<container-name>`
> 查看指定 Pod 中指定容器的日志。


### `get`
> 列出资源

`kubectl get all -n=<namespace-name> -o=wide`


`kubectl get pods -n=<namespace-name> -o=wide`
> 以 ps 输出格式列出所有 pod 的更多信息(如节点名称)
> about output format `ps`:
> - what's ps output format???
> 
> `-o=wide` 以纯文本格式输出，包含所有附加信息。对于 Pod 包含节点名。
> - [输出选项 - 格式化输出](https://kubernetes.io/zh-cn/docs/reference/kubectl/#formatting-output) 
- 输出字段中的 `IP` 指的是什么？貌似不是节点 `IP` 


### `describe`
> 显示有关资源的详细信息

`kubectl describe pods -n=<namespace-name> <pod-name>`
> - 查看重启原因。
> - 查看 Pod 内的容器名，输出结果中 `Containers:` 的内容就是 Pod 中所有容器的信息。


`kubectl describe nodes <node-name>`

### `top`
> Display Resource (CPU/Memory) usage.


`kubectl top pod -n=NAMESPACE POD_NAME --containers`
> Show metrics for a given pod and its containers.

