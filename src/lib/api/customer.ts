import type {
	CreateProps,
	GetData,
	GetProps,
	LoginPostData,
	LoginProps,
	LogoutGetData,
	PostData,
	RecoverPostData,
	RecoverProps,
	ResetPostData,
	ResetProps
} from '$lib/api/types/customer';
import { Api } from './api';

export class Customer {
	static async get({ accessToken }: GetProps): Promise<GetData['customer']> {
		return Api.get(`/customer?accessToken=${accessToken}`);
	}

	static async create(customerData: CreateProps): Promise<PostData['customerCreate']> {
		return Api.post<CreateProps>('/customer', customerData);
	}

	static async login(loginData: LoginProps): Promise<LoginPostData['customerAccessTokenCreate']> {
		return Api.post<LoginProps>('/customer/login', loginData);
	}

	static async logout({
		accessToken
	}: GetProps): Promise<LogoutGetData['customerAccessTokenDelete']> {
		return Api.get(`/customer/logout?accessToken=${accessToken}`);
	}

	static async recover({ email }: RecoverProps): Promise<RecoverPostData['customerRecover']> {
		return Api.post('/customer/recover', { email });
	}

	static async reset(resetData: ResetProps): Promise<ResetPostData['customerReset']> {
		return Api.post('/customer/reset', resetData);
	}
}
