<script lang="ts">
	import { goto } from '$app/navigation';
	import { Customer } from '$lib/api/customer';
	import type { UserError } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;

	let resetErrors: UserError[] = [];

	const handleReset = async (e: SubmitEvent) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const password = formData.get('password') as string;

		const { customerUserErrors } = await Customer.reset({
			password,
			resetUrl: data.resetUrl
		});

		if (customerUserErrors?.length > 0) {
			resetErrors = customerUserErrors;

			return;
		}

		goto('/account/login');

		resetErrors = [];
	};
</script>

<form action="/" on:submit={handleReset} class="flex flex-col gap-4">
	<input name="password" type="password" placeholder="New password" />

	<button>submit</button>
	{#if resetErrors.length > 0}
		<ul class="text-md text-red-500 flex flex-col gap-2">
			{#each resetErrors as error}
				<li>{error.message}</li>
			{/each}
		</ul>
	{/if}
</form>
