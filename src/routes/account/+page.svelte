<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: customer = data.customer!;
</script>

<div>
	<div class="px-4 sm:px-0 flex items-center justify-between">
		<h2 class="text-base font-semibold leading-7 text-gray-900">Account Information</h2>
		<a href="/account/logout" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
			Log out
		</a>
	</div>
	<div class="mt-6 border-t border-gray-100">
		<dl class="divide-y divide-gray-100">
			{#each Object.entries(customer) as [key, value]}
				{@const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
				{#if title !== 'Id'}
					<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt class="text-sm font-medium leading-6 text-gray-900">{title}</dt>
						<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{value}</dd>
					</div>
				{/if}
			{/each}
		</dl>
	</div>
</div>
