import { client } from '$lib/graphql/client';
import GetShop from '$lib/graphql/schemas/shop/get-shop.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

interface Data {
	shop: {
		name: string;
	};
}

export const GET: RequestHandler = async () => {
	const data = handleClientResponse(await client.request<Data>(gql(GetShop)));

	return json(data.shop);
};
