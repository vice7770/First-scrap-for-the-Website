import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const mainLayout = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
	}),
});

const shop = defineCollection({
	type: 'content',
	schema: z.object({
		id: z.number(), // Unique ID
		name: z.string(),
		description: z.string(),
		image:z.string(),
		price: z.number(),
		available: z.boolean(),
		created_at: z.coerce.date(),
		modified_at: z.coerce.date().optional(),
	}),
});

export const collections = { blog, mainLayout, shop };
