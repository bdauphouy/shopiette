import type { ProductsGetData } from '$lib/api/types/product';
import { client } from '$lib/graphql/client';
import GetProducts from '$lib/graphql/schemas/products/get-products.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const data = handleClientResponse(await client.request<ProductsGetData>(gql(GetProducts)));

	return json(data.products);
};
