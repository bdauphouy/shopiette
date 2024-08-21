import { Api } from './api';
import type {
	CollectionGetAllData,
	CollectionGetData,
	CollectionGetParams
} from './types/collection';

export class Collection {
	static async get({ id }: CollectionGetParams): Promise<CollectionGetData['collection']> {
		return Api.get(`/collection?id=${id}`);
	}

	static async getAll(): Promise<CollectionGetAllData['collections']> {
		return Api.get('/collections');
	}
}
