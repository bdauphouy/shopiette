export type Cart = {
	id: string;
	checkoutUrl: string;
	cost: {
		totalAmount: Price;
	};
	lines: {
		edges: {
			node: {
				id: string;
				quantity: number;
				merchandise: {
					availableForSale: boolean;
					compareAtPrice: Price | null;
					id: string;
					image: Image;
					price: Price;
					product: Product;
					selectedOptions: {
						name: string;
						value: string;
					}[];
					title: string;
				};
			};
		}[];
	};
};

export type Collection = {
	id: string;
	title: string;
	description: string;
	image: Image;
	products: {
		edges: {
			node: Omit<Product, 'variants'>;
		}[];
	};
};

export type Customer = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
};

export type Image = {
	originalSrc: string;
	altText: string;
};

export type Price = {
	amount: string;
};

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
	variants: {
		edges: {
			node: {
				id: string;
				title: string;
				availableForSale: boolean;
				compareAtPrice: Price | null;
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
		}[];
	};
};

export type Shop = {
	name: string;
	brand: {
		logo: {
			image: Image;
		};
	};
};

export type UserError = {
	field: string;
	message: string;
};
