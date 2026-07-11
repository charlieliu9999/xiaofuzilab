import rss from "@astrojs/rss";
import { SITE } from "../config.ts";

const posts = Object.values(
  import.meta.glob("../content/posts/*.md", { eager: true })
);

export const GET = () =>
  rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.siteUrl,
    items: posts
      .filter((p) => !p.frontmatter.draft)
      .sort(
        (a, b) =>
          new Date(b.frontmatter.date).getTime() -
          new Date(a.frontmatter.date).getTime()
      )
      .map((post) => ({
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        pubDate: post.frontmatter.date,
        link: `/posts/${post.frontmatter.slug}`,
        categories: post.frontmatter.tags || [],
      })),
    customData: `<language>${SITE.lang}</language>`,
  });
