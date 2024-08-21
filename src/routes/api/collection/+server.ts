import type { CollectionGetData } from '$lib/api/types/collection';
import { client } from '$lib/graphql/client';
import CollectionGet from '$lib/graphql/schemas/collection/get.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get('id');

	const data = handleClientResponse(
		await client.request<CollectionGetData>(gql(CollectionGet), {
			variables: {
				id
			}
		})
	);

	return json(data.collection);
};
