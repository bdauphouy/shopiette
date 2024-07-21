import { Product } from '$lib/api/product';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const products = await Product.getAll();

	return {
		products
	};
};
