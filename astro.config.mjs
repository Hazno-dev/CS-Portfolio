import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import rehypeExternalLinks from 'rehype-external-links';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://callumstables.com',
	integrations: [
		tailwind({
			applyBaseStyles: false
		}),
		mdx(),
		sitemap()
	],
	markdown: {
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					content: { type: 'text', value: ' 🔗' }
				}
			],
		]
	},
});
