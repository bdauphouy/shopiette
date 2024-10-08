import type { SearchGetProductsData, SearchGetProductsParams } from '$lib/api/types/search';
import { Api } from '.';

export default class Search {
	static async getProducts({
		query,
		first = 5
	}: SearchGetProductsParams): Promise<SearchGetProductsData> {
		return Api.get(`/search?query=${query}&first=${first}`);
	}
}
