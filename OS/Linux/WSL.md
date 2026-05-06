# Windows Subsystem for Linux

## Reference

### Doc
- [Windows Subsystem for Linux 文档](https://learn.microsoft.com/zh-cn/windows/wsl/)

### Install
- [如何使用 WSL 在 Windows 上安装 Linux](https://learn.microsoft.com/zh-cn/windows/wsl/install)

### 安装指南

[Windows 中 Linux 子系统安装指南](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10)

[手动下载 Windows 子系统的 Linux 发行版包](https://docs.microsoft.com/zh-cn/windows/wsl/install-manual#downloading-distros)

### BUG fix

win10 自动更新应用商店版本的 wsl 后启动报错：

```bash
请启用虚拟机平台 Windows 功能并确保在 BIOS 中启用虚拟化。
有关信息，请访问 <https://aka.ms/wsl2-install>

[已退出进程，代码为 4294967295]
```

```
Installing, this may take a few minutes...
Please create a default UNIX user account. The username does not need to match your Windows username.
For more information visit: https://aka.ms/wslusers
Enter new UNIX username: zheyi
New password:
Retype new password:
passwd: password updated successfully
Installation successful!
适用于 Linux 的 Windows 子系统现已在 Microsoft Store 中可用!
你可以通过运行“wsl.exe --update”或通过访问 https://aka.ms/wslstorepage 进行升级
从 Microsoft Store 安装 WSL 将可以更快地获取最新的 WSL 更新。
有关详细信息，请访问 https://aka.ms/wslstoreinfo

To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

Welcome to Ubuntu 24.04.1 LTS (GNU/Linux 5.10.16.3-microsoft-standard-WSL2 x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 System information as of Wed May  6 22:57:42 CST 2026

  System load:  0.0                Processes:             9
  Usage of /:   0.5% of 250.98GB   Users logged in:       0
  Memory usage: 0%                 IPv4 address for eth0: 172.24.21.241
  Swap usage:   0%

This message is shown once a day. To disable it please create the
/home/zheyi/.hushlogin file.
zheyi@DESKTOP-PF2U4PC:~$
```