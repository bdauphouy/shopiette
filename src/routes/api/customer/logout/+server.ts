import type { LogoutGetData } from '$lib/api/types/customer';
import { client } from '$lib/graphql/client';
import LogoutCustomer from '$lib/graphql/schemas/customers/logout-customer.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const accessToken = url.searchParams.get('accessToken');

	const data = handleClientResponse(
		await client.request<LogoutGetData>(gql(LogoutCustomer), {
			variables: {
				accessToken
			}
		})
	);

	return json(data.customerAccessTokenDelete);
};
