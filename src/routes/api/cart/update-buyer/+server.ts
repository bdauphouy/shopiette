import type { UpdateBuyerPostData } from '$lib/api/types/cart';
import { client } from '$lib/graphql/client';
import UpdateBuyerCart from '$lib/graphql/schemas/cart/update-buyer-cart.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { cartId, customerAccessToken, email } = await request.json();

	const data = handleClientResponse(
		await client.request<UpdateBuyerPostData>(gql(UpdateBuyerCart), {
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
