import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { prepareAiNotes, getAiNotes, aiNotesIntegration } from './scripts/ai-notes.mjs';

prepareAiNotes();
export default defineConfig({
  site: 'https://blog.ai-brother.cn',
  integrations: [
    sitemap({ customPages: getAiNotes().map(note => new URL(note.href, 'https://blog.ai-brother.cn').href) }),
    aiNotesIntegration(),
  ],
  markdown: { shikiConfig: { theme: 'github-dark' } },
});
