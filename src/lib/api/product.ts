import type { GetProps, ProductGetData, ProductsGetData } from '$lib/api/types/product';
import { Api } from './api';

export class Product {
	static async get({ id }: GetProps): Promise<ProductGetData['product']> {
		return Api.get(`/product?id=${id}`);
	}

	static async getAll(): Promise<ProductsGetData['products']> {
		return Api.get('/products');
	}
}
