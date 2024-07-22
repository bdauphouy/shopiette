<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import CartLine from '$lib/components/cart-line.svelte';
	import type { Cart as TCart } from '$lib/types';
	import { formatPrice } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { PageData } from './$types';

	export let data: PageData;

	const cart = getContext<Writable<TCart | null>>('cart');

	const handleProceedToPayment = () => {
		if (!$cart?.checkoutUrl) return;

		window.location.href = $cart.checkoutUrl;
	};
</script>

{#if data.cart}
	<h2 class="font-bold text-3xl">Cart</h2>
	<table class="w-full mt-10 text-md">
		<thead>
			<tr class="text-left font-bold">
				<th class="px-6 py-4">Product</th>
				<th class="px-6 py-4">Quantity</th>
				<th class="px-6 py-4">Price</th>
			</tr>
		</thead>
		<tbody>
			{#each data.cart.lines as line, i}
				<CartLine
					background={i % 2 === 0 ? 'white' : 'gray'}
					title={line.merchandise.product.title}
					quantity={line.quantity}
					price={line.merchandise.priceV2.amount}
				/>
			{/each}
		</tbody>
	</table>
	<div class="flex flex-col gap-4 mt-10">
		<div class="flex justify-between">
			<h3 class="font-bold text-2xl">Total</h3>
			<span>{formatPrice(data.cart.cost.totalAmount.amount)}</span>
		</div>
		<Button on:click={handleProceedToPayment}>Procéder au paiement</Button>
	</div>
{/if}
