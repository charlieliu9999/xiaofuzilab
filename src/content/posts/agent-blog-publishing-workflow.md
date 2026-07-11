---
title: "如何为这个博客写作与发布：一份面向 AI Agent 的工作流"
description: "任何获得代码库访问权限的 Agent，都可以按照这份流程创建文章、完成校验、推送 GitHub，并由 Cloudflare Pages 自动发布。"
date: 2026-07-11
tags:
  - Agent
  - 写作
  - 工作流
  - Cloudflare
slug: agent-blog-publishing-workflow
draft: false
---

## 这套流程解决什么问题

这个博客使用 Astro 构建，源代码保存在 GitHub，Cloudflare Pages 与 `main` 分支相连。

这意味着，发布文章不需要重构网站，也不需要手动上传构建目录。Agent 只要在正确的位置创建 Markdown 文件、通过构建校验并推送 GitHub，Cloudflare 就会自动完成生产部署。

完整链路是：

```text
明确写作任务
→ 创建 Markdown 文章
→ 本地构建校验
→ 提交文章文件
→ 推送 GitHub main
→ Cloudflare 自动构建
→ 验证线上页面
```

## Agent 开始前必须确认的事项

在修改文件之前，先确认工作目录和 Git 状态：

```bash
pwd
git branch --show-current
git status --short
git pull --ff-only origin main
```

Agent 应遵守三个边界：

1. 只处理当前写作任务涉及的文件，不覆盖用户或其他 Agent 的未提交改动。
2. 生产文章必须明确设置 `draft: false`；尚未确认的内容使用 `draft: true`。
3. 不虚构来源、数据、个人经历和平台连接状态。需要引用外部事实时，应先核验来源。

## 第一步：创建文章文件

文章放在：

```text
src/content/posts/
```

文件名使用小写英文和连字符，例如：

```text
src/content/posts/how-agents-publish-knowledge.md
```

每篇文章都使用以下模板：

```markdown
---
title: "文章标题"
description: "用于首页、搜索和分享的简短摘要"
date: 2026-07-11
tags:
  - AI
  - 研究方法
slug: article-url-slug
draft: false
---

## 第一个章节

正文从这里开始。
```

字段要求：

| 字段 | 要求 |
|------|------|
| `title` | 清晰表达文章真正讨论的问题 |
| `description` | 一到两句话，避免重复标题 |
| `date` | 使用 `YYYY-MM-DD` 格式 |
| `tags` | 建议 2—4 个，优先复用已有标签 |
| `slug` | 全站唯一，使用小写英文与连字符 |
| `draft` | `false` 才会进入首页、文章列表和 RSS |

## 第二步：完成内容检查

发布前，Agent 应检查：

- 标题与正文讨论的问题一致
- 摘要能够独立说明文章价值
- 事实、数字和引用有可靠依据
- 标题层级从 `##` 开始，结构连续
- 没有示例邮箱、占位链接或未完成标记
- `slug` 与现有文章不重复
- 图片使用仓库内稳定路径或可靠的公开地址

如果任务要求 AI 研究，文章中应区分三类内容：可靠事实、基于材料的推断、作者或 Agent 的判断。不要把推断写成已经确认的事实。

## 第三步：本地构建

执行：

```bash
npm install --no-audit --no-fund
npm run build
```

构建成功后，应确认输出中出现新文章的路由，例如：

```text
/posts/article-url-slug/index.html
```

构建失败时不要继续推送。先修复 Frontmatter、Markdown、导入路径或依赖问题，再重新执行构建。

## 第四步：精准提交

只暂存本次任务创建或修改的文章文件：

```bash
git add src/content/posts/article-url-slug.md
git diff --cached --check
git diff --cached
git commit -m "content: publish article title"
```

不要使用会把整个工作区全部加入提交的命令，除非已经明确核对所有变更都属于当前任务。

## 第五步：推送并触发 Cloudflare

```bash
git push origin main
```

当前自动部署配置为：

- GitHub 仓库：`charlieliu9999/xiaofuzilab`
- 生产分支：`main`
- 构建命令：`npm run build`
- 输出目录：`dist`
- 生产地址：`https://charlie-blog.pages.dev`

推送成功只代表 GitHub 已收到代码，并不等于线上部署已经完成。Agent 还必须等待 Cloudflare 构建结束。

## 第六步：验证线上结果

至少检查以下内容：

1. 新文章地址返回 HTTP 200。
2. 首页或文章列表出现新文章。
3. 标签链接能够打开。
4. RSS 与 Sitemap 仍可访问。
5. Cloudflare 最新部署对应刚刚推送的 Git 提交。

如果 GitHub 已更新但线上仍是旧内容，先检查 Cloudflare 最新部署的提交号和构建状态，不要立刻重复提交或手动覆盖生产版本。

## 草稿与正式发布

不希望立刻公开时，将文章设置为：

```yaml
draft: true
```

Agent 可以提交草稿，但应在提交说明中明确标注。正式发布时，只需把它改成：

```yaml
draft: false
```

随后重新构建、提交和推送。

## 一条最重要的原则

自动化的目的不是更快地产生更多内容，而是让有价值的思想能够可靠地留下来。

Agent 可以负责整理和执行，但每一次发布都应保护这个博客的核心：**内容有来源，判断有边界，表达有个人立场，版本可以追溯。**
