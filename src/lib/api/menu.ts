import { Api } from '.';
import type { MenuGetData, MenuGetParams } from './types/menu';

export default class Menu {
	static async get({ handle }: MenuGetParams): Promise<MenuGetData['menu']> {
		return Api.get(`/menu?handle=${handle}`);
	}
}
