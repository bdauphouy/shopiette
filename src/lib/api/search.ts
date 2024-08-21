import type { SearchGetProductsData, SearchGetProductsProps } from '$lib/api/types/search';
import { Api } from './api';

export class Search {
	static async getProducts({
		query,
		first
	}: SearchGetProductsProps): Promise<SearchGetProductsData> {
		return Api.get(`/search?query=${query}&first=${first}`);
	}
}
