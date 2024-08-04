import { client } from '$lib/graphql/client';
import CreateCustomer from '$lib/graphql/schemas/customers/create-customer.gql';
import GetCustomer from '$lib/graphql/schemas/customers/get-customer.gql';
import type { UserError } from '$lib/types';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

interface GetData {
	customer: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	};
}

interface PostData {
	customerCreate: {
		customer: {
			id: string;
			firstName: string;
			lastName: string;
			email: string;
		};
		customerUserErrors: UserError[];
	};
}

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

	return json({
		customer: data.customerCreate.customer,
		userErrors: data.customerCreate.customerUserErrors
	});
};
