<script lang="ts">
	import type { Cart } from '$lib/types';
	import { formatPrice } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';

	export let line: Cart['lines']['edges'][0]['node'];

	const dispatch = createEventDispatcher();

	const handleNavigate = () => dispatch('navigate');

	const handleRemove = () => dispatch('remove');
</script>

<div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
	<img
		src={line.merchandise.product.featuredImage.originalSrc}
		alt={line.merchandise.product.featuredImage.altText}
		class="h-full w-full object-cover object-center"
	/>
</div>
<div class="ml-4 flex flex-1 flex-col">
	<div>
		<div class="flex justify-between text-base font-medium text-gray-900">
			<h3>
				<a on:click={handleNavigate} href="/product/?id={line.merchandise.product.id}">
					{line.merchandise.product.title}
				</a>
			</h3>
			<p class="ml-4">{formatPrice(line.cost.totalAmount.amount)}</p>
		</div>
		<p class="mt-1 text-sm text-gray-500">{line.merchandise.title}</p>
	</div>
	<div class="flex flex-1 items-end justify-between text-sm">
		<p class="text-gray-500">Qty {line.quantity}</p>
		<div class="flex">
			<button
				on:click={handleRemove}
				type="button"
				class="font-medium text-indigo-600 hover:text-indigo-500"
			>
				Remove
			</button>
		</div>
	</div>
</div>
