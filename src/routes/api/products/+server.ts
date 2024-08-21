import type { ProductGetAllData } from '$lib/api/types/product';
import { client } from '$lib/graphql/client';
import ProductGetAll from '$lib/graphql/schemas/product/get-all.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const data = handleClientResponse(await client.request<ProductGetAllData>(gql(ProductGetAll)));

	return json(data.products);
};
