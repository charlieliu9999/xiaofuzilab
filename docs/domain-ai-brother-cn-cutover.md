# Charlie Liu 研究札记绑定 blog.ai-brother.cn

> 状态：GitHub 中已准备站点地址调整，**尚未配置 Cloudflare Pages 的自定义域名和 DNS**。不要把本文件当作完成上线的证明。此次采用子域名，不迁移博客代码，也不修改旧看板的根域名绑定。

## 目标架构

| 用途 | 地址 / 项目 | 策略 |
| --- | --- | --- |
| 旧看板 | `https://ai-brother.cn/` | 保持原项目、DNS 和既有域名绑定不变 |
| 博客新域名 | `https://blog.ai-brother.cn/` | 绑定至现有 Cloudflare Pages 项目 `charlie-blog` |
| Pages 默认地址 | `https://charlie-blog.pages.dev/` | 保留作为访问与故障诊断入口 |
| 博客 GitHub | `charlieliu9999/xiaofuzilab` | 原代码仓库、main 分支、部署流程不变 |

博客名称为「Charlie Liu 研究札记」。不切换域名注册商，不迁移数据或代码，也不更改 `ai-brother.cn` 根域名或 `www` 记录。

## Cloudflare Pages 自定义域名接入

1. 使用有权限的 Cloudflare 账号进入 **Workers & Pages → charlie-blog → Custom domains → Set up a domain**，添加完整主机名 `blog.ai-brother.cn`。**先创建 Pages 自定义域名关联**，不要只添加 DNS CNAME 就认为绑定成功。
2. 检查 `ai-brother.cn` 当前的权威 DNS 管理位置及是否存在 `blog` 子域名记录。只针对 `blog` 主机名新增或修改所需的 CNAME。已有与 `blog` 冲突的记录先确认用途，不要盲目覆盖；与根域名、邮箱、旧看板有关的记录一律不动。
3. 按 Cloudflare 控制台提示配置 `blog` 的 CNAME，目标为 `charlie-blog.pages.dev`。如果域名 DNS 托管在 Cloudflare，Pages 可能自动添加对应记录；如权威 DNS 在外部提供商，则到该提供商配置 CNAME，并以 Pages 提示为准。记录类型、代理状态、有效性必须以实际控制台反馈为准。
4. 等待 Pages 的自定义域名状态变为 **Active** 且 HTTPS 证书可用。在尚未完成之前仍以 `https://charlie-blog.pages.dev/` 为可用博客地址。无需且不得解除 `ai-brother.cn` 旧看板的绑定。
5. 完成域名绑定并核验后再评审/合并本仓库 [PR #3](https://github.com/charlieliu9999/xiaofuzilab/pull/3)，让 Astro 的 `site`、站点地图生成及 `SITE.siteUrl` 指向子域名。PR 通过 GitHub Actions 构建检查并不意味着 Cloudflare 域名已绑定。
6. 检查 Cloudflare Pages 对 main 分支的生产部署是否完成；如网站由独立部署命令发布，按现有部署流程执行。不要仅凭 GitHub 构建通过就宣布线上完成。

## 线上验证清单

- [ ] `https://ai-brother.cn/` 仍显示旧看板，已有路径正常
- [ ] `https://blog.ai-brother.cn/` 返回 200，展示「Charlie Liu 研究札记」，HTTPS 证书有效
- [ ] `https://blog.ai-brother.cn/posts/lieflat-less-ai-tone-review/` 能正常打开
- [ ] `https://charlie-blog.pages.dev/` 仍可打开博客
- [ ] 博客样式、图片、站内导航、移动端布局正常
- [ ] sitemap、`og:url`、网站的规范地址（若配置 canonical）指向 `https://blog.ai-brother.cn`
- [ ] RSS、站内绝对链接（如适用）没有意外使用旧的 `charlieliu.blog`
- [ ] 无错误的全站重定向把根域名或旧看板引到博客

## 异常与回滚

如果子域名无法使用，先检查 Pages Custom domains 状态、CNAME 解析和证书签发状态。保持旧看板和 `pages.dev` 地址不动；如需回滚，只撤销 `blog` CNAME/自定义域名关联，并恢复博客 PR 合并前的站点地址配置。任何 DNS/Cloudflare 修改必须由具有 Cloudflare 或 DNS 管理权限的操作者执行并记录原值。

## 参考

- [Cloudflare Pages — Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [GitHub PR #3：博客子域名配置](https://github.com/charlieliu9999/xiaofuzilab/pull/3)
