import type { CartCreateData, CartGetData } from '$lib/api/types/cart';
import { client } from '$lib/graphql/client';
import CartCreate from '$lib/graphql/schemas/cart/create.gql';
import GetCart from '$lib/graphql/schemas/cart/get.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get('id');

	const data = handleClientResponse(
		await client.request<CartGetData>(gql(GetCart), {
			variables: {
				id
			}
		})
	);

	return json(data.cart);
};

export const POST: RequestHandler = async () => {
	const data = handleClientResponse(await client.request<CartCreateData>(gql(CartCreate)));

	return json(data.cartCreate);
};
