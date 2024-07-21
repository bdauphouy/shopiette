import { client } from '$lib/graphql/client';
import GetProduct from '$lib/graphql/schemas/products/get-product.gql';
import type { ProductVariant } from '$lib/types';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

interface Node {
	node: ProductVariant;
}

interface Data {
	product: {
		id: string;
		title: string;
		description: string;
		totalInventory: number;
		priceRange: {
			maxVariantPrice: {
				amount: string;
			};
			minVariantPrice: {
				amount: string;
			};
		};
		variants: {
			edges: Node[];
		};
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

	return json({
		...data.product,
		variants: data.product.variants.edges.map(({ node }) => node)
	});
};
