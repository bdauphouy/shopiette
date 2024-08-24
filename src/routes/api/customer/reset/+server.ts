import type { CustomerResetData } from '$lib/api/types/customer';
import { client } from '$lib/graphql/client';
import CustomerReset from '$lib/graphql/schemas/customer/reset.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const PUT: RequestHandler = async ({ request }) => {
	const { password, resetUrl } = await request.json();

	const data = handleClientResponse(
		await client.request<CustomerResetData>(gql(CustomerReset), {
			variables: {
				password,
				resetUrl
			}
		})
	);

	return json(data.customerResetByUrl);
};
