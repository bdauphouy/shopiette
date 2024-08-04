import { client } from '$lib/graphql/client';
import LogoutCustomer from '$lib/graphql/schemas/customers/logout-customer.gql';
import type { UserError } from '$lib/types';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

interface GetData {
	customerAccessTokenDelete: {
		deletedAccessToken: string;
		deletedCustomerAccessTokenId: string;
		userErrors: UserError[];
	};
}

export const GET: RequestHandler = async ({ url }) => {
	const accessToken = url.searchParams.get('accessToken');

	const data = handleClientResponse(
		await client.request<GetData>(gql(LogoutCustomer), {
			variables: {
				accessToken
			}
		})
	);

	return json(data);
};
