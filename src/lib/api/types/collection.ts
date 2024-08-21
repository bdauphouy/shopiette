import type { Collection } from '$lib/types';

export interface CollectionGetParams {
	id: string;
}

export interface CollectionGetData {
	collection: Collection;
}

export interface CollectionGetAllData {
	collections: {
		edges: {
			node: Collection;
		}[];
	};
}
