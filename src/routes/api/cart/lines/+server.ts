import type {
	CartAddLineData,
	CartDeleteLinesData,
	CartUpdateLinesData
} from '$lib/api/types/cart';
import { client } from '$lib/graphql/client';
import CartAddLine from '$lib/graphql/schemas/cart/lines/add.gql';
import CartDeleteLines from '$lib/graphql/schemas/cart/lines/delete.gql';
import CartUpdateLines from '$lib/graphql/schemas/cart/lines/update.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { cartId, productVariantId, quantity } = await request.json();

	if (!cartId) return error(400, 'Missing cartId');

	const data = handleClientResponse(
		await client.request<CartAddLineData>(gql(CartAddLine), {
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

export const PUT: RequestHandler = async ({ request }) => {
	const { cartId, lines } = await request.json();

	const data = handleClientResponse(
		await client.request<CartUpdateLinesData>(gql(CartUpdateLines), {
			variables: {
				cartId,
				lines
			}
		})
	);

	return json(data.cartLinesUpdate);
};

export const DELETE: RequestHandler = async ({ request }) => {
	const { cartId, lineIds } = await request.json();

	const data = handleClientResponse(
		await client.request<CartDeleteLinesData>(gql(CartDeleteLines), {
			variables: {
				cartId,
				lineIds
			}
		})
	);

	return json(data.cartLinesRemove);
};
