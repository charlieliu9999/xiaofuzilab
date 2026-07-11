# 部署到 Cloudflare Pages

## 步骤 1：推送到 GitHub

```bash
cd blog
git init
git add .
git commit -m "初始化博客"
git remote add origin https://github.com/charlieliu9999/blog.git
git push -u origin main
```

## 步骤 2：Cloudflare Pages 配置

1. 登录 https://dash.cloudflare.com/
2. 左侧菜单 → **Workers & Pages** → **创建** → **Pages** → **连接到 Git**
3. 选择你的 GitHub 仓库
4. 构建配置：
   - **Framework preset**: 选 `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: `22.x`
5. 点击 **保存并部署**

## 步骤 3：绑定自定义域名（可选）

1. Cloudflare Pages → 你的项目 → **自定义域**
2. 添加你的域名（如 `charlieliu.blog`）
3. 按提示配置 DNS

## 写文章

在 `src/content/posts/` 目录创建 `.md` 文件：

```markdown
---
title: "文章标题"
description: "文章摘要，会显示在列表和 SEO 中"
date: 2026-07-11
tags:
  - 标签1
  - 标签2
slug: article-slug
draft: false
---

## 正文内容
```

- `draft: true` → 草稿，不发布
- `tags` → 1-5 个标签
- `slug` → URL 中的标识符

## 本地开发

```bash
npm run dev      # 启动开发服务器 http://localhost:4321
npm run build    # 生产构建
npm run preview  # 预览构建结果
```

## 与多平台分发配合

博客构建后自动生成 RSS：`https://你的域名/rss.xml`

将这个 RSS 地址配合 Wechatsync 浏览器插件使用，可以实现：
- 博客首发 → 提取文章 → 一键同步到掘金/CSDN/知乎
- 好文章改写后 → 手动发布到头条号
