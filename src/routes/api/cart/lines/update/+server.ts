import type { UpdateLinesPostData } from '$lib/api/types/cart';
import { client } from '$lib/graphql/client';
import UpdateLinesCart from '$lib/graphql/schemas/cart/update-lines-cart.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { cartId, lines } = await request.json();

	const data = handleClientResponse(
		await client.request<UpdateLinesPostData>(gql(UpdateLinesCart), {
			variables: {
				cartId,
				lines
			}
		})
	);

	return json(data.cartLinesUpdate);
};
