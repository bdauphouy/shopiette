import type {
	CustomerCreateData,
	CustomerCreateProps,
	CustomerGetData,
	CustomerGetProps,
	CustomerLoginData,
	CustomerLoginProps,
	CustomerLogoutData,
	CustomerLogoutProps,
	CustomerRecoverData,
	CustomerRecoverProps,
	CustomerResetData,
	CustomerResetProps
} from '$lib/api/types/customer';
import { Api } from './api';

export class Customer {
	static async get({ accessToken }: CustomerGetProps): Promise<CustomerGetData['customer']> {
		return Api.get(`/customer?accessToken=${accessToken}`);
	}

	static async create(
		customerData: CustomerCreateProps
	): Promise<CustomerCreateData['customerCreate']> {
		return Api.post<CustomerCreateProps>('/customer', customerData);
	}

	static async login(
		loginData: CustomerLoginProps
	): Promise<CustomerLoginData['customerAccessTokenCreate']> {
		return Api.post<CustomerLoginProps>('/customer/login', loginData);
	}

	static async logout({
		accessToken
	}: CustomerLogoutProps): Promise<CustomerLogoutData['customerAccessTokenDelete']> {
		return Api.get(`/customer/logout?accessToken=${accessToken}`);
	}

	static async recover({
		email
	}: CustomerRecoverProps): Promise<CustomerRecoverData['customerRecover']> {
		return Api.post<CustomerRecoverProps>('/customer/recover', { email });
	}

	static async reset(resetData: CustomerResetProps): Promise<CustomerResetData['customerReset']> {
		return Api.update<CustomerResetProps>('/customer/reset', resetData);
	}
}
