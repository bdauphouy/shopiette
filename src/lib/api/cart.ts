import type { CartItem } from '$lib/types';
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

export class Cart {
	static async get({ id }: GetProps): Promise<
		Cart & {
			cost: {
				totalAmount: {
					amount: string;
				};
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
}
