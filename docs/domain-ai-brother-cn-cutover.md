# 将 Charlie Liu 研究札记切换到 ai-brother.cn（待执行）

> 状态：仓库变更已准备，不代表 Cloudflare DNS 或 Pages 已完成绑定。本指南用于正式根域名切换，旧看板可能占用 `ai-brother.cn`。**仅在确认旧看板迁移/下线方案并获得 Cloudflare 控制台访问后执行。**

## 已知项目

- 新博客项目：Cloudflare Pages `charlie-blog`，当前可用地址为 `https://charlie-blog.pages.dev/`。
- 期望根域名：`https://ai-brother.cn/`。
- 网站名称：`Charlie Liu 研究札记`。
- GitHub 源码：`charlieliu9999/xiaofuzilab` 的 `main`。
- 旧看板此前绑定 `ai-brother.cn`。根域名同一时间不能同时指向两个不同的站点；不得在缺少确认的情况下覆盖其配置。

## 正式切换前检查

1. 在 Cloudflare Dashboard 确定管理 `ai-brother.cn` DNS 的 zone、当前 NS、A/AAAA/CNAME 记录及其代理状态；保存 DNS 配置快照。
2. 确认旧看板具体 Pages/Workers 项目、域名绑定、规则和可保留的备用网址，确认停机窗口及回滚责任。检查是否有针对根域名的 Redirect/Origin/Worker Route。
3. 在 `Workers & Pages → charlie-blog → Custom domains` 中选择 **Set up a domain**，添加 `ai-brother.cn`。根域名必须是与目标 Pages 项目同一 Cloudflare 账号中的有效 zone（官方要求）。
4. 如果 Cloudflare 提示域名已经由旧项目占用，先按照迁移方案解除**旧项目的同一域名绑定**，并清理或变更冲突的 DNS/route；不能删除其他无关记录。再完成新项目 Custom domains 激活。不要单纯手工建立 CNAME 却不在 Pages 中关联域名。
5. 等待 Cloudflare 检查通过及 TLS 证书生效，确定 `https://ai-brother.cn/` 已服务博客的正确内容。
6. 此时才合并本 PR，使 Astro `site`、sitemap 自定义页面、站点 `siteUrl` 与正式根域名一致。运行构建及部署验证，检查文章页 `/posts/lieflat-less-ai-tone-review/`、导航、RSS、站点地图、Open Graph 地址，检查移动端页面。
7. 原 `https://charlie-blog.pages.dev/` 保留作为诊断入口，先不要配置强制跳转。旧看板回访地址应单独核实；**不得假定其原域名可用**。另行决定 `www.ai-brother.cn` 的跳转方案。

## 验收与回滚

- 新根域名首页与文章页 HTTP 状态为 200，页面显示为 Charlie Liu 研究札记；HTTPS 证书有效。
- 外链、图片、样式正常；生成的 sitemap、canonical/og:url、RSS 不再指向过时的 `charlieliu.blog`。
- 旧看板如需保留，有经验证的独立访问地址。
- 如新域名无法访问，撤回/暂停本 PR 相关站点配置，恢复切换前保存的 Pages custom domains 与 DNS 记录；注意证书及缓存传播耗时。实际回滚只能由有 Cloudflare 账户权限的人执行。

## 无需替换根域名的备选

如果希望旧看板继续占用根域名，改用 `blog.ai-brother.cn`：在 `charlie-blog` Pages 中添加子域名，并按 Cloudflare 控制台提示建立 `blog CNAME → charlie-blog.pages.dev`（Cloudflare 同账号 zone 可能自动生成）；将本 PR 里的正式网址从 `https://ai-brother.cn` 改为 `https://blog.ai-brother.cn`。不要直接合并以根域名为目标的配置。

参考：Cloudflare [Pages Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)。
