import type { CustomerLoginData } from '$lib/api/types/customer';
import { client } from '$lib/graphql/client';
import CustomerLogin from '$lib/graphql/schemas/customer/login.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const loginData = await request.json();

	const data = handleClientResponse(
		await client.request<CustomerLoginData>(gql(CustomerLogin), {
			variables: {
				input: loginData
			}
		})
	);

	return json(data.customerAccessTokenCreate);
};
