import type { RecoverPostData } from '$lib/api/types/customer';
import { client } from '$lib/graphql/client';
import RecoverCustomer from '$lib/graphql/schemas/customers/recover-customer.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { email } = await request.json();

	const data = handleClientResponse(
		await client.request<RecoverPostData>(gql(RecoverCustomer), {
			variables: {
				email
			}
		})
	);

	return json(data);
};
