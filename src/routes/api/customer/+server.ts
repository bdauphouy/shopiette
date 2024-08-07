import type { GetData, PostData } from '$lib/api/types/customer';
import { client } from '$lib/graphql/client';
import CreateCustomer from '$lib/graphql/schemas/customers/create-customer.gql';
import GetCustomer from '$lib/graphql/schemas/customers/get-customer.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const accessToken = url.searchParams.get('accessToken');

	const data = handleClientResponse(
		await client.request<GetData>(gql(GetCustomer), {
			variables: {
				accessToken
			}
		})
	);

	return json(data.customer);
};

export const POST: RequestHandler = async ({ request }) => {
	const customerData = await request.json();

	const data = handleClientResponse(
		await client.request<PostData>(gql(CreateCustomer), {
			variables: {
				input: customerData
			}
		})
	);

	return json(data.customerCreate);
};
