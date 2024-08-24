<script lang="ts">
	import { goto } from '$app/navigation';
	import { Customer } from '$lib/api';
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

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			Reset your password
		</h2>
	</div>
	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form on:submit={handleReset} class="space-y-6" action="#" method="POST">
			<div>
				<label for="password" class="block text-sm font-medium leading-6 text-gray-900">
					New password
				</label>
				<div class="mt-2">
					<input
						id="password"
						name="password"
						type="password"
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
					Change password
				</button>
				{#if resetErrors.length > 0}
					<ul class="text-sm text-red-500 flex flex-col gap-2">
						{#each resetErrors as error}
							<li>{error.message}</li>
						{/each}
					</ul>
				{/if}
			</div>
		</form>
	</div>
</div>
