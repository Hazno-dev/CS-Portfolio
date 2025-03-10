import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import rehypeExternalLinks from 'rehype-external-links';
import icon from 'astro-icon';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://callumstables.com',
	integrations: [mdx(), sitemap(), icon({ iconDir: 'src/assets/icons' })],
	markdown: {
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					content: { type: 'text', value: ' 🔗' }
				}
			]
		]
	},
	vite: {
		plugins: [
			tailwindcss({
				applyBaseStyles: false
			})
		]
	}
});
