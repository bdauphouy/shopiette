import type { Product } from '$lib/types';

export interface SearchGetProductsProps {
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
