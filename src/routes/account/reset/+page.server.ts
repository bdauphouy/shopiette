import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
	const resetUrl = url.searchParams.get('resetUrl') || '';

	return {
		resetUrl
	};
};
