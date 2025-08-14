> pip 是 Python 包管理工具，该工具提供了对 Python 包的查找、下载、安装、卸载的功能。

软件包可以在 https://pypi.org/ 中找到。

---

pip [清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/help/pypi/) 

使用国内镜像速度会快很多

- 临时使用
    `pip install -i https://pypi.tuna.tsinghua.edu.cn/simple some-package`

- 设为默认
    升级 pip 到最新的版本 (>=10.0.0) 后进行配置：
    ```powershell
    pip install pip -U
    pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
    ```
    如果您到 pip 默认源的网络连接较差，临时使用本镜像站来升级 pip：
    `pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pip -U`

