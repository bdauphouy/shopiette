<script lang="ts">
	import { goto } from '$app/navigation';
	import { Cart, Customer } from '$lib/api';
	import type { UserError } from '$lib/types';
	import Cookies from 'js-cookie';
	import type { PageData } from './$types';

	export let data: PageData;

	let loginErrors: UserError[] = [];

	const handleLogin = async (e: SubmitEvent) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const customerData = Object.fromEntries(formData) as {
			email: string;
			password: string;
		};

		const { customerAccessToken, customerUserErrors } = await Customer.login(customerData);

		if (customerUserErrors?.length > 0 || !customerAccessToken) {
			loginErrors = customerUserErrors;

			return;
		}

		await Cart.updateBuyer({
			cartId: data.cart ? data.cart.id : '',
			customerAccessToken: customerAccessToken.accessToken,
			email: customerData.email
		});

		Cookies.set('accessToken', customerAccessToken.accessToken, { expires: 7 });

		goto('/');
	};
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			Sign in
		</h2>
	</div>
	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form on:submit={handleLogin} class="space-y-6" action="#" method="POST">
			<div>
				<label for="email" class="block text-sm font-medium leading-6 text-gray-900">
					Email address
				</label>
				<div class="mt-2">
					<input
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						required
						class="block px-3 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>
			</div>
			<div>
				<div class="flex items-center justify-between">
					<label for="password" class="block text-sm font-medium leading-6 text-gray-900">
						Password
					</label>
					<div class="text-sm">
						<a href="/account/recover" class="font-semibold text-indigo-600 hover:text-indigo-500">
							Forgot password?
						</a>
					</div>
				</div>
				<div class="mt-2">
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						class="block px-3 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>
			</div>
			<div class="flex flex-col gap-4">
				<button
					type="submit"
					class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Sign in
				</button>
				{#if loginErrors.length > 0}
					<ul class="text-sm text-red-500 flex flex-col gap-2">
						{#each loginErrors as error}
							<li>{error.message}</li>
						{/each}
					</ul>
				{/if}
			</div>
		</form>
		<p class="mt-10 text-center text-sm text-gray-500">
			You don't have account?
			<a
				href="/account/signup"
				class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign up</a
			>
		</p>
	</div>
</div>
