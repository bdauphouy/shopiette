export type Product = {
	id: string;
	title: string;
	description: string;
	totalInventory: number;
	featuredImage: {
		url: string;
	};
	priceRange: {
		maxVariantPrice: {
			amount: string;
		};
		minVariantPrice: {
			amount: string;
		};
	};
	variants: ProductVariant[];
};

export type Cart = {
	id: string;
	checkoutUrl: string;
	cost?: {
		totalAmount: {
			amount: string;
		};
	};
	quantity?: number;
};

export type CartItem = {
	id: string;
	quantity: number;
	merchandise: ProductVariant;
};

export type Image = {
	originalSrc: string;
	altText: string;
};

export type ProductVariant = {
	id: string;
	title: string;
	availableForSale: boolean;
	priceV2: {
		amount: string;
	};
	selectedOptions: {
		name: string;
		value: string;
	}[];
	product: {
		id: string;
		title: string;
		description: string;
		images: {
			edges: {
				node: Image;
			}[];
		};
	};
};

export type UserError = {
	field: string;
	message: string;
};

export type Customer = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
};
