import { error, json, type RequestHandler } from '@sveltejs/kit';
import { client } from '$lib/graphql/client';
import { gql, handleClientResponse } from '$lib/utils';
import GetCart from '$lib/graphql/schemas/cart/get-cart.gql';
import AddToCart from '$lib/graphql/schemas/cart/add-to-cart.gql';

interface Node {
	node: {
		id: string;
		merchandise: {
			id: string;
			title: string;
			product: {
				id: string;
				title: string;
				featuredImage: {
					url: string;
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
			totalAmount: {
				amount: string;
			};
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
				totalAmount: {
					amount: string;
				};
			};
		};
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

	return json(data.cart);
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

	return json(data.cartLinesAdd.cart);
};
