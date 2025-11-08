import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import rehypeExternalLinks from 'rehype-external-links';
import icon from 'astro-icon';

import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	site: 'https://callumstables.com',
	integrations: [mdx(), sitemap(), icon({ iconDir: 'src/assets/icons' }), react()],
	markdown: {
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					content: { type: 'text', value: ' 🔗' }
				}
			]
		],
		optimize: {
			ignoreElementNames: ['hr']
		}
	},
	vite: {
		plugins: [
			tailwindcss({
				applyBaseStyles: false
			})
		]
	},
	server: {
		host: true
	}
});
