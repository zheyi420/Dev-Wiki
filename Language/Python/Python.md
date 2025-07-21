官网 https://www.python.org/

下载 https://www.python.org/downloads/windows/

[Google Python Style Guide](https://google.github.io/styleguide/pyguide.html) 中文：[菜鸟 Python 编码规范](https://www.runoob.com/w3cnote/google-python-styleguide.html) 

教程

- [中国大学MOOC Python语言程序设计](https://www.icourse163.org/course/BIT-268001) 

### python3 本地配置

系统变量设置好

```powershell
PS C:\Users> python -V
Python 3.10.0
PS C:\Users> pip -V
pip 21.2.3 from C:\Python310\lib\site-packages\pip (python 3.10)
```

---

# 开发问题

- vscode 在 .py 右键“在交互式窗口中运行当前文件”后安装内核 ipykernel 失败。

## 依赖全局安装可能会导致依赖冲突
比如：
- 项目A用 PyPDF2 == 3.0.1
- 项目B用 PyPDF2 == 1.26.0
你只能全局安装其中一个版本，另一个项目可能报错。

使用虚拟环境（virtual environment）
1、创建项目本地虚拟环境
在你的项目目录下运行：
```powershell
python -m venv venv
```
这会创建一个名为 `venv` 的子目录，里面包含独立的 Python 环境。

2、激活虚拟环境
```powershell
.\venv\Scripts\Activate.ps1
```
激活后，你会看到提示符前面有 `(venv)`，说明你现在在“隔离环境”中。

3、安装依赖到本地环境
```powershell
pip install PyPDF2
```
此时 pip 会将依赖安装到 `venv` 目录内的本地 `site-packages`，不会影响全局环境。

4、保存依赖列表（用于部署或重建环境）
```powershell
pip freeze > requirements.txt
```
之后可通过：
```powershell
pip install -r requirements.txt
```
在其他机器或环境快速安装依赖。

5、退出虚拟环境
```powershell
deactivate
```

