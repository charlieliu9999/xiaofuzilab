<claude-mem-context>
# Memory Context

# [blog] recent context, 2026-07-11 11:44pm GMT+8

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 3 obs (1,205t read) | 16,717t work | 93% savings

### Jul 11, 2026
5588 11:01p 🔵 Cloudflare Pages Deployment Initiated for Blog Project at /Users/charlieliu/CodeBuddy/20260711005018/blog
5589 " 🔵 Blog Project Environment Audit — Astro Framework, GitHub Remote, Wrangler Not Installed
5590 11:02p 🔵 Cloudflare Auth Failure Root Cause — Non-Interactive Environment Blocks wrangler login

Access 17k tokens of past work via get_observations([IDs]) or mem-search skill.
</claude-mem-context>

# Blog publishing instructions

This is an Astro blog deployed automatically from GitHub `main` to Cloudflare Pages.

## Publish an article

1. Create one Markdown file in `src/content/posts/`.
2. Include `title`, `description`, `date`, `tags`, unique `slug`, and `draft` in Frontmatter.
3. Use `draft: false` only when the content is ready for production.
4. Run `npm run build` and confirm the new `/posts/<slug>/` route is generated.
5. Stage only files belonging to the current task; preserve unrelated working-tree changes.
6. Commit and push to `origin main`. Cloudflare Pages deploys automatically.
7. Verify the new URL at `https://charlie-blog.pages.dev/posts/<slug>/` and confirm HTTP 200.

Never claim publishing succeeded based only on `git push`; wait for and verify the Cloudflare deployment.
