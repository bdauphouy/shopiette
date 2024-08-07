import type { GetData, PostData } from '$lib/api/types/cart';
import { client } from '$lib/graphql/client';
import AddToCart from '$lib/graphql/schemas/cart/add-to-cart.gql';
import GetCart from '$lib/graphql/schemas/cart/get-cart.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { error, json, type RequestHandler } from '@sveltejs/kit';

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
	const { cartId, productVariantId, quantity } = await request.json();

	if (!cartId) return error(400, 'Missing cartId');

	const data = handleClientResponse(
		await client.request<PostData>(gql(AddToCart), {
			variables: {
				cartId,
				products: [
					{
						merchandiseId: productVariantId,
						quantity
					}
				]
			}
		})
	);

	return json(data.cartLinesAdd);
};
