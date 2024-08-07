import type { Customer, UserError } from '$lib/types';

export interface GetProps {
	accessToken: string;
}

export interface CreateProps {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface LoginProps {
	email: string;
	password: string;
}

export interface LoginPostData {
	customerAccessTokenCreate: {
		customerAccessToken: {
			accessToken: string;
		};
		customerUserErrors: UserError[];
	};
}

export interface LogoutGetData {
	customerAccessTokenDelete: {
		deletedAccessToken: string;
		deletedCustomerAccessTokenId: string;
		userErrors: UserError[];
	};
}

export interface GetData {
	customer: Customer;
}

export interface PostData {
	customerCreate: {
		customer: Customer;
		customerUserErrors: UserError[];
	};
}
