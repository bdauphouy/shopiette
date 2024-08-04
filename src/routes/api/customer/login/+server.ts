import { client } from '$lib/graphql/client';
import LoginCustomer from '$lib/graphql/schemas/customers/login-customer.gql';
import type { UserError } from '$lib/types';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

interface PostData {
	customerAccessTokenCreate: {
		customerAccessToken: {
			accessToken: string;
		};
		customerUserErrors: UserError[];
	};
}

export const POST: RequestHandler = async ({ request }) => {
	const loginData = await request.json();

	const data = handleClientResponse(
		await client.request<PostData>(gql(LoginCustomer), {
			variables: {
				input: loginData
			}
		})
	);

	return json({
		accessToken: data.customerAccessTokenCreate.customerAccessToken.accessToken,
		userErrors: data.customerAccessTokenCreate.customerUserErrors
	});
};
