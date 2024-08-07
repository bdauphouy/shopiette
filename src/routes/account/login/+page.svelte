<script lang="ts">
	import { goto } from '$app/navigation';
	import { Cart } from '$lib/api/cart';
	import { Customer } from '$lib/api/customer';
	import type { Cart as TCart, UserError } from '$lib/types';
	import Cookies from 'js-cookie';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let cart = getContext<Writable<(Omit<TCart, 'lines'> & { quantity: number }) | null>>('cart');
	let accessToken = getContext<Writable<string | null>>('accessToken');

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

		if (customerUserErrors?.length > 0) {
			loginErrors = customerUserErrors;

			return;
		}

		const { accessToken: token } = customerAccessToken;

		await Cart.updateBuyer({
			cartId: $cart?.id || '',
			customerAccessToken: token,
			email: customerData.email
		});

		accessToken.set(token);

		Cookies.set('accessToken', token, { expires: 7 });

		goto('/');

		loginErrors = [];
	};
</script>

<form action="/" on:submit={handleLogin} class="flex flex-col gap-4">
	<input name="email" type="text" placeholder="Email" />
	<input name="password" type="password" placeholder="Password" />

	<button>submit</button>
	{#if loginErrors.length > 0}
		<ul class="text-md text-red-500 flex flex-col gap-2">
			{#each loginErrors as error}
				<li>{error.message}</li>
			{/each}
		</ul>
	{/if}
</form>

<a href="/account/recover">forgot password?</a>

<a href="/account/signup">signup</a>
