# 内容发布与入口约定

## 三类内容

- `/posts/`：`src/content/posts/*.md` 博客文章。frontmatter含title、description、date、tags、slug和draft。标签中不要使用`/`，当前标签页采用单段路由。
- `/ai-notes/`：完整HTML专题。新文件放在 `public/ai-notes/<slug>/index.html`，附带title及description；构建时自动进入专题目录并添加返回导航。普通`.html`文件同样可索引。不要把博客文章重复列作HTML专题。
- `/collection/`：`src/data/collection.mjs` 中用户提供的原文URL。链接直接打开原站，记录核查日期及可读状态；未能核验的历史链接单独分组。保留suppliedUrl，浏览地址可把Git克隆URL改为仓库阅读URL。不从生成文档的参考文献自动批量充当用户收藏。

## 完整HTML与返回

专题卡提供新标签页和当前页两种打开方式。所有专题有无需JavaScript的固定返回链接，直接打开、从消息进入或新标签页阅读时仍可返回。文档自身目录、打印和交互保留；打印时隐藏博客返回条。旧收藏路径 `/ai-notes/favorites/` 通过 `public/_redirects` 跳转到 `/collection/`；现有 `/pacs/` 和 `/pacs-review/` 重定向保持不变。

## RIS/PACS方案原稿

此次完整HTML原稿按章节边界存入 `content/ai-notes/ris-pacs-blueprint/00.html` 至 `09.html`，按文件名顺序无分隔拼接，SHA-256必须为：

`fc6ef28bc88e6dea4dcb828ce371778b38012a6a4a3a71dffe6bfbbecf182139`

分段只为可靠地导入完整原稿，不拆分页，不缩写内容。`scripts/ai-notes.mjs` 在Astro启动前核验并生成 `/ai-notes/ris-pacs-blueprint/index.html`；禁止只修改这个生成文件，否则下次构建会还原。更新该原稿需要同步源段和经核实的新校验值。其他新专题直接保存完整HTML，不必分段。

## 发布验证

从项目根目录运行 `npm run build`。现有Astro配置会准备HTML、生成站点并执行校验：栏目目录存在、首页有专题入口、每份HTML被索引、文件完整及有返回导航。缺页或校验不符则构建失败。构建成功后再检查Cloudflare Pages部署结果和线上页面；不能仅凭Git提交就声称上线。

检查 `/`、`/ai-notes/`、`/posts/`、`/collection/`、每份专题链接、新标签页与返回、移动布局及打印。原文链接核查不保证原站永久公开。持续集成工作流同时保留静态站点构建产物，供发布前核查。
