import { Api } from '.';
import type { ShopGetData } from './types/shop';

export default class Shop {
	static async get(): Promise<ShopGetData['shop']> {
		return Api.get('/shop');
	}
}
