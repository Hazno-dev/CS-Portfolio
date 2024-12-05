import { z, defineCollection } from 'astro:content';

const projectCollection = defineCollection({
	type: 'data',
	schema: ({ image }) => z.object({
		visible: z.boolean(),
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		cover: image().refine((img) => img.width >= 1080, {
			message: "Cover image must be at least 1080 pixels wide!",
		}),
		team: z.string(),
		role: z.string(),
		platform: z.string(),
		tools: z.string()
	}),
});

export const collections = {
	project: projectCollection
};
