import { Collection } from '$lib/api/collection';
import { Product } from '$lib/api/product';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const products = await Product.getAll();
	const collections = await Collection.getAll();

	return {
		products: products.edges.map(({ node }) => node),
		collections: collections.edges.map(({ node }) => node)
	};
};
