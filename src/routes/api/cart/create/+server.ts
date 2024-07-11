import { json, type RequestHandler } from '@sveltejs/kit';
import { client } from '$lib/graphql/client';
import { gql, handleClientResponse } from '$lib/utils';
import CreateCart from '$lib/graphql/schemas/cart/create-cart.gql';

interface Data {
	cartCreate: {
		cart: {
			id: string;
			checkoutUrl: string;
		};
	};
}

export const POST: RequestHandler = async () => {
	const data = handleClientResponse(await client.request<Data>(gql(CreateCart)));

	return json(data.cartCreate.cart);
};
