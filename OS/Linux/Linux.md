# 工具

- Windows 传输文件到 Linux 服务器：
    - MobaXterm https://mobaxterm.mobatek.net/
    - FileZilla https://filezilla-project.org/
- Window 系统上 Linux 远程登录客户端：[[维基百科]SSH客户端比较](https://zh.wikipedia.org/wiki/SSH%E5%AE%A2%E6%88%B7%E7%AB%AF%E6%AF%94%E8%BE%83) 
    - SecureCRT [https://www.vandyke.com/products/securecrt/index.html](https://www.vandyke.com/products/securecrt/index.html) 
    - Putty [https://www.chiark.greenend.org.uk/~sgtatham/putty/](https://www.chiark.greenend.org.uk/~sgtatham/putty/) 
    - SSH Secure Shell

# 版本查询


## WSL
```bash
jarvismusk@DESKTOP-4VCCMF2:/mnt/c/Users/usrname$ uname -a
Linux DESKTOP-4VCCMF2 5.10.16.3-microsoft-standard-WSL2 #1 SMP Fri Apr 2 22:23:49 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux

jarvismusk@DESKTOP-4VCCMF2:/mnt/c/Users/usrname$ lsb_release -a
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 20.04.2 LTS
Release:        20.04
Codename:       focal

jarvismusk@DESKTOP-4VCCMF2:/mnt/c/Users/usrname$ cat /proc/version
Linux version 5.10.16.3-microsoft-standard-WSL2 (oe-user@oe-host) (x86_64-msft-linux-gcc (GCC) 9.3.0, GNU ld (GNU Binutils) 2.34.0.20200220) #1 SMP Fri Apr 2 22:23:49 UTC 2021

jarvismusk@DESKTOP-4VCCMF2:/mnt/c/Users/usrname$ cat /etc/redhat-release
cat: /etc/redhat-release: No such file or directory

jarvismusk@DESKTOP-4VCCMF2:/mnt/c/Users/usrname$ cat /etc/issue
Ubuntu 20.04.2 LTS \\n \\l
```


