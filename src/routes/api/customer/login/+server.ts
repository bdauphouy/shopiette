import type { LoginPostData } from '$lib/api/types/customer';
import { client } from '$lib/graphql/client';
import LoginCustomer from '$lib/graphql/schemas/customers/login-customer.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const loginData = await request.json();

	const data = handleClientResponse(
		await client.request<LoginPostData>(gql(LoginCustomer), {
			variables: {
				input: loginData
			}
		})
	);

	return json(data.customerAccessTokenCreate);
};
