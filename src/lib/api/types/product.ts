import type { Product } from '$lib/types';

export interface ProductGetParams {
	id: string;
}

export interface ProductGetData {
	product: Product;
}

export interface ProductGetAllData {
	products: {
		edges: {
			node: Omit<Product, 'variant'>;
		}[];
	};
}
