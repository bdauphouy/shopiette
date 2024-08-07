import type { GetData } from '$lib/api/types/shop';
import { client } from '$lib/graphql/client';
import GetShop from '$lib/graphql/schemas/shop/get-shop.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const data = handleClientResponse(await client.request<GetData>(gql(GetShop)));

	return json(data.shop);
};
