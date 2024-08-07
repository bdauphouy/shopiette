import type { Product } from '$lib/types';

export interface GetProps {
	id: string;
}

export interface ProductGetData {
	product: Product;
}

export interface ProductsGetData {
	products: {
		edges: {
			node: Product;
		}[];
	};
}
