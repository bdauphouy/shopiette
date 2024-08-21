import type { Product } from '$lib/types';

export interface SearchGetProductsParams {
	query: string;
	first: number;
}

export interface SearchGetProductsData {
	search: {
		edges: {
			node: Pick<Product, 'id' | 'title' | 'featuredImage'>;
		}[];
	};
}
