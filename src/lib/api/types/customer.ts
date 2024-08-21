import type { Customer, UserError } from '$lib/types';

export interface CustomerGetProps {
	accessToken: string;
}

export interface CustomerCreateProps {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface CustomerLoginProps {
	email: string;
	password: string;
}

export interface CustomerLogoutProps {
	accessToken: string;
}

export interface CustomerRecoverProps {
	email: string;
}

export interface CustomerResetProps {
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
		customerAccessToken: {
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
