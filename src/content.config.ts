import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const projectCollection = defineCollection({
	loader: glob({
		pattern: '**/[^_]*.{md,mdx}',
		base: './src/content/projects'
	}),
	schema: ({ image }) =>
		z.object({
			visible: z.boolean(),
			title: z.string(),
			description: z.string(),
			tags: z.array(z.string()),
			cover: image(),
			team: z.string(),
			role: z.string(),
			platform: z.string(),
			tools: z.string()
		})
});

export const collections = {
	project: projectCollection
};
