官网 https://www.python.org/

下载 https://www.python.org/downloads/windows/


文档
- Python Documentation by Version
	- https://www.python.org/doc/versions/
- Google Python Style Guide
	- https://google.github.io/styleguide/pyguide.html
	- 中文：菜鸟 Python 编码规范
		- https://www.runoob.com/w3cnote/google-python-styleguide.html



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
# 字节码文件

Python会在以下情况下自动更新字节码文件（`.pyc`）：

## 自动更新触发条件

### 1. 文件修改时间检查 ❓ 待验证
- Python会比较 `.py` 文件和对应 `.pyc` 文件的**修改时间戳**
- 如果 `.py` 文件比 `.pyc` 文件**更新**，Python会重新编译

### 2. 导入时检查
- **每次导入模块时**都会进行检查
- 比如在 `.ipynb` 中执行 `import SessionManager` 或 `from SessionManager import SessionManager`

### 3. **具体更新时机**
```python
# 这些操作都会触发检查和可能的重新编译：
import SessionManager                    # 首次导入
from SessionManager import SessionManager # 导入特定类
importlib.reload(SessionManager)         # 强制重新加载
```

## 检查机制详解

### 时间戳比较
```
SessionManager.py     修改时间: 2025-01-20 15:30:00
SessionManager.pyc    修改时间: 2025-01-20 15:25:00
↓
检测到源文件更新 → 重新编译 → 更新.pyc文件
```

### 文件完整性检查
- Python还会检查**文件大小**和**魔数**（magic number）
- 如果Python版本变化，也会重新编译

## 实际测试场景

在项目中：

1. **修改 `SessionManager.py`** 
2. **保存文件**
3. **在 `.ipynb` 中重新运行导入语句**
   ```python
   # 这会触发检查和可能的重新编译
   from SessionManager import SessionManager
   ```
4. **查看 `__pycache__` 目录** - 此时 `.pyc` 文件的修改时间并不会更新
	```cmd
	dir /T:W dirTo\__pycache__\SessionManager.cpython-311.pyc
	```
5. 对于 `.ipynb` 文件，**要重启  Jupyter Kernel**，再执行含有对应导入的单位格（cell），`.pyc` 文件的修改时间才会更新

## 强制重新编译

如果要重新编译，可以：

### 方法1：删除字节码文件
```bash
# 删除特定文件的字节码
del dirTo\__pycache__\SessionManager.cpython-311.pyc

# 或删除整个缓存目录
rmdir /s dirTo\__pycache__
```

### 方法2：使用 `importlib.reload()`
```python
import importlib
import SessionManager

# 强制重新加载模块
importlib.reload(SessionManager)
```

### 方法3：重启Python解释器
- 重启Jupyter Notebook内核
- 或重新启动Python脚本


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

