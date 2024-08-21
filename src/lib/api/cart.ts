import type {
	CartAddLineData,
	CartAddLineParams,
	CartCreateData,
	CartDeleteLinesData,
	CartDeleteLinesParams,
	CartGetData,
	CartGetParams,
	CartUpdateBuyerData,
	CartUpdateBuyerParams,
	CartUpdateLinesData,
	CartUpdateLinesParams
} from '$lib/api/types/cart';
import { Api } from './api';

export class Cart {
	static async get({ id }: CartGetParams): Promise<CartGetData['cart']> {
		return Api.get(`/cart?id=${id}`);
	}

	static async create(): Promise<CartCreateData['cartCreate']> {
		return Api.post('/cart');
	}

	static async updateBuyer({
		cartId,
		customerAccessToken,
		email
	}: CartUpdateBuyerParams): Promise<CartUpdateBuyerData['cartBuyerIdentityUpdate']> {
		return Api.put<CartUpdateBuyerParams>('/cart/update-buyer', {
			cartId,
			customerAccessToken,
			email
		});
	}

	static async addLine({
		cartId,
		productVariantId,
		quantity = 1
	}: CartAddLineParams): Promise<CartAddLineData['cartLinesAdd']> {
		return Api.post<CartAddLineParams>('/cart', {
			cartId,
			productVariantId,
			quantity
		});
	}

	static async updateLines({
		cartId,
		lines
	}: CartUpdateLinesParams): Promise<CartUpdateLinesData['cartLinesUpdate']> {
		return Api.put<CartUpdateLinesParams>('/cart/lines', {
			cartId,
			lines
		});
	}

	static async deleteLines({
		cartId,
		lineIds
	}: CartDeleteLinesParams): Promise<CartDeleteLinesData['cartLinesRemove']> {
		return Api.delete<CartDeleteLinesParams>('/cart/lines', {
			cartId,
			lineIds
		});
	}
}
