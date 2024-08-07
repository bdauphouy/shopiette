<script lang="ts">
	import { Cart } from '$lib/api/cart';
	import Button from '$lib/components/button.svelte';
	import CartLine from '$lib/components/cart-line.svelte';
	import type { Cart as TCart } from '$lib/types';
	import { formatPrice } from '$lib/utils';
	import Cookies from 'js-cookie';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { PageData } from './$types';

	export let data: PageData;

	const cart =
		getContext<Writable<(Pick<TCart, 'id' | 'checkoutUrl'> & { quantity: number }) | null>>('cart');

	const handleProceedToPayment = () => {
		if (!$cart?.checkoutUrl) return;

		window.location.href = $cart.checkoutUrl;
	};

	const handleLineRemove = async (id: string) => {
		if (!$cart?.id) return;

		const { cart: ca, userErrors } = await Cart.removeLines({
			cartId: $cart.id,
			lineIds: [id]
		});

		if (userErrors?.length > 0) {
			console.error(userErrors);

			return;
		}

		data.cart = ca;

		const newCart = {
			id: $cart.id,
			checkoutUrl: $cart.checkoutUrl,
			quantity: ca.lines.edges.map((line) => line.node.quantity).reduce((a, c) => a + c, 0)
		};

		cart.set(newCart);

		Cookies.set('cart', JSON.stringify(newCart), { expires: 7 });
	};
</script>

{#if data.cart}
	<h2 class="font-bold text-3xl">Cart</h2>
	{#if data.cart.lines.edges.length > 0}
		<table class="w-full mt-10 text-md">
			<thead>
				<tr class="text-left font-bold">
					<th class="px-6 py-4">Product</th>
					<th class="px-6 py-4">Quantity</th>
					<th class="px-6 py-4">Price</th>
				</tr>
			</thead>
			<tbody>
				{#each data.cart.lines.edges as line, i}
					{@const isVariant = line.node.merchandise.title !== 'Default Title'}
					<CartLine
						on:remove={() => handleLineRemove(line.node.id)}
						background={i % 2 === 0 ? 'white' : 'gray'}
						title="{line.node.merchandise.product.title} {isVariant
							? `(${line.node.merchandise.title})`
							: ''}"
						quantity={line.node.quantity}
						price={line.node.merchandise.price.amount}
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
	{:else}
		<p class="text-lg mt-10">Your cart is empty</p>
	{/if}
{/if}
