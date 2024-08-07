import type { RemoveLinesPostData } from '$lib/api/types/cart';
import { client } from '$lib/graphql/client';
import RemoveLinesCart from '$lib/graphql/schemas/cart/remove-lines-cart.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { cartId, lineIds } = await request.json();

	const data = handleClientResponse(
		await client.request<RemoveLinesPostData>(gql(RemoveLinesCart), {
			variables: {
				cartId,
				lineIds
			}
		})
	);

	return json(data.cartLinesRemove);
};
