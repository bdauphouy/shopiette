<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Cart } from '$lib/api';
	import Badge from '$lib/components/badge.svelte';
	import type { UserError } from '$lib/types';
	import { formatPrice } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	let cartErrors: UserError[] = [];
	let quantity = 1;

	$: variantsOptions = data.product.variants.edges
		.map(({ node }) => node.selectedOptions)
		.reduce<{ name: string; options: string[] }[]>((accumulator, options) => {
			options.forEach(({ name, value }) => {
				const variant = accumulator.find((variant) => variant.name === name);

				if (variant) {
					if (!variant.options.includes(value)) {
						variant.options.push(value);
					}
				} else {
					accumulator.push({ name, options: [value] });
				}
			});

			return accumulator;
		}, []);

	$: currentOptions = data.product.variants.edges[0].node.selectedOptions.map(({ value }) => value);

	$: currentVariant = data.product.variants.edges.find(({ node }) => {
		return node.selectedOptions.every(({ value }) => currentOptions.includes(value));
	})!.node;

	const handleOptionClick = (option: string, i: number) => {
		currentOptions[i] = option;
	};

	const handleAddToCart = async (event: SubmitEvent) => {
		event.preventDefault();

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

<div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
	<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1">
		<div class="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg">
			<img
				src={currentVariant.image.originalSrc}
				alt={currentVariant.image.altText}
				class="h-full w-full object-cover object-center"
			/>
		</div>
	</div>
	<div>
		<h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-4">
			{data.product.title}
		</h1>
		<div class="mt-4 lg:row-span-3 lg:mt-0">
			<h2 class="sr-only">Product information</h2>
			<div class="flex items-center gap-4">
				<span class="text-3xl tracking-tight text-gray-900">
					{formatPrice(currentVariant.price.amount)}
				</span>
				{#if currentVariant.compareAtPrice}
					<span class="text-md font-medium text-gray-400 line-through">
						{formatPrice(currentVariant.compareAtPrice.amount)}
					</span>
					<Badge>Sale</Badge>
				{/if}
			</div>
			<div class="mt-4">
				{#if currentVariant.availableForSale}
					<Badge status="success">In stock</Badge>
				{:else}
					<Badge status="error">Out of stock</Badge>
				{/if}
			</div>
			<form on:submit={handleAddToCart} class="mt-10">
				{#each variantsOptions as variantOptions, i}
					<div class="mt-6">
						<h3 class="text-sm font-medium text-gray-900">{variantOptions.name}</h3>
						<fieldset aria-label="Choose a {variantOptions.name}" class="mt-4">
							<div class="grid grid-cols-3 gap-4 sm:grid-cols-6 lg:grid-cols-4">
								{#each variantOptions.options as option}
									<label
										class="{currentOptions[i] === option
											? 'ring-2 ring-indigo-500'
											: ''} group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
									>
										<input
											on:input={() => handleOptionClick(option, i)}
											type="radio"
											name="{variantOptions.name}-choice"
											class="sr-only"
										/>
										<span>{option}</span>
									</label>
								{/each}
							</div>
						</fieldset>
					</div>
				{/each}
				<button
					type="submit"
					class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={!currentVariant.availableForSale}
				>
					Add to cart
				</button>
				{#if cartErrors.length > 0}
					<ul class="text-sm text-red-500 flex flex-col gap-2 mt-4">
						{#each cartErrors as error}
							<li class="text-sm font-medium text-red-500">{error.message}</li>
						{/each}
					</ul>
				{/if}
			</form>
		</div>
		<div class="mt-10 flex flex-col gap-4">
			<h3 class="text-sm font-medium text-gray-900">Description</h3>
			<p class="text-sm text-gray-400 leading-6">
				{data.product.description}
			</p>
		</div>
	</div>
</div>
