<script lang="ts">
	import Icon from '@iconify/svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import type { Cart as TCart } from '$lib/types';

	const cart = getContext<Writable<TCart | null>>('cart');
</script>

<header class="flex justify-between px-20 py-10">
	<h1 class="text-xl font-bold"><a href="/">My store</a></h1>

	{#if $cart?.checkoutUrl}
		<a class="text-2xl font-bold relative" href="/cart">
			<Icon icon="solar:cart-large-minimalistic-outline" />
			{#if $cart?.quantity}
				<span
					class="absolute top-0 right-0 translate-x-3 -translate-y-2 w-5 h-5 rounded-full text-xs bg-black text-white flex justify-center items-center"
				>
					{$cart.quantity}
				</span>
			{/if}
		</a>
	{/if}
</header>
