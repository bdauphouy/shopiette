import { Customer } from '$lib/api';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const accessToken = cookies.get('accessToken');

	if (!accessToken) return redirect(302, '/account/login');

	const customer = await Customer.get({ accessToken });

	if (!customer) return redirect(302, '/account/login');

	return {
		customer
	};
};
