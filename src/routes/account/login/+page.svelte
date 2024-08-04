<script lang="ts">
	import { goto } from '$app/navigation';
	import { Customer } from '$lib/api/customer';
	import type { UserError } from '$lib/types';
	import Cookies from 'js-cookie';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let accessToken = getContext<Writable<string | null>>('accessToken');

	let cartErrors: UserError[] = [];

	const handleLogin = async (e: SubmitEvent) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const customerData = Object.fromEntries(formData) as {
			email: string;
			password: string;
		};

		const { accessToken: at, userErrors } = await Customer.login(customerData);

		if (userErrors.length > 0) {
			cartErrors = userErrors;

			return;
		}

		accessToken.set(at);

		Cookies.set('accessToken', at, { expires: 7 });

		goto('/');

		cartErrors = [];
	};
</script>

<form action="/" on:submit={handleLogin} class="flex flex-col gap-4">
	<input name="email" type="text" placeholder="Email" />
	<input name="password" type="password" placeholder="Password" />

	<button>submit</button>
	{#if cartErrors.length > 0}
		<ul class="text-md text-red-500 flex flex-col gap-2">
			{#each cartErrors as error}
				<li>{error.message}</li>
			{/each}
		</ul>
	{/if}
</form>
