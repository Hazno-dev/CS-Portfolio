import { z, defineCollection } from 'astro:content';

const projectCollection = defineCollection({
	type: 'data',
	schema: z.object({
		visible: z.boolean(),
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		cover: z.string()
	})
});

export const collections = {
	project: projectCollection
};
