import type { GetProps, ProductsGetData } from '$lib/api/types/search';
import { Api } from './api';

export class Search {
	static async products({ query, first }: GetProps): Promise<ProductsGetData> {
		return Api.get(`/search?query=${query}&first=${first}`);
	}
}
