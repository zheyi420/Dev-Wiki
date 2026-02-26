下载 https://www.anaconda.com/download

与直接下载使用 Python 的区别

- "纯净"的 Python 环境
	- 直接从 python.org 下载安装 Python
	- 使用内置的 venv 创建虚拟环境
	- 手动管理依赖包
- Anaconda（无需单独安装Python）
	- Anaconda = Python解释器 + conda包管理器 + 数据科学工具包
		- conda = 包管理器（参考npm）+ 环境管理器（参考nvm）+ 跨语言支持
	- 安装Anaconda后就有了Python环境
	- 使用conda管理环境和包

Anaconda 安装时**没有**将 Python 添加到系统 PATH 中，这是**推荐的安装方式**，避免与其他 Python 版本冲突。
🚨 没必要将随其安装的 Python 路径手动添加到系统 PATH 中


下载后的几个应用的启动方式，在快捷方式的属性中
`Anaconda PowerShell Prompt` 与 `Anaconda Prompt` 的启动命令可以复制到终端的配置中来设置。

- Anaconda Navigator
	`C:\AIRace\Software\Anaconda\pythonw.exe C:\AIRace\Software\Anaconda\cwp.py C:\AIRace\Software\Anaconda C:\AIRace\Software\Anaconda\pythonw.exe C:\AIRace\Software\Anaconda\Scripts\anaconda-navigator-script.py` 

- Anaconda PowerShell Prompt
	`%WINDIR%\System32\WindowsPowerShell\v1.0\powershell.exe -ExecutionPolicy ByPass -NoExit -Command "& 'D:\Tools\Anaconda\anaconda3\shell\condabin\conda-hook.ps1' ; conda activate 'D:\Tools\Anaconda\anaconda3' "` 
	💡
	```cmd
	C:\>echo %WINDIR%
	C:\Windows
	```
- Anaconda Prompt
	`%WINDIR%\System32\cmd.exe "/K" D:\Tools\Anaconda\anaconda3\Scripts\activate.bat D:\Tools\Anaconda\anaconda3` 
- Jupyter Notebook
	`C:\AIRace\Software\Anaconda\python.exe C:\AIRace\Software\Anaconda\cwp.py C:\AIRace\Software\Anaconda C:\AIRace\Software\Anaconda\python.exe C:\AIRace\Software\Anaconda\Scripts\jupyter-notebook-script.py %USERPROFILE%` 
	💡
	```cmd
	C:\>echo %USERPROFILE%
	C:\Users\<用户名>
	```
- Spyder
	`C:\AIRace\Software\Anaconda\pythonw.exe C:\AIRace\Software\Anaconda\Scripts\spyder-script.py` 
