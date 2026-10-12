import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// Astro bundles this helper for page rendering; import.meta.url may then point
// at dist chunks rather than source. npm/Cloudflare run from the project root.
const ROOT = process.cwd();
const PUBLIC = join(ROOT, 'public');
const NOTES = join(PUBLIC, 'ai-notes');
const known = {
  '/ai-notes/beyond-naive-rag/': {
    title: '超越简单 RAG：从相似文本检索到可验证的证据系统',
    description: '中文学习文章：证据覆盖、多种表示、推理检索、上下文干扰，以及检查推荐与标准映射的实验和自测。',
    category: '学习笔记', date: '2026-10-13', order: 4,
  },
  '/ai-notes/ris-pacs-blueprint/': {
    title: 'AI Native RIS/PACS 系统总体方案',
    description: '独立系统方案：从定义、18个功能域与72项功能，到数据架构、技术实现、部署及30项验收用例。',
    category: '独立方案', date: '2026-10-11', order: 0,
  },
  '/ai-notes/pacs-review/': {
    title: 'AI 原生影像平台 · 原文评审与建设方案',
    description: '保留原文评审、修订意见与建设思路；与独立的RIS/PACS系统总体方案分开呈现。',
    category: '评审资料', date: '2026-10-11', order: 1,
  },
  '/ai-notes/ris-pacs-market/': {
    title: 'AI Native RIS/PACS · 市场调查与市场分析',
    description: 'LLM赋能RIS/PACS+集成AI算法：两个市场分开算，升级窗口是否可行、多大空间、突破点在哪。',
    category: '商业分析', date: '2026-10-12', order: 2,
  },
  '/ai-notes/ai-agent-production/': {
    title: '从一条 Prompt 到生产级 Agent：Yarchi 长文精读',
    description: '10 种生产级 agent 方案、harness 六大件、五种常见模式、6 条共通规则与选型建议。',
    category: '学习笔记', date: '2026-10-13', order: 3,
  },
};

function htmlFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (entry.name.startsWith('.') || entry.name.startsWith('_') || entry.name === 'favorites') return [];
    const path = join(dir, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : entry.isFile() && /\.html$/i.test(entry.name) ? [path] : [];
  });
}
function text(value = '') {
  return value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
}
function meta(html, name) {
  for (const tag of html.match(/<meta\b[^>]*>/gi) || []) {
    const attrs = Object.fromEntries([...tag.matchAll(/([\w-]+)\s*=\s*(["'])(.*?)\2/g)].map(m => [m[1].toLowerCase(), m[3]]));
    if (attrs.name?.toLowerCase() === name) return text(attrs.content || '');
  }
  return '';
}

// The index is derived from actual files: adding public/ai-notes/<slug>/index.html
// automatically adds a card. Never point at a sandbox attachment or a missing page.
export function getAiNotes() {
  return htmlFiles(NOTES).filter(path => path !== join(NOTES, 'index.html')).map(path => {
    const html = readFileSync(path, 'utf8');
    if (!/<html\b/i.test(html) || !/<title\b/i.test(html)) throw new Error(`Incomplete HTML topic: ${path}`);
    const relativePath = relative(PUBLIC, path).split(sep).join('/');
    const href = '/' + relativePath.replace(/index\.html$/, '');
    const selected = known[href] || {};
    return {
      href, relativePath,
      title: selected.title || text(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]) || href,
      description: selected.description || meta(html, 'description') || '打开完整HTML专题，支持返回目录与博客。',
      category: selected.category || 'HTML 专题',
      date: selected.date || meta(html, 'date'),
      order: selected.order ?? 100,
    };
  }).sort((a, b) => a.order - b.order || b.date.localeCompare(a.date) || a.title.localeCompare(b.title, 'zh-CN'));
}

const RETURN_NAV = `\n<!-- ai-notes-site-navigation:v1 -->
<style id="ai-notes-site-nav-style">
#ai-notes-site-nav{box-sizing:border-box;position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:9999;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:5px;max-width:calc(100vw - 24px);width:max-content;padding:8px 10px;border:1px solid #cad8df;border-radius:12px;background:#fff;color:#17334a;box-shadow:0 5px 24px #18324722;font:13px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif}
#ai-notes-site-nav a{display:inline-flex;color:#17334a;text-decoration:none;padding:7px 10px;border:0;border-radius:6px;margin:0;white-space:nowrap;font-size:13px;line-height:1.5}
#ai-notes-site-nav a:first-child{background:#eaf4f3;color:#075e69;font-weight:700}
#ai-notes-site-nav a:hover{background:#e8eef4}#ai-notes-site-nav a:focus-visible{outline:3px solid #a67120;outline-offset:2px}
body{padding-bottom:88px!important}@media(max-width:540px){#ai-notes-site-nav{gap:1px;padding:6px}#ai-notes-site-nav a{font-size:12px;padding:7px 8px}.to-top{bottom:82px!important}}
@media print{#ai-notes-site-nav{display:none!important}body{padding-bottom:0!important}}
</style>
<div id="ai-notes-site-nav" role="navigation" aria-label="博客返回导航"><a href="/ai-notes/">← HTML专题</a><a href="/posts/">博客文章</a><a href="/collection/">收藏原文</a><a href="/">首页</a></div>\n`;

export function decorateHtml(html) {
  if (html.includes('id="ai-notes-site-nav"')) return html;
  if (!/<\/body>/i.test(html)) throw new Error('HTML topic has no closing body');
  return html.replace(/<\/body>/i, RETURN_NAV + '</body>');
}

export function prepareAiNotes() {
  const source = join(ROOT, 'content/ai-notes/ris-pacs-blueprint');
  const parts = Array.from({ length: 10 }, (_, i) => readFileSync(join(source, `${String(i).padStart(2, '0')}.html`)));
  const bytes = Buffer.concat(parts);
  const expected = 'fc6ef28bc88e6dea4dcb828ce371778b38012a6a4a3a71dffe6bfbbecf182139';
  if (createHash('sha256').update(bytes).digest('hex') !== expected) throw new Error('RIS/PACS snapshot checksum mismatch; do not publish a truncated document');
  const destination = join(NOTES, 'ris-pacs-blueprint/index.html');
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, decorateHtml(bytes.toString('utf8')));
  for (const note of getAiNotes()) {
    const path = join(PUBLIC, note.relativePath);
    const html = readFileSync(path, 'utf8');
    const decorated = decorateHtml(html);
    if (html !== decorated) writeFileSync(path, decorated);
  }
}

export function verifyAiNotes(outputDir) {
  const notes = getAiNotes();
  const index = readFileSync(join(outputDir, 'ai-notes/index.html'), 'utf8');
  const home = readFileSync(join(outputDir, 'index.html'), 'utf8');
  if (!home.includes('/ai-notes/')) throw new Error('Homepage is missing HTML topics entry');
  for (const path of ['posts/index.html', 'collection/index.html']) {
    if (!existsSync(join(outputDir, path))) throw new Error(`Missing content channel: ${path}`);
  }
  for (const note of notes) {
    if (!index.includes(note.href)) throw new Error(`HTML index is missing ${note.href}`);
    const html = readFileSync(join(outputDir, note.relativePath), 'utf8');
    if (!html.includes('id="ai-notes-site-nav"') || !html.includes('href="/ai-notes/"')) throw new Error(`Missing return navigation: ${note.href}`);
    if (/(?:href|src)=["'](?:sandbox:|file:)/i.test(html)) throw new Error(`Local-only URL in published topic: ${note.href}`);
  }
  return notes.length;
}

export function aiNotesIntegration() {
  return { name: 'charlie-html-topics', hooks: {
    'astro:build:done': ({ dir, logger }) => {
      const count = verifyAiNotes(fileURLToPath(dir));
      logger.info(`Verified ${count} complete HTML topics, their index and return navigation.`);
    },
  } };
}
