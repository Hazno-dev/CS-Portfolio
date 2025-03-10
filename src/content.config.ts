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
			video: z.string(),
			images: z.array(image()),
			team: z.string(),
			role: z.string(),
			platform: z.string(),
			projectInfo: z.object({
				tools: z.array(z.string()),
				contributions: z.array(
					z.object({
						title: z.string(),
						description: z.string()
					})
				)
			})
		})
});

export const collections = {
	project: projectCollection
};
