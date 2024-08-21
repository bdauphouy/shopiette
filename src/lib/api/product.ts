import type { ProductGetAllData, ProductGetData, ProductGetProps } from '$lib/api/types/product';
import { Api } from './api';

export class Product {
	static async get({ id }: ProductGetProps): Promise<ProductGetData['product']> {
		return Api.get(`/product?id=${id}`);
	}

	static async getAll(): Promise<ProductGetAllData['products']> {
		return Api.get('/products');
	}
}
