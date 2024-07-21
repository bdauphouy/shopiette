<script lang="ts">
	import { Cart } from '$lib/api/cart';
	import Button from '$lib/components/button.svelte';
	import type { Cart as TCart, UserError } from '$lib/types';
	import { formatPrice } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { PageData } from './$types';

	export let data: PageData;

	const cart = getContext<Writable<TCart | null>>('cart');

	let cartErrors: UserError[] = [];

	const handleCartAdd = async () => {
		if (!$cart?.id) return;

		const { userErrors } = await Cart.add({
			cartId: $cart.id,
			productVariantId: variants[0].id,
			quantity: 1
		});

		if (userErrors.length > 0) {
			cartErrors = userErrors;

			return;
		}

		cartErrors = [];

		const response = await Cart.get({ id: $cart.id });

		const newCart = {
			id: $cart.id,
			checkoutUrl: $cart.checkoutUrl,
			cost: response.cost,
			quantity: response.lines.map((line) => line.quantity).reduce((a, c) => a + c, 0)
		};

		cart.set(newCart);

		localStorage.setItem('cart', JSON.stringify(newCart));
	};

	$: variants = data.product.variants;
	$: images = variants.map((variant) => variant.product.images.edges)[0];
</script>

<div class="grid grid-cols-3 gap-10">
	{#if images.length > 0}
		<div class="col-start-1 col-end-3 grid grid-cols-2 gap-5">
			{#each images as image}
				<img src={image.node.originalSrc} alt={data.product.title} />
			{/each}
		</div>
	{/if}
	<div class="col-start-3 col-end-4 flex flex-col gap-10">
		<div class="flex flex-col gap-4">
			<h2 class="text-4xl font-bold">{data.product.title}</h2>
			<h3 class="text-2xl">{formatPrice(data.product.priceRange.minVariantPrice.amount)}</h3>
		</div>
		<div class="flex flex-col gap-4">
			<Button on:click={handleCartAdd}>Ajouter au panier</Button>
			{#if cartErrors.length > 0}
				<ul class="text-md text-red-500 flex flex-col gap-2">
					{#each cartErrors as error}
						<li>{error.message}</li>
					{/each}
				</ul>
			{/if}
		</div>
		<p class="text-lg">{data.product.description}</p>
	</div>
</div>
