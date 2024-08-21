import type { ShopGetData } from '$lib/api/types/shop';
import { client } from '$lib/graphql/client';
import ShopGet from '$lib/graphql/schemas/shop/get.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const data = handleClientResponse(await client.request<ShopGetData>(gql(ShopGet)));

	return json(data.shop);
};
