import type { RecoverPostData } from '$lib/api/types/customer';
import { client } from '$lib/graphql/client';
import ResetCustomer from '$lib/graphql/schemas/customers/reset-customer.gql';
import { gql, handleClientResponse } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { password, resetUrl } = await request.json();

	const data = handleClientResponse(
		await client.request<RecoverPostData>(gql(ResetCustomer), {
			variables: {
				password,
				resetUrl
			}
		})
	);

	return json(data);
};
