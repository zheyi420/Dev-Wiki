# REST API

REST API（也称为 RESTful API 或 RESTful Web API）是一种应用程序编程接口 (API)，它符合具象状态传输 (REST) 架构风格的设计原则²。REST API 提供了一种灵活、轻量级的方式来集成应用程序并连接微服务架构中的组件²。

REST API 是一种将HTTP接口映射到GET,POST,PUT,DELETE等方法的风格，简化了接口的理解和调用¹。例如，REST API 会使用 GET 请求来检索记录。POST 请求用于创建新记录。PUT 请求用于更新记录，DELETE 请求用于删除记录²。

REST API 的设计需要确保客户端和服务器都无法判断自己是与最终应用程序还是与中介服务器通信²。在 REST API 中，调用和响应会经过多个不同的层²。

REST API 的另一重要部分就是为既定好请求的类型来响应正确的状态码¹。当你请求HTTP时，服务器会响应一个状态码来判断你的请求是否成功，然后客户端应如何继续¹。

总的来说，REST API 是一种应用程序编程接口 (API)，它符合具象状态传输 (REST) 架构风格的设计原则，提供了一种灵活、轻量级的方式来集成应用程序并连接微服务架构中的组件，简化了接口的理解和调用¹²。

源: 与必应的对话， 2024/4/16
(1) 什么是 REST API？| IBM. https://www.ibm.com/cn-zh/topics/rest-apis.
(2) 一文彻底弄懂REST API - 知乎 - 知乎专栏. https://zhuanlan.zhihu.com/p/536437382.
(3) 什么是 REST API - 应用编程接口（API）- NGINX. https://www.nginx-cn.net/resources/glossary/rest-api/.
(4) 一文看懂什么是 RESTful API？- API 接口简介 - Red Hat. https://www.redhat.com/zh/topics/api/what-is-a-rest-api.

# KVP API

KVP API（键值对API）是一种特殊类型的API，它使用键值对（Key-Value Pair）的方式来存储和检索数据。在这种API中，每个键都唯一地对应一个值，你可以通过键来获取或修改其对应的值。

例如，SNIA KV API标准定义了`store_kvp`、`retrieve_kvp`、`delete_kvp`和`iterate`等命令。`store_kvp`用于存储键值对，`retrieve_kvp`用于检索键值对，`delete_kvp`用于删除键值对，而`iterate`则允许用户提供一个前缀，与设备上的KV对进行比较，并在匹配时返回。

这些命令接受一个键值对，而不是逻辑地址，将键转换为磁盘上的物理位置是在设备内部完成的。一个KVP API的实现可能会有不同的特性，例如一些设计在设备内部导出事务等特性，而其他设计则导出更简单的接口，侧重于存储和检索性能。

总的来说，KVP API提供了一种高效的方式来存储和检索数据，特别适合于需要快速访问键值对的应用场景。