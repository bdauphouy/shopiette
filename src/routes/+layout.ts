import { Shop } from '$lib/api/shop';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const shop = await Shop.get();

	return {
		shop
	};
};
