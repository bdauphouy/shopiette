<script lang="ts">
	import Icon from '@iconify/svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import type { Shop, Cart as TCart } from '$lib/types';

	export let shop: Shop;

	const cart = getContext<Writable<(Omit<TCart, 'lines'> & { quantity: number }) | null>>('cart');
</script>

<header class="flex justify-between px-40 py-10">
	<h1 class="text-xl font-bold"><a href="/">{shop.name}</a></h1>

	<ul class="text-2xl font-bold flex gap-4 items-center">
		<li>
			<a href="/account">
				<Icon icon="solar:user-rounded-linear" />
			</a>
		</li>
		{#if $cart?.checkoutUrl}
			<li>
				<a class="relative" href="/cart">
					<Icon icon="solar:cart-large-minimalistic-outline" />
					{#if $cart?.quantity}
						<span
							class="absolute top-0 right-0 translate-x-3 -translate-y-2 w-5 h-5 rounded-full text-xs bg-black text-white flex justify-center items-center"
						>
							{$cart.quantity}
						</span>
					{/if}
				</a>
			</li>
		{/if}
	</ul>
</header>
