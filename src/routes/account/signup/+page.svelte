<script lang="ts">
	import { goto } from '$app/navigation';
	import { Customer } from '$lib/api/customer';
	import type { UserError } from '$lib/types';

	let signupErrors: UserError[] = [];

	const handleSignup = async (e: SubmitEvent) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const customerData = Object.fromEntries(formData) as {
			firstName: string;
			lastName: string;
			email: string;
			password: string;
		};

		const { customerUserErrors } = await Customer.create(customerData);

		if (customerUserErrors.length > 0) {
			signupErrors = customerUserErrors;

			return;
		}

		goto('/account/login');

		signupErrors = [];
	};
</script>

<form action="/" on:submit={handleSignup} class="flex flex-col gap-4">
	<input name="firstName" type="text" placeholder="Firstname" />
	<input name="lastName" type="text" placeholder="Lastname" />
	<input name="email" type="text" placeholder="Email" />
	<input name="password" type="password" placeholder="Password" />

	<button>submit</button>
	{#if signupErrors.length > 0}
		<ul class="text-md text-red-500 flex flex-col gap-2">
			{#each signupErrors as error}
				<li>{error.message}</li>
			{/each}
		</ul>
	{/if}
</form>
