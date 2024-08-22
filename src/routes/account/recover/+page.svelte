<script lang="ts">
	import { Customer } from '$lib/api';
	import type { UserError } from '$lib/types';

	let recoverErrors: UserError[] = [];

	const handleRecover = async (e: SubmitEvent) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const email = formData.get('email') as string;

		const { customerUserErrors } = await Customer.recover({ email });

		if (customerUserErrors?.length > 0) {
			recoverErrors = customerUserErrors;

			return;
		}

		recoverErrors = [];
	};
</script>

<form action="/" on:submit={handleRecover} class="flex flex-col gap-4">
	<input name="email" type="text" placeholder="Email" />

	<button>submit</button>
	{#if recoverErrors.length > 0}
		<ul class="text-md text-red-500 flex flex-col gap-2">
			{#each recoverErrors as error}
				<li>{error.message}</li>
			{/each}
		</ul>
	{/if}
</form>

<a href="/account/recover">forgot password?</a>

<a href="/account/signup">signup</a>
