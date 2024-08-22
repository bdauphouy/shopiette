import type {
	CustomerCreateData,
	CustomerCreateParams,
	CustomerGetData,
	CustomerGetParams,
	CustomerLoginData,
	CustomerLoginParams,
	CustomerLogoutData,
	CustomerLogoutParams,
	CustomerRecoverData,
	CustomerRecoverParams,
	CustomerResetData,
	CustomerResetParams
} from '$lib/api/types/customer';
import { Api } from '.';

export default class Customer {
	static async get({ accessToken }: CustomerGetParams): Promise<CustomerGetData['customer']> {
		return Api.get(`/customer?accessToken=${accessToken}`);
	}

	static async create(
		customerData: CustomerCreateParams
	): Promise<CustomerCreateData['customerCreate']> {
		return Api.post<CustomerCreateParams>('/customer', customerData);
	}

	static async login(
		loginData: CustomerLoginParams
	): Promise<CustomerLoginData['customerAccessTokenCreate']> {
		return Api.post<CustomerLoginParams>('/customer/login', loginData);
	}

	static async logout({
		accessToken
	}: CustomerLogoutParams): Promise<CustomerLogoutData['customerAccessTokenDelete']> {
		return Api.get(`/customer/logout?accessToken=${accessToken}`);
	}

	static async recover({
		email
	}: CustomerRecoverParams): Promise<CustomerRecoverData['customerRecover']> {
		return Api.post<CustomerRecoverParams>('/customer/recover', { email });
	}

	static async reset(resetData: CustomerResetParams): Promise<CustomerResetData['customerReset']> {
		return Api.put<CustomerResetParams>('/customer/reset', resetData);
	}
}
