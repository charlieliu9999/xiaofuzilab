import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { prepareAiNotes, getAiNotes, aiNotesIntegration } from './scripts/ai-notes.mjs';

prepareAiNotes();
export default defineConfig({
  site: 'https://ai-brother.cn',
  integrations: [
    sitemap({ customPages: getAiNotes().map(note => new URL(note.href, 'https://ai-brother.cn').href) }),
    aiNotesIntegration(),
  ],
  markdown: { shikiConfig: { theme: 'github-dark' } },
});
