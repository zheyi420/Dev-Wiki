
**启动项目录**
用户 `C:\Users\user_name\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup`
系统 `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp`

**系统录音文件目录**


# 工具

- [Windows Terminal](https://docs.microsoft.com/zh-cn/windows/terminal/) 
- [Microsoft PowerToys](https://docs.microsoft.com/zh-cn/windows/powertoys/) 
- [revo Uninstaller](https://www.revouninstaller.com/) 用于卸载正常途径没法卸载的应用
- [Geek Uninstaller](https://geekuninstaller.com/) 用于删除软件，扫描残留文件及软件注册表
- WizTree
- 轻便的图标、图像编辑器
    - paint.net
        - 官网下载地址 https://www.getpaint.net/download.html
        - 免费版本下载地址 https://www.dotpdn.com/downloads/pdn.html
    - win10 自带的画图3D

# Case

## 删除被占用的 dll 文件

参考blog [http://hsiwei0620.blogspot.com/2018/06/dll.html](http://hsiwei0620.blogspot.com/2018/06/dll.html)

1. 先尝试更改dll文件的名字后删除，若删除不了再试试下面的操作。
2. e.g. Notepad ++ 的 NppShell_06.dll 无法删除
	1. 进入 Notepad ++ 目录
	2. 使用 tasklist 命令（使用 Windows PowerShell），列出当前使用所给 exe/dll 名称的所有任务 `tasklist /m NppShell_06.dll`
	3. 可以看到哪个 .exe 占用 NppShell_06.dll
	4. 发现 explorer.exe，不能乱关，运行指令 `taskkill /f /PID <进程ID>`
	5. 此时桌面和任务栏消失 , don't panic
	6. 现在先删除该目录下的 NppShell_06.dll 文件 `del NppShell_06.dll`
	7. 重启 explorer.exe，桌面和任务栏恢复 `explorer.exe` 
	```powershell
	PS D:\\otherTools\\notepad\\Notepad++> tasklist /m NppShell_06.dll
	
	映像名称                       PID 模块
	========================= ======== ============================================
	explorer.exe                 12748 NppShell_06.dll
	
	PS D:\\otherTools\\notepad\\Notepad++> taskkill /f /PID 12748
	
	PS D:\\otherTools\\notepad\\Notepad++> del NppShell_06.dll
	
	PS D:\\otherTools\\notepad\\Notepad++> explorer.exe
	```

## win10 IIS 服务开启并配置 目录浏览（本地）

tag #本地部署

- [win10 IIS服务开启并配置 目录浏览（本地）](https://blog.csdn.net/wqssh21/article/details/106223557) 

## 设置 BIOS 密码


## ftp 访问文件

- [windows10 ftp文件夹错误](https://www.cnblogs.com/santia-god/p/16834375.html) 


## 将"Open With VSCode"添加到右键上下文

- [设置单击右键可以选择用VS Code打开文件](https://blog.csdn.net/BigFamer/article/details/125513859) 

示例
```txt
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\*\shell\VSCode]
@="Open with Code"
"Icon"="D:\\Microsoft VS Code\\Code.exe"

[HKEY_CLASSES_ROOT\*\shell\VSCode\command]
@="\"D:\\Microsoft VS Code\\Code.exe\" \"%1\""

Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\shell\VSCode]
@="Open with Code"
"Icon"="D:\\Microsoft VS Code\\Code.exe"

[HKEY_CLASSES_ROOT\Directory\shell\VSCode\command]
@="\"D:\\Microsoft VS Code\\Code.exe\" \"%V\""

Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\Directory\Background\shell\VSCode]
@="Open with Code"
"Icon"="D:\\Microsoft VS Code\\Code.exe"

[HKEY_CLASSES_ROOT\Directory\Background\shell\VSCode\command]
@="\"D:\\Microsoft VS Code\\Code.exe\" \"%V\""

```


## 设置文件资源管理器所有布局为"详细信息"

