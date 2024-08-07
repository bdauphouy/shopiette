import type { ProductsGetData } from '$lib/api/types/search';
import { client } from '$lib/graphql/client';
import GetProducts from '$lib/graphql/schemas/search/get-products.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('query');
	const first = url.searchParams.get('first');

	const data = handleClientResponse(
		await client.request<ProductsGetData>(gql(GetProducts), {
			variables: {
				query,
				first: first && parseInt(first)
			}
		})
	);

	return json(data);
};
