import { Cart } from '$lib/api/cart';
import type { Cart as TCart } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const rawCartCookie = cookies.get('cart');

	if (!rawCartCookie) return { cart: null };

	const { id } = JSON.parse(rawCartCookie) as Pick<TCart, 'id'>;

	const cart = await Cart.get({ id });

	return {
		cart
	};
};
