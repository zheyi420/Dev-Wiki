> Node Version Manager



# Usage

https://github.com/coreybutler/nvm-windows/?tab=readme-ov-file#usage

```powershell
PS C:\Users\21632> nvm version
1.1.11
PS C:\Users\21632> nvm ls

  * 16.16.0 (Currently using 64-bit executable)
PS C:\Users\21632> nvm ls available

|   CURRENT    |     LTS      |  OLD STABLE  | OLD UNSTABLE |
|--------------|--------------|--------------|--------------|
|    20.5.1    |   18.17.1    |   0.12.18    |   0.11.16    |
|    20.5.0    |   18.17.0    |   0.12.17    |   0.11.15    |
|    20.4.0    |   18.16.1    |   0.12.16    |   0.11.14    |
|    20.3.1    |   18.16.0    |   0.12.15    |   0.11.13    |
|    20.3.0    |   18.15.0    |   0.12.14    |   0.11.12    |
|    20.2.0    |   18.14.2    |   0.12.13    |   0.11.11    |
|    20.1.0    |   18.14.1    |   0.12.12    |   0.11.10    |
|    20.0.0    |   18.14.0    |   0.12.11    |    0.11.9    |
|    19.9.0    |   18.13.0    |   0.12.10    |    0.11.8    |
|    19.8.1    |   18.12.1    |    0.12.9    |    0.11.7    |
|    19.8.0    |   18.12.0    |    0.12.8    |    0.11.6    |
|    19.7.0    |   16.20.2    |    0.12.7    |    0.11.5    |
|    19.6.1    |   16.20.1    |    0.12.6    |    0.11.4    |
|    19.6.0    |   16.20.0    |    0.12.5    |    0.11.3    |
|    19.5.0    |   16.19.1    |    0.12.4    |    0.11.2    |
|    19.4.0    |   16.19.0    |    0.12.3    |    0.11.1    |
|    19.3.0    |   16.18.1    |    0.12.2    |    0.11.0    |
|    19.2.0    |   16.18.0    |    0.12.1    |    0.9.12    |
|    19.1.0    |   16.17.1    |    0.12.0    |    0.9.11    |
|    19.0.1    |   16.17.0    |   0.10.48    |    0.9.10    |

This is a partial list. For a complete list, visit https://nodejs.org/en/download/releases
PS C:\Users\21632>
PS C:\Users\21632> nvm install 18.17.1
Downloading node.js version 18.17.1 (64-bit)...
Extracting node and npm...
Complete
npm v9.6.7 installed successfully.


Installation complete. If you want to use this version, type

nvm use 18.17.1
PS C:\Users\21632> nvm ls

    18.17.1
  * 16.16.0 (Currently using 64-bit executable)


PS C:\Users\21632> nvm use 18.17.1
Now using node v18.17.1 (64-bit)
PS C:\Users\21632> nvm ls

  * 18.17.1 (Currently using 64-bit executable)
    16.16.0
PS C:\Users\21632> node -v
v18.17.1
PS C:\Users\21632>

# 移除某个版本
PS D:\dev\project\GeoDataVis> nvm ls

    20.19.4
    20.18.0
  * 18.20.4 (Currently using 64-bit executable)
PS D:\dev\project\GeoDataVis> nvm uninstall 20.18.0
Uninstalling node v20.18.0... done
PS D:\dev\project\GeoDataVis> nvm ls

    20.19.4
  * 18.20.4 (Currently using 64-bit executable)
PS D:\dev\project\GeoDataVis>


```

## 设置镜像源

- **`nvm node_mirror <node_mirror_url>`**: Set the node mirror.People in China can use `https://npmmirror.com/mirrors/node/` 
	- 默认镜像地址 `https://nodejs.org/dist/` 
- **`nvm npm_mirror <npm_mirror_url>`**: Set the npm mirror.People in China can use `https://npmmirror.com/mirrors/npm/` 
	- 默认镜像地址 `https://github.com/npm/npm/archive/` 🚨 已不存在该地址

## 安装 LTS 版本的方法

```powershell
# 安装最新的 14.x LTS 版本
nvm install 14

# 或者更明确地指定
nvm install lts/fermium

# 安装最新的 LTS 版本（任何版本）
nvm install lts/*
```

# Download

Windows 
- https://github.com/coreybutler/nvm-windows

MacOS
- https://github.com/nvm-sh/nvm
- https://github.com/nvm-sh/nvm#installing-and-updating

