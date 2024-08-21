import type { CustomerRecoverData } from '$lib/api/types/customer';
import { client } from '$lib/graphql/client';
import CustomerRecover from '$lib/graphql/schemas/customer/recover.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { email } = await request.json();

	const data = handleClientResponse(
		await client.request<CustomerRecoverData>(gql(CustomerRecover), {
			variables: {
				email
			}
		})
	);

	return json(data);
};
