<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Cart } from '$lib/api';
	import Button from '$lib/components/button.svelte';
	import type { UserError } from '$lib/types';
	import { formatPrice } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	let cartErrors: UserError[] = [];
	let quantity = 1;

	$: currentVariant = data.product.variants.edges[0].node;
	$: isVariant = currentVariant.title !== 'Default Title';

	const handleLess = () => {
		if (quantity === 1) return;

		quantity--;
	};

	const handleMore = () => {
		quantity++;
	};

	const handleCartAdd = async () => {
		if (!data.cart) return;

		const { userErrors } = await Cart.addLine({
			cartId: data.cart.id,
			productVariantId: currentVariant.id,
			quantity
		});

		if (userErrors?.length > 0) {
			cartErrors = userErrors;

			return;
		}

		invalidateAll();

		cartErrors = [];
	};
</script>

<div class="grid grid-cols-3 gap-10">
	<div class="col-start-1 col-end-3 grid grid-cols-1 gap-5">
		<img src={currentVariant.image.originalSrc} alt={data.product.title} />
	</div>
	<div class="col-start-3 col-end-4 flex flex-col gap-10">
		<div class="flex flex-col gap-4">
			<h2 class="text-4xl font-bold">{data.product.title}</h2>
			{#if isVariant}
				<h3 class="text-2xl">{currentVariant.title}</h3>
			{/if}
			{#if currentVariant.availableForSale}
				<span class="text-md bg-green-700 text-white self-start rounded-full px-4 py-1">
					In stock
				</span>
			{:else}
				<span class="text-md bg-orange-400 text-white self-start rounded-full px-4 py-1">
					Out of stock
				</span>
			{/if}
			<h4 class="text-xl">
				{#if currentVariant.compareAtPrice}
					<span class="line-through">{formatPrice(currentVariant.compareAtPrice.amount)}</span>
				{/if}
				{formatPrice(currentVariant.price.amount)}
			</h4>
			{#if isVariant}
				<ul class="flex items-center gap-2 text-md">
					{#each data.product.variants.edges as { node: variant }}
						<li>
							<button
								on:click={() => (currentVariant = variant)}
								class="border-2 border-solid border-black rounded-lg px-6 py-2 {currentVariant.title ===
								variant.title
									? 'bg-black text-white'
									: 'bg-white text-black'}"
							>
								{variant.title}
							</button>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
		<div>
			<button on:click={handleLess} class="px-4">-</button>
			{quantity}
			<button on:click={handleMore} class="px-4">+</button>
		</div>
		<div class="flex flex-col gap-4">
			<Button disabled={data.product.totalInventory === 0} on:click={handleCartAdd}>
				Ajouter au panier
			</Button>
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
