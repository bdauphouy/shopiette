import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
	const resetUrl = url.searchParams.get('resetUrl') || '';

	if (!resetUrl) return error(400, 'No reset URL provided.');

	return {
		resetUrl
	};
};
