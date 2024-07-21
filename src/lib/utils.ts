import type { ClientResponse } from '@shopify/storefront-api-client';
import { error } from '@sveltejs/kit';

interface DocumentNode {
	loc?: {
		source: {
			body: string;
		};
	};
}

export const gql = (document: DocumentNode) => {
	const query = document.loc?.source.body;

	if (!query) {
		throw new Error('No query found');
	}

	return query;
};

export const handleClientResponse = <T>({ errors, data }: ClientResponse<T>) => {
	if (errors) {
		throw error(500, JSON.stringify(errors.graphQLErrors));
	}

	if (!data) {
		throw error(404, 'Not found');
	}

	return data as T;
};

export const formatPrice = (price: string) => {
	return parseFloat(price).toFixed(2).replace('.', ',') + ' €';
};
