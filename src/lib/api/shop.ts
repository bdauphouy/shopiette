import { Api } from './api';
import type { GetData } from './types/shop';

export class Shop {
	static async get(): Promise<GetData['shop']> {
		return Api.get('/shop');
	}
}
