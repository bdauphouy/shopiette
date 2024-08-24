import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const accessToken = cookies.get('accessToken');

	if (!accessToken) return redirect(302, '/account/login');

	return {};
};
