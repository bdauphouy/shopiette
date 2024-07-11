import { json, type RequestHandler } from '@sveltejs/kit';
import { client } from '$lib/graphql/client';
import { gql, handleClientResponse } from '$lib/utils';
import GetProducts from '$lib/graphql/schemas/products/get-products.gql';

interface Node {
	node: {
		id: string;
		title: string;
		description: string;
		totalInventory: number;
		featuredImage: {
			url: string;
		};
	};
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
