<script lang="ts">
	import { Customer } from '$lib/api';
	import type { UserError } from '$lib/types';

	let recoverErrors: UserError[] = [];
	let displayConfirmMessage = false;

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

		displayConfirmMessage = true;

		recoverErrors = [];
	};
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			Recover your password
		</h2>
	</div>
	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form on:submit={handleRecover} class="space-y-6" action="#" method="POST">
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
			<div class="flex flex-col gap-4">
				<button
					type="submit"
					class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Send email
				</button>
				{#if recoverErrors.length > 0}
					<ul class="text-sm text-red-500 flex flex-col gap-2">
						{#each recoverErrors as error}
							<li>{error.message}</li>
						{/each}
					</ul>
				{/if}
			</div>
		</form>
		<p class="mt-10 text-center text-sm text-gray-500">
			We are going to send you an email with a reset url.
		</p>
		{#if displayConfirmMessage}
			<div class="mt-4 bg-green-50 p-4 rounded-md">
				<p class="text-sm text-green-800">Email sent! Check your mail box.</p>
			</div>
		{/if}
	</div>
</div>
