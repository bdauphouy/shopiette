import type { CreatePostData } from '$lib/api/types/cart';
import { client } from '$lib/graphql/client';
import CreateCart from '$lib/graphql/schemas/cart/create-cart.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async () => {
	const data = handleClientResponse(await client.request<CreatePostData>(gql(CreateCart)));

	return json(data.cartCreate);
};
