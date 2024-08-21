import type { ProductGetData } from '$lib/api/types/product';
import { client } from '$lib/graphql/client';
import ProductGet from '$lib/graphql/schemas/product/get.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get('id');

	const data = handleClientResponse(
		await client.request<ProductGetData>(gql(ProductGet), {
			variables: {
				id
			}
		})
	);

	return json(data.product);
};
