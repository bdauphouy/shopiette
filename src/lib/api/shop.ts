import { Api } from './api';

export class Shop {
	static async get() {
		return Api.get('/shop');
	}
}
