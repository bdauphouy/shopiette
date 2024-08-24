import { Cart, Customer, Menu, Shop } from '$lib/api';
import type { Cart as TCart, Customer as TCustomer } from '$lib/types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const shop = await Shop.get();
	const menu = await Menu.get({ handle: 'main-menu' });

	let cart: TCart | null = null;
	let customer: TCustomer | null = null;

	const cartRawCookie = cookies.get('cart');

	if (cartRawCookie) {
		const { id } = JSON.parse(cartRawCookie);

		cart = await Cart.get({ id });

		if (cart.lines.edges.length > 0) {
			const outOfStockLines = cart.lines.edges.filter(({ node }) => node.quantity === 0);

			if (outOfStockLines.length > 0) {
				for (const {
					node: { id }
				} of outOfStockLines) {
					const { cart: ca } = await Cart.deleteLines({
						cartId: cart.id,
						lineIds: [id]
					});

					cart = ca;
				}
			}
		}
	}

	const accessToken = cookies.get('accessToken');

	if (accessToken) {
		customer = await Customer.get({ accessToken });
	}

	return {
		shop,
		menu,
		cart,
		customer
	};
};
