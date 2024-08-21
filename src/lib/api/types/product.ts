import type { Product } from '$lib/types';

export interface ProductGetProps {
	id: string;
}

export interface ProductGetData {
	product: Product;
}

export interface ProductGetAllData {
	products: {
		edges: {
			node: Product;
		}[];
	};
}
