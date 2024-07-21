import type { Product as TProduct } from '$lib/types';
import { Api } from './api';

interface GetProps {
	id: string;
}

export class Product {
	static async get({ id }: GetProps): Promise<TProduct> {
		return Api.get(`/product?id=${id}`);
	}

	static async getAll(): Promise<TProduct[]> {
		return Api.get('/products');
	}
}
