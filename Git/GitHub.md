
- [GitHub 文档](https://docs.github.com/zh) 
- [设置你的提交电子邮件地址](https://docs.github.com/cn/account-and-profile/setting-up-and-managing-your-github-user-account/managing-email-preferences/setting-your-commit-email-address) 

- [通过 SSH 连接到 GitHub](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh)

# GitHub Pages

- [GitHub Pages](https://docs.github.com/pages) 
	- [从分支进行发布](https://docs.github.com/zh/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-from-a-branch) 

## GitHub Pages Deployment

```bash
#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
npm run build

# cd 到构建输出的目录下
cd dist

# place .nojekyll to bypass Jekyll processing
touch .nojekyll

# 部署到自定义域域名
# echo 'www.example.com' > CNAME
git init

git add .

git commit -m 'deploy'

git config http.proxy "127.0.0.1:10809"

git config https.proxy "127.0.0.1:10809"

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
git push -f https://github.com/zheyi420/smartmapx-webgis-examples.git master:gh-pages

cd -
```


# ⚠ fatal

## Failed to connect to github.com port 443: Timed out

^e96718


原 blog：[无法连接github](https://www.cnblogs.com/xym4869/p/13262061.html) 

1. 登录 [IP查询网](https://www.ipaddress.com/ip-lookup) ，查询以下的IP 地址；

- `github.com` https://ipaddress.com/website/github.com
- `github.global.ssl.fastly.net` https://ipaddress.com/website/github.global.ssl.fastly.net


2. 添加映射到 `C:\Windows\System32\drivers\etc\hosts` 文件中：(Mac用户：/etc/hosts）

```makefile
# <https://ipaddress.com/website/github.com>
140.82.113.3    github.com
# <https://ipaddress.com/website/github.global.ssl.fastly.net>
199.232.69.194    github.global.ssl.fastly.net
# <https://ipaddress.com/website/assets-cdn.github.com>
# 185.199.108.153    assets-cdn.github.com
# 185.199.109.153    assets-cdn.github.com
# 185.199.110.153    assets-cdn.github.com
# 185.199.111.153    assets-cdn.github.com
```

3. 打开 cmd，更新DNS缓存，执行 `ipconfig /flushdns` ，执行 `ping github.com`，可通即可用。

4. 设置代理方法即可解决（win10设置 → 网络和 Internet → 代理）

`git config http.proxy "localhost:port"`

`git config https.proxy "localhost:port"`

5. 完成后取消设置

`git config --unset http.proxy`

`git config --unset https.proxy`

---
## OpenSSL SSL_read: Connection was reset, error 10054

**问题描述**
> 在能够连接 Github 的情况下，clone 报错。

```bash
*****@DESKTOP-PF**PC MINGW64 /d/development/project
$ git clone <https://github.com/1adrianb/face-alignment.git>
Cloning into 'face-alignment'...
fatal: unable to access '<https://github.com/1adrianb/face-alignment.git/>': OpenSSL SSL_reanection was reset, errno 10054
```

**解决**

1. 参考上面的 [Failed to connect to github.com port 443: Timed out](#^e96718) 
	更新DNS缓存，cmd 执行 `ipconfig /flushdns` 
	重新 clone
	还是不行，进行 2 的操作。
2. 修改设置解除 SSL 验证
	打开Git命令页面，执行git命令脚本：修改设置，解除 ssl 验证
    `git config --global http.sslVerify "false"`

    有可能的后果：    
	```bash
	$ git pull
	warning: ----------------- SECURITY WARNING ----------------
	warning: | TLS certificate verification has been disabled! |
	warning: ---------------------------------------------------
	warning: HTTPS connections may not be secure. See <https://aka.ms/gcmcore-tlsverify> for more information.
	```

3. 重新 clone

Reference:
- [Git报错解决：OpenSSL SSL_read: Connection was reset, errno 10054 错误解决](https://blog.csdn.net/weixin_43945983/article/details/110882074) 
- [解决OpenSSL SSL_read: Connection was reset, errno 10054问题](https://blog.51cto.com/u_15326986/3328947) 
- [git clone ：unable to access github: OpenSSL SSL_read: Connection was reset, errno 10054](https://blog.csdn.net/Jxianxu/article/details/115598869) 
- [无法连接github](https://www.cnblogs.com/xym4869/p/13262061.html) 


# Others

- 在仓库 url 的 `github` 后添加 `1s` 切换到在线代码查看页面【非官方】；

- [如何在 GitHub 上托管 PWA 页面](https://christianheilmann.com/2022/01/13/turning-a-github-page-into-a-progressive-web-app/) 
	PWA 指的是离线也能使用的网页应用。本文给出简单的设置步骤，让托管在 GitHub 上面的页面变成 PWA，离线也能使用。

