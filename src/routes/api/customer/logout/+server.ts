import type { CustomerLogoutData } from '$lib/api/types/customer';
import { client } from '$lib/graphql/client';
import CustomerLogout from '$lib/graphql/schemas/customer/logout.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const accessToken = url.searchParams.get('accessToken');

	const data = handleClientResponse(
		await client.request<CustomerLogoutData>(gql(CustomerLogout), {
			variables: {
				accessToken
			}
		})
	);

	return json(data.customerAccessTokenDelete);
};
