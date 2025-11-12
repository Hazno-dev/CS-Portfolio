// noinspection ES6PreferShortImport

import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import rehypeExternalLinks from 'rehype-external-links';
import icon from 'astro-icon';

import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

import { liHype } from './src/lib/hype/lihype.ts';
import { emHype } from './src/lib/hype/emhype.ts';

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
			],
			[liHype, {}],
			[emHype, {}]
		],
		optimize: {
			ignoreElementNames: ['hr']
		},
		gfm: true
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
