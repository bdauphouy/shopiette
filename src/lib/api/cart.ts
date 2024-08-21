import type {
	CartAddLineData,
	CartAddLineProps,
	CartCreateData,
	CartDeleteLinesData,
	CartDeleteLinesProps,
	CartGetData,
	CartGetProps,
	CartUpdateBuyerData,
	CartUpdateBuyerProps,
	CartUpdateLinesData,
	CartUpdateLinesProps
} from '$lib/api/types/cart';
import { Api } from './api';

export class Cart {
	static async get({ id }: CartGetProps): Promise<CartGetData['cart']> {
		return Api.get(`/cart?id=${id}`);
	}

	static async create(): Promise<CartCreateData['cartCreate']> {
		return Api.post('/cart');
	}

	static async updateBuyer({
		cartId,
		customerAccessToken,
		email
	}: CartUpdateBuyerProps): Promise<CartUpdateBuyerData['cartBuyerIdentityUpdate']> {
		return Api.update<CartUpdateBuyerProps>('/cart/update-buyer', {
			cartId,
			customerAccessToken,
			email
		});
	}

	static async addLine({
		cartId,
		productVariantId,
		quantity
	}: CartAddLineProps): Promise<CartAddLineData['cartLinesAdd']> {
		return Api.post<CartAddLineProps>('/cart', {
			cartId,
			productVariantId,
			quantity
		});
	}

	static async updateLines({
		cartId,
		lines
	}: CartUpdateLinesProps): Promise<CartUpdateLinesData['cartLinesUpdate']> {
		return Api.update<CartUpdateLinesProps>('/cart/lines', {
			cartId,
			lines
		});
	}

	static async deleteLines({
		cartId,
		lineIds
	}: CartDeleteLinesProps): Promise<CartDeleteLinesData['cartLinesRemove']> {
		return Api.delete<CartDeleteLinesProps>('/cart/lines', {
			cartId,
			lineIds
		});
	}
}
