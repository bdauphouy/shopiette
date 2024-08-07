import { Customer } from '$lib/api/customer';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const accessToken = cookies.get('accessToken');

	if (!accessToken) return redirect(302, '/account/login');

	const { userErrors } = await Customer.logout({ accessToken });

	if (userErrors.length > 0) {
		return error(500, userErrors[0].message);
	}

	cookies.delete('accessToken', { path: '/' });

	return redirect(302, '/');
};
