export type Product = {
	id: string;
	title: string;
	description: string;
	totalInventory: number;
	featuredImage: Image;
	priceRange: {
		maxVariantPrice: Price;
		minVariantPrice: Price;
	};
	variants: ProductVariant[];
};

export type Cart = {
	id: string;
	checkoutUrl: string;
	cost?: {
		totalAmount: Price;
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

export type Price = {
	amount: string;
};

export type ProductVariant = {
	id: string;
	title: string;
	availableForSale: boolean;
	compareAtPrice: Price;
	price: Price;
	selectedOptions: {
		name: string;
		value: string;
	}[];
	image: Image;
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
