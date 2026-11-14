GitHub: https://github.com/2dust/v2rayN

路由设置教程：https://baiyunju.cc/7273

V2Ray 路由规则文件加强版，可代替官方 geoip.dat 和 geosite.dat：[@Loyalsoldier/v2ray-rules-dat](https://github.com/Loyalsoldier/v2ray-rules-dat)

修改伪装域名：双击节点打开即可查看修改。

# 使用

### 本地路由配置

代理的Domain或IP

```markdown
# domain

### github gitlab
github.com,
github.blog,
github.githubassets.com,
github-releases.githubusercontent.com,
raw.githubusercontent.com,
gravatar.com, **github gitlab 图标**
gitlab.com,
gittip.com,

## development using
axios-http.com,
openlayers.org,
visualstudio.com,
commonmark.org,
stackoverflow.com,
npmjs.com,
tc39.es,

### other daily using
twitter.com,
dict.deepl.com,
deepl.com,
docs.microsoft.com,
mathsolver.microsoft.com,
spotify.com,
dbeat.bandaivisual.co.jp,
notion.so,
googlevideo.com,
```

直连的Domain或IP

```markdown
# domain

geosite:cn,
geosite:microsoft,
geosite:apple,
geosite:category-ads-all,
msn.com,
adservice.google.com,
cn.vuejs.org,
ruanyifeng.com,
vividsolutions.com,
bitwarden.com,
bitwarden.net,
utorrent.com,
deartree.com,
douban.com,
mphj1.com,
edu.cn,

---

# ip

geoip:private,
geoip:cn,
```

# 相关

- [v2ray](/InternetProxy/v2ray.md)
- [v2rayN 使用说明](/InternetProxy/v2rayN/v2rayN-使用说明.md)
