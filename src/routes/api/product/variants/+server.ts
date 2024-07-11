import { json, type RequestHandler } from '@sveltejs/kit';
import { client } from '$lib/graphql/client';
import { gql, handleClientResponse } from '$lib/utils';
import GetProductVariants from '$lib/graphql/schemas/products/get-product-variants.gql';

interface Data {
	product: {
		id: string;
		title: string;
		description: string;
	};
}

export const GET: RequestHandler = async ({ url }) => {
	const productId = url.searchParams.get('productId');

	const data = handleClientResponse(
		await client.request<Data>(gql(GetProductVariants), {
			variables: {
				productId
			}
		})
	);

	return json(data);
};
