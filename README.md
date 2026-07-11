# Charlie's Blog

个人研究博客，基于 Astro v5 构建，部署于 Cloudflare Pages。

## 功能

- ✅ Markdown 写作
- ✅ RSS 订阅
- ✅ 完善 SEO（JSON-LD + Open Graph + Twitter Card + Sitemap）
- ✅ 深色模式
- ✅ 标签系统
- ✅ 上一篇/下一篇导航
- ✅ 响应式设计

## 目录结构

```
blog/
├── src/
│   ├── content/posts/    # 文章（Markdown）
│   ├── layouts/          # 布局组件
│   ├── pages/            # 页面路由
│   ├── styles/           # 全局样式
│   └── config.ts         # 站点配置
├── public/               # 静态资源
│   └── favicon.svg
├── astro.config.mjs      # Astro 配置
└── package.json
```

## 使用方式

### 本地开发

```bash
cd blog
npm install
npm run dev
```

### 写文章

在 `src/content/posts/` 目录下创建 `.md` 文件：

```markdown
---
title: "文章标题"
description: "文章描述"
date: 2026-07-11
tags:
  - 标签1
  - 标签2
slug: article-slug
draft: false
---

## 正文内容
```

- 设置 `draft: true` 可隐藏文章（草稿）
- `slug` 用于 URL（如 `/posts/article-slug`）

### 构建

```bash
npm run build    # 生产构建
npm run preview  # 预览构建结果
```

## 部署到 Cloudflare Pages

1. Fork/上传项目到 GitHub
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages
3. 创建新项目 → 连接 Git 仓库
4. 构建设置：
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: 22.x
5. 部署

## 配置

修改 `src/config.ts` 中的站点信息：

- `title`：博客名称
- `description`：博客描述
- `author`：作者名
- `siteUrl`：网站地址
