import type { CartItem, Price } from '$lib/types';
import { Api } from './api';

interface GetProps {
	id: string;
}

interface CreateProps {
	id: string;
	checkoutUrl: string;
}

interface AddProps {
	cartId: string;
	productVariantId: string;
	quantity: number;
}

interface UpdateBuyerProps {
	cartId: string;
	customerAccessToken: string;
}

export class Cart {
	static async get({ id }: GetProps): Promise<
		Cart & {
			cost: {
				totalAmount: Price;
			};
			lines: CartItem[];
		}
	> {
		return Api.get(`/cart?id=${id}`);
	}

	static async create(): Promise<CreateProps> {
		return Api.post('/cart/create');
	}

	static async add({ cartId, productVariantId, quantity }: AddProps) {
		return Api.post<AddProps>('/cart', {
			cartId,
			productVariantId,
			quantity
		});
	}

	static async updateBuyer({ cartId, customerAccessToken }: UpdateBuyerProps) {
		return Api.post('/cart/update-buyer', {
			cartId,
			customerAccessToken
		});
	}
}
