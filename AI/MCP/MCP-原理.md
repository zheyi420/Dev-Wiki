
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