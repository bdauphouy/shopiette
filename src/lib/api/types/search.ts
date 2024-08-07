import type { Product } from '$lib/types';

export interface GetProps {
	query: string;
	first: number;
}

export interface ProductsGetData {
	search: {
		edges: {
			node: Pick<Product, 'id' | 'title' | 'featuredImage'>;
		}[];
	};
}
