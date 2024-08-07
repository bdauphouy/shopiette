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
	email: string;
}

export interface UpdateLinesProps {
	cartId: string;
	lines: Pick<Cart['lines']['edges'][0]['node'], 'id' | 'quantity'>;
}

export interface RemoveLinesProps {
	cartId: string;
	lineIds: string[];
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

export interface UpdateLinesPostData {
	cartLinesUpdate: {
		cart: Cart;
		userErrors: UserError[];
	};
}

export interface RemoveLinesPostData {
	cartLinesRemove: {
		cart: Cart;
		userErrors: UserError[];
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
