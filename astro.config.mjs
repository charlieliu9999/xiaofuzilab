import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { prepareAiNotes, getAiNotes, aiNotesIntegration } from './scripts/ai-notes.mjs';

prepareAiNotes();
export default defineConfig({
  site: 'https://charlieliu.blog',
  integrations: [
    sitemap({ customPages: getAiNotes().map(note => new URL(note.href, 'https://charlieliu.blog').href) }),
    aiNotesIntegration(),
  ],
  markdown: { shikiConfig: { theme: 'github-dark' } },
});
