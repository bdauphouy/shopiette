<script lang="ts">
	import { Cart } from '$lib/api/cart';
	import Button from '$lib/components/button.svelte';
	import CartLine from '$lib/components/cart-line.svelte';
	import type { Cart as TCart, UserError } from '$lib/types';
	import { formatPrice } from '$lib/utils';
	import Cookies from 'js-cookie';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { PageData } from './$types';

	export let data: PageData;

	const cart =
		getContext<Writable<(Pick<TCart, 'id' | 'checkoutUrl'> & { quantity: number }) | null>>('cart');

	let cartErrors: UserError[] = [];

	$: cartIsEmpty = data.cart?.lines.edges.length === 0;

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
			cartErrors = userErrors;

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

	const handleLineUpdate = async (id: string, updates: { quantity: number }) => {
		if (!$cart?.id) return;

		const { cart: ca, userErrors } = await Cart.updateLines({
			cartId: $cart.id,
			lines: [{ id, ...updates }]
		});

		if (userErrors?.length > 0) {
			cartErrors = userErrors;

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

	const handleEmptyCart = async () => {
		if (!$cart?.id || !data.cart || cartIsEmpty) return;

		const { cart: ca, userErrors } = await Cart.removeLines({
			cartId: $cart.id,
			lineIds: data.cart.lines.edges.map((line) => line.node.id)
		});

		if (userErrors?.length > 0) {
			cartErrors = userErrors;

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
	<header class="flex justify-between items-center">
		<h2 class="font-bold text-3xl">Cart</h2>
		{#if !cartIsEmpty}
			<button on:click={handleEmptyCart}>empty cart</button>
		{/if}
	</header>
	{#if !cartIsEmpty}
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
					<CartLine
						on:remove={() => handleLineRemove(line.node.id)}
						on:less={() =>
							handleLineUpdate(line.node.id, {
								quantity: line.node.quantity - 1
							})}
						on:more={() =>
							handleLineUpdate(line.node.id, {
								quantity: line.node.quantity + 1
							})}
						background={i % 2 === 0 ? 'white' : 'gray'}
						line={line.node}
					/>
				{/each}
			</tbody>
		</table>
		<div class="flex flex-col gap-4 mt-10">
			<div class="flex justify-between">
				<h3 class="font-bold text-2xl">Total</h3>
				<span>{formatPrice(data.cart.cost.totalAmount.amount)}</span>
			</div>
			{#if cartErrors.length > 0}
				<ul class="text-md text-red-500 flex flex-col gap-2">
					{#each cartErrors as error}
						<li>{error.message}</li>
					{/each}
				</ul>
			{/if}
			<Button on:click={handleProceedToPayment}>Procéder au paiement</Button>
		</div>
	{:else}
		<p class="text-lg mt-10">Your cart is empty</p>
	{/if}
{/if}
