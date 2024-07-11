import { json, type RequestHandler } from '@sveltejs/kit';
import { client } from '$lib/graphql/client';
import { gql, handleClientResponse } from '$lib/utils';
import GetProduct from '$lib/graphql/schemas/products/get-product.gql';

interface Data {
	product: {
		id: string;
		title: string;
		description: string;
	};
}

export const GET: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get('id');

	const data = handleClientResponse(
		await client.request<Data>(gql(GetProduct), {
			variables: {
				id
			}
		})
	);

	return json(data.product);
};
