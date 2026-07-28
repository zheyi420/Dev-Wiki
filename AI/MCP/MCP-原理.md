模型上下文协议：
- 上下文 -> 环境
- 环境 -> 周围有哪些函数可以用来调用，从而获取到外界的信息
	- 天气信息
	- 网络信息
	- 文件信息...

MCP 就是让模型感知外部环境的一个协议，所以叫做模型上下文协议。但实际规定的不是与模型交互的内容，最多只能说是服务于模型。

# MCP Host
如：Claude Desktop、Cursor、Cline

MCP Host 与 MCP Server （程序、服务） 的沟通方式（transportType）：
- `stdio` 大部分采用这种
- `SSE (Server-Sent Events)`


![](AI/MCP/assets/Pasted%20image%2020260727231013.png)


# MCP Server

- 大多使用 Python 或者 Node 进行编写。
- 对应的启动程序一般是 nvx (Python) 或者是 npx (Node) 。

uvx: `uv tool run` 命令的缩写。  
uv: python 领域的包管理软件。

# MCP 协议

MCP 协议规定的内容仅限于 MCP Host 与 MCP Server 的交互。这一环节与模型并没有关系。规定的是如何发现与调用函数，脱离大模型也是能够用的，只不过没人这么使用。协议本身并没有规定与模型的交互方式。  
不同的 MCP Host 与模型的交互有很大差异：
- Cline: XML 格式与模型沟通
- Cherry Studio: Function Calling 格式与模型沟通
	> Function Calling: OpenAI 提出的一套协议，用来规定模型是如何调用函数的。

主要规定了两部分的内容：
- 【函数的注册】每个 MCP Server 有哪些函数可以用，即每个 MCP Server 的函数列表。
- 【函数的使用】如何调用这些函数，即每个函数的调用方法。

有些 MCP Server 内部还有资源可供使用。