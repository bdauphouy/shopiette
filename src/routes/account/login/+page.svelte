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

		const {
			customerAccessToken: { accessToken },
			customerUserErrors
		} = await Customer.login(customerData);

		if (customerUserErrors?.length > 0) {
			loginErrors = customerUserErrors;

			return;
		}

		console.log('accessToken', accessToken);

		await Cart.updateBuyer({
			cartId: data.cart ? data.cart.id : '',
			customerAccessToken: accessToken,
			email: customerData.email
		});

		Cookies.set('accessToken', accessToken, { expires: 7 });

		goto('/');
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
