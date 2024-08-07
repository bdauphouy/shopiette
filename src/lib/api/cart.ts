import type {
	AddProps,
	CreatePostData,
	GetData,
	GetProps,
	PostData,
	RemoveLinesPostData,
	RemoveLinesProps,
	UpdateBuyerPostData,
	UpdateBuyerProps,
	UpdateLinesPostData,
	UpdateLinesProps
} from '$lib/api/types/cart';
import { Api } from './api';

export class Cart {
	static async get({ id }: GetProps): Promise<GetData['cart']> {
		return Api.get(`/cart?id=${id}`);
	}

	static async create(): Promise<CreatePostData['cartCreate']> {
		return Api.post('/cart/create');
	}

	static async add({
		cartId,
		productVariantId,
		quantity
	}: AddProps): Promise<PostData['cartLinesAdd']> {
		return Api.post<AddProps>('/cart', {
			cartId,
			productVariantId,
			quantity
		});
	}

	static async updateBuyer({
		cartId,
		customerAccessToken,
		email
	}: UpdateBuyerProps): Promise<UpdateBuyerPostData['cartBuyerIdentityUpdate']> {
		return Api.post('/cart/update-buyer', {
			cartId,
			customerAccessToken,
			email
		});
	}

	static async updateLines({
		cartId,
		lines
	}: UpdateLinesProps): Promise<UpdateLinesPostData['cartLinesUpdate']> {
		return Api.post('/cart/lines/update', {
			cartId,
			lines
		});
	}

	static async removeLines({
		cartId,
		lineIds
	}: RemoveLinesProps): Promise<RemoveLinesPostData['cartLinesRemove']> {
		return Api.post('/cart/lines/remove', {
			cartId,
			lineIds
		});
	}
}
