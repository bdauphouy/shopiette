<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Cart } from '$lib/api';
	import Button from '$lib/components/button.svelte';
	import CartLine from '$lib/components/cart-line.svelte';
	import type { UserError } from '$lib/types';
	import { formatPrice } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	let cartErrors: UserError[] = [];

	$: cartIsEmpty = data.cart && data.cart.lines.edges.length === 0;

	const handleProceedToPayment = () => {
		if (!data.cart) return;

		window.location.href = data.cart.checkoutUrl;

		invalidateAll();
	};

	const handleLineRemove = async (id: string) => {
		if (!data.cart) return;

		const { userErrors } = await Cart.deleteLines({
			cartId: data.cart.id,
			lineIds: [id]
		});

		if (userErrors?.length > 0) {
			cartErrors = userErrors;

			return;
		}

		invalidateAll();
	};

	const handleLineUpdate = async (id: string, updates: { quantity: number }) => {
		if (!data.cart) return;

		const { userErrors } = await Cart.updateLines({
			cartId: data.cart.id,
			lines: [{ id, ...updates }]
		});

		if (userErrors?.length > 0) {
			cartErrors = userErrors;

			return;
		}

		invalidateAll();
	};

	const handleEmptyCart = async () => {
		if (!data.cart || cartIsEmpty) return;

		const { userErrors } = await Cart.deleteLines({
			cartId: data.cart.id,
			lineIds: data.cart.lines.edges.map((line) => line.node.id)
		});

		if (userErrors?.length > 0) {
			cartErrors = userErrors;

			return;
		}

		invalidateAll();
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
