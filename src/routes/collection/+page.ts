import { Collection } from '$lib/api/collection';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	const id = url.searchParams.get('id') || '';

	const collection = await Collection.get({ id });

	return {
		collection
	};
};
