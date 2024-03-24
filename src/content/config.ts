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

const shopApi = defineCollection({
	type: 'data',
	schema: z.object({
		id: z.number(), // Unique ID
		name: z.string(),
		description: z.string(),
		public_id: z.string(),
		price: z.number(),
		created_at: z.coerce.date(),
		created_by: z.string(),
		expired: z.boolean(),
		hidden: z.boolean(),
	}),
});

export const collections = { blog, mainLayout, shop, shopApi };
