import type { MenuGetData } from '$lib/api/types/menu';
import { client } from '$lib/graphql/client';
import MenuGet from '$lib/graphql/schemas/menu/get.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const handle = url.searchParams.get('handle');

	const data = handleClientResponse(
		await client.request<MenuGetData>(gql(MenuGet), {
			variables: {
				handle
			}
		})
	);

	return json(data.menu);
};
