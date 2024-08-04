import type { Customer as TCustomer } from '$lib/types';
import { Api } from './api';

interface GetProps {
	accessToken: string;
}

interface CreateProps {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

interface LoginProps {
	email: string;
	password: string;
}

export class Customer {
	static async get({ accessToken }: GetProps): Promise<TCustomer> {
		return Api.get(`/customer?accessToken=${accessToken}`);
	}

	static async create(customerData: CreateProps) {
		return Api.post<CreateProps>('/customer', customerData);
	}

	static async login(loginData: LoginProps) {
		return Api.post<LoginProps>('/customer/login', loginData);
	}

	static async logout({ accessToken }: GetProps) {
		return Api.get(`/customer/logout?accessToken=${accessToken}`);
	}
}
