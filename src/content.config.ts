import { z, reference, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const projectCollection = defineCollection({
	loader: glob({
		pattern: '**/[^_]*.{md,mdx}',
		base: './src/content/projects'
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			dateStart: z.date(),
			dateEnd: z.optional(z.date().nullable()),
			tags: z.array(z.string()),
			team: z.string().optional(),
			studio: z
				.object({
					name: z.string(),
					logo: z.preprocess((val) => './media/' + val, image()).optional(),
					link: z.string().optional(),
					dateStart: z.optional(z.date().nullable()),
					dateEnd: z.optional(z.date().nullable())
				})
				.optional(),
			role: z.string(),
			platforms: z
				.array(
					z.object({
						platform: z.string(),
						title: z.string(),
						link: z.string()
					})
				)
				.optional(),
			projectInfo: z.object({
				languages: z.array(z.string()).optional(),
				tools: z.array(z.string()),
				contributions: z.array(z.string())
			}),
			meta: z.object({
				visible: z.boolean(),
				professional: z.boolean(),
				type: z.enum(['professional', 'personal_highlight', 'personal_card']),
				externalReferral: z.string().optional(),
				hasPage: z.boolean().optional()
			})
		})
});

const projectMedia = defineCollection({
	loader: glob({
		pattern: '**/**/media.json',
		base: './src/content/projects'
	}),
	schema: ({ image }) =>
		z.object({
			cover: z.preprocess((val) => './media/' + val, image()),
			logo: z.preprocess((val) => './media/' + val, image()).optional(),
			videos: z.array(
				z.object({
					src: z.string(),
					alt: z.string(),
					thumbnail: z.preprocess((val) => './media/' + val, image()).optional()
				})
			),
			images: z.array(
				z.object({
					src: z.preprocess((val) => './media/' + val, image()),
					alt: z.string(),
					hidden: z.boolean().optional()
				})
			)
		})
});

export const collections = {
	project: projectCollection,
	media: projectMedia
};
