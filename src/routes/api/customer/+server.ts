import type { CustomerCreateData, CustomerGetData } from '$lib/api/types/customer';
import { client } from '$lib/graphql/client';
import CustomerCreate from '$lib/graphql/schemas/customer/create.gql';
import CustomerGet from '$lib/graphql/schemas/customer/get.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const accessToken = url.searchParams.get('accessToken');

	const data = handleClientResponse(
		await client.request<CustomerGetData>(gql(CustomerGet), {
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
		await client.request<CustomerCreateData>(gql(CustomerCreate), {
			variables: {
				input: customerData
			}
		})
	);

	return json(data.customerCreate);
};
