import type { CartUpdateBuyerData } from '$lib/api/types/cart';
import { client } from '$lib/graphql/client';
import CartUpdateBuyer from '$lib/graphql/schemas/cart/buyer/update.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const UPDATE: RequestHandler = async ({ request }) => {
	const { cartId, customerAccessToken, email } = await request.json();

	const data = handleClientResponse(
		await client.request<CartUpdateBuyerData>(gql(CartUpdateBuyer), {
			variables: {
				cartId,
				buyerIdentity: {
					customerAccessToken,
					email
				}
			}
		})
	);

	return json(data.cartBuyerIdentityUpdate);
};
