import { Customer } from '$lib/api/customer';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const accessToken = cookies.get('accessToken');

	if (!accessToken) return redirect(302, '/account/login');

	const response = await Customer.logout({ accessToken });

	if (response.message) {
		return error(500, response.message);
	}

	cookies.delete('accessToken', { path: '/' });

	return redirect(302, '/');
};
