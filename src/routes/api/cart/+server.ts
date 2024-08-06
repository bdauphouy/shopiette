import { client } from '$lib/graphql/client';
import AddToCart from '$lib/graphql/schemas/cart/add-to-cart.gql';
import GetCart from '$lib/graphql/schemas/cart/get-cart.gql';
import type { Image, Price, UserError } from '$lib/types';
import { gql, handleClientResponse } from '$lib/utils';
import { error, json, type RequestHandler } from '@sveltejs/kit';

interface Node {
	node: {
		id: string;
		merchandise: {
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
	};
}

interface GetData {
	cart: {
		id: string;
		checkoutUrl: string;
		cost: {
			totalAmount: Price;
		};
		lines: {
			edges: Node[];
		};
	};
}

interface PostData {
	cartLinesAdd: {
		cart: {
			id: string;
			checkoutUrl: string;
			cost: {
				totalAmount: Price;
			};
		};
		userErrors: UserError[];
	};
}

export const GET: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get('id');

	const data = handleClientResponse(
		await client.request<GetData>(gql(GetCart), {
			variables: {
				id
			}
		})
	);

	return json({
		...data.cart,
		lines: data.cart.lines.edges.map(({ node }) => node)
	});
};

export const POST: RequestHandler = async ({ request }) => {
	const { cartId, productVariantId, productQuantity } = await request.json();

	if (!cartId) return error(400, 'Missing cartId');

	const data = handleClientResponse(
		await client.request<PostData>(gql(AddToCart), {
			variables: {
				cartId,
				products: [
					{
						merchandiseId: productVariantId,
						quantity: productQuantity
					}
				]
			}
		})
	);

	return json({
		...data.cartLinesAdd.cart,
		userErrors: data.cartLinesAdd.userErrors
	});
};
