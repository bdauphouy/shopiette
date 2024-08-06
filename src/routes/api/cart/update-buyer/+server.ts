import { client } from '$lib/graphql/client';
import UpdateBuyerCart from '$lib/graphql/schemas/cart/update-buyer-cart.gql';
import type { UserError } from '$lib/types';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

interface Data {
	cartBuyerIdentityUpdate: {
		userErrors: UserError[];
	};
}

export const POST: RequestHandler = async ({ request }) => {
	const { cartId, customerAccessToken } = await request.json();

	const data = handleClientResponse(
		await client.request<Data>(gql(UpdateBuyerCart), {
			variables: {
				cartId,
				buyerIdentity: {
					customerAccessToken
				}
			}
		})
	);

	return json(data.cartBuyerIdentityUpdate);
};
