import type { Cart, UserError } from '$lib/types';

export interface CartGetProps {
	id: string;
}

export interface CartUpdateBuyerProps {
	cartId: string;
	customerAccessToken: string;
	email: string;
}

export interface CartAddLineProps {
	cartId: string;
	productVariantId: string;
	quantity: number;
}

export interface CartUpdateLinesProps {
	cartId: string;
	lines: Pick<Cart['lines']['edges'][0]['node'], 'id' | 'quantity'>[];
}

export interface CartDeleteLinesProps {
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
