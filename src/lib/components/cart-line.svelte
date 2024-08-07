<script lang="ts">
	import type { Cart as TCart } from '$lib/types';
	import { formatPrice } from '$lib/utils';
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let background: 'white' | 'gray' = 'white';
	export let title: string;
	export let quantity: number;
	export let price: string;

	const dispatch = createEventDispatcher();
	const cart =
		getContext<Writable<(Pick<TCart, 'id' | 'checkoutUrl'> & { quantity: number }) | null>>('cart');

	const handleRemove = () => dispatch('remove');

	const handleLess = () => {};

	const handleMore = () => {};
</script>

<tr class:bg-gray-100={background === 'gray'}>
	<td class="px-6 py-4 rounded-l-lg">{title}</td>
	<td class="px-6 py-4">
		<button on:click={handleMore} class="px-4">-</button>
		{quantity}
		<button on:click={handleLess} class="px-4">+</button>
	</td>
	<td class="px-6 py-4 rounded-r-lg">{formatPrice(price)}</td>
	<td class="px-6 py-4 rounded-r-lg">
		<button on:click={handleRemove}>remove</button>
	</td>
</tr>
