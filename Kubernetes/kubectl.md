- [命令行工具 (kubectl)](https://kubernetes.io/zh-cn/docs/reference/kubectl/)
- [kubectl 参考文档](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands)

# Commands

`kubectl exec -it <pod-name> -n <namespace-name> bash`
> 交互式进入容器
> 和从K8s的UI界面进入工作负载 `执行命令行` 一样。

`kubectl logs <pod-name> -n <namespace-name>`
> 和从K8s的UI界面进入工作负载查看Pods日志内容一样。
> 建议执行以下这些避免刷屏
> - `kubectl logs <pod-name> -n <namespace-name> | head -50`
> - `kubectl logs <pod-name> -n <namespace-name> | tail -50`
> - `kubectl logs <pod-name> -n=<namespace-name> --tail=50`

`kubectl version -o='json'`
> 打印当前环境的客户端和服务器版本信息。

`kubectl top pod <pod-name> -n=<namespace-name>`
> 显示 pods 的资源(CPU/内存)使用情况。

`kubectl top pod -n=<namespace-name> --containers`
> 显示给定命名空间及其容器的度量。

`kubectl get pods -n=<namespace-name> -o=wide`
> 以ps输出格式列出所有pod的更多信息(如节点名称)
> about output format `ps`: xxx
> `-o=wide` 以纯文本格式输出，包含所有附加信息。对于 Pod 包含节点名。