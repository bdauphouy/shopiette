import type { CollectionGetAllData } from '$lib/api/types/collection';
import { client } from '$lib/graphql/client';
import CollectionGetAll from '$lib/graphql/schemas/collection/get-all.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const data = handleClientResponse(
		await client.request<CollectionGetAllData>(gql(CollectionGetAll))
	);

	return json(data.collections);
};
