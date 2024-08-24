import type { Customer, UserError } from '$lib/types';

export interface CustomerGetParams {
	accessToken: string;
}

export interface CustomerCreateParams {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface CustomerLoginParams {
	email: string;
	password: string;
}

export interface CustomerLogoutParams {
	accessToken: string;
}

export interface CustomerRecoverParams {
	email: string;
}

export interface CustomerResetParams {
	password: string;
	resetUrl: string;
}

export interface CustomerGetData {
	customer: Customer;
}

export interface CustomerCreateData {
	customerCreate: {
		customer: Customer;
		customerUserErrors: UserError[];
	};
}

export interface CustomerLoginData {
	customerAccessTokenCreate: {
		customerAccessToken?: {
			accessToken: string;
		};
		customerUserErrors: UserError[];
	};
}

export interface CustomerLogoutData {
	customerAccessTokenDelete: {
		deletedAccessToken: string;
		deletedCustomerAccessTokenId: string;
		userErrors: UserError[];
	};
}

export interface CustomerRecoverData {
	customerRecover: {
		customerUserErrors: UserError[];
	};
}

export interface CustomerResetData {
	customerReset: {
		customerUserErrors: UserError[];
	};
}
