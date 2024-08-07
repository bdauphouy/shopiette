<script lang="ts">
	import type { Cart } from '$lib/types';
	import { formatPrice } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';

	export let background: 'gray' | 'white' = 'white';
	export let line: Cart['lines']['edges'][0]['node'];

	$: isVariant = line.merchandise.title !== 'Default Title';

	const dispatch = createEventDispatcher();

	const handleRemove = () => dispatch('remove');

	const handleLess = () => dispatch('less');

	const handleMore = () => dispatch('more');
</script>

<tr class:bg-gray-100={background === 'gray'}>
	<td class="px-6 py-4 rounded-l-lg">
		{line.merchandise.product.title}
		{isVariant ? `(${line.merchandise.title})` : ''}
	</td>
	<td class="px-6 py-4">
		<button on:click={handleLess} class="px-4">-</button>
		{line.quantity}
		<button on:click={handleMore} class="px-4">+</button>
	</td>
	<td class="px-6 py-4 rounded-r-lg">{formatPrice(line.merchandise.price.amount)}</td>
	<td class="px-6 py-4 rounded-r-lg">
		<button on:click={handleRemove}>remove</button>
	</td>
</tr>
