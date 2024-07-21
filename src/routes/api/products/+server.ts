import { client } from '$lib/graphql/client';
import GetProducts from '$lib/graphql/schemas/products/get-products.gql';
import type { Product } from '$lib/types';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

interface Node {
	node: Product;
}

interface Data {
	products: {
		edges: Node[];
	};
}

export const GET: RequestHandler = async () => {
	const data = handleClientResponse(await client.request<Data>(gql(GetProducts)));

	return json(data.products.edges.map(({ node }) => node));
};
