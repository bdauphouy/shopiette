import type { Cart, UserError } from '$lib/types';

export interface CartGetParams {
	id: string;
}

export interface CartUpdateBuyerParams {
	cartId: string;
	customerAccessToken: string;
	email: string;
}

export interface CartAddLineParams {
	cartId: string;
	productVariantId: string;
	quantity: number;
}

export interface CartUpdateLinesParams {
	cartId: string;
	lines: Pick<Cart['lines']['edges'][0]['node'], 'id' | 'quantity'>[];
}

export interface CartDeleteLinesParams {
	cartId: string;
	lineIds: string[];
}

export interface CartGetData {
	cart: Cart;
}

export interface CartCreateData {
	cartCreate: {
		cart: Pick<Cart, 'id' | 'checkoutUrl'>;
	};
}

export interface CartAddLineData {
	cartLinesAdd: {
		cart: Cart;
		userErrors: UserError[];
	};
}

export interface CartUpdateBuyerData {
	cartBuyerIdentityUpdate: {
		userErrors: UserError[];
	};
}

export interface CartUpdateLinesData {
	cartLinesUpdate: {
		cart: Cart;
		userErrors: UserError[];
	};
}

export interface CartDeleteLinesData {
	cartLinesRemove: {
		cart: Cart;
		userErrors: UserError[];
	};
}
