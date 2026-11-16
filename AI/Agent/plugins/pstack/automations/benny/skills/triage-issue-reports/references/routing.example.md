# 路由图例子

把这个文件复制到 `.cursor/automations/benny/` 之外，例如 `.cursor/benny/routing.md`，并替换每个占位符。把 `routing.map_path` 指到这份副本。包刷新不得覆盖它。

分诊 skill 把这当数据。一条路由需要来自报告或原因追溯的证据。单靠关键词匹配不够。

```yaml
routes:
  - name: "billing-example"
    match:
      product_areas:
        - "billing-area-placeholder"
      code_paths:
        - "billing-code-path-placeholder"
      error_signatures:
        - "billing-error-placeholder"
    destination:
      slack_channel: "billing-channel-placeholder"
      tracker_team: "billing-team-placeholder"
    owners:
      - "billing-owner-placeholder"
    allow_feature_owner_ping: false

  - name: "desktop-example"
    match:
      product_areas:
        - "desktop-area-placeholder"
      code_paths:
        - "desktop-code-path-placeholder"
      error_signatures:
        - "desktop-error-placeholder"
    destination:
      slack_channel: "desktop-channel-placeholder"
      tracker_team: "desktop-team-placeholder"
    owners:
      - "desktop-owner-placeholder"
    allow_feature_owner_ping: false

fallback:
  destination: ""
  owners: []
  allow_feature_owner_ping: false

ping_policy:
  default: "off"
  allow:
    - "configured-feature-owner"
    - "confirmed-regression-author"
  deny:
    - "broad-on-call-group"
    - "unverified-owner"
```

## 规则

- 除非有一个团队接收全部未匹配的报告，否则 `fallback.destination` 留空。
- 使用稳定的产品区域、代码路径和错误特征。
- 公开副本里不要放私人数据。
- 不要把原始的用户或频道 ID 贴进将要发布的例子。
- 在目标团队同意之前，功能负责人的 ping 保持关闭。
- 改道是告诉报告人要去哪里。自动化绝不跨频道发帖。
