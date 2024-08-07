import type { Cart, UserError } from '$lib/types';

export interface GetProps {
	id: string;
}

export interface AddProps {
	cartId: string;
	productVariantId: string;
	quantity: number;
}

export interface UpdateBuyerProps {
	cartId: string;
	customerAccessToken: string;
}

export interface UpdateBuyerPostData {
	cartBuyerIdentityUpdate: {
		userErrors: UserError[];
	};
}

export interface CreatePostData {
	cartCreate: {
		cart: Pick<Cart, 'id' | 'checkoutUrl'>;
	};
}

export interface GetData {
	cart: Cart;
}

export interface PostData {
	cartLinesAdd: {
		cart: Cart;
		userErrors: UserError[];
	};
}
