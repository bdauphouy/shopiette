import { Product } from '$lib/api/product';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	const id = url.searchParams.get('id') || '';

	const product = await Product.get({ id });

	return {
		product
	};
};
