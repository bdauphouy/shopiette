import { Api } from './api';
import type { ShopGetData } from './types/shop';

export class Shop {
	static async get(): Promise<ShopGetData['shop']> {
		return Api.get('/shop');
	}
}
