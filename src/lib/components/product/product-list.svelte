<script lang="ts">
	import type { Product } from '$lib/types';
	import ProductCard from './product-card.svelte';

	export let title: string;
	export let products: Omit<Product, 'variants'>[];
	export let limit: number | undefined = undefined;
	export let viewAllLink: string | undefined = undefined;
</script>

<div>
	<header class="flex items-center justify-between">
		<h2 class="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
		{#if viewAllLink && products.length > 0}
			<a href={viewAllLink} class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
				See more &RightArrow;
			</a>
		{/if}
	</header>
	<div
		class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 xl:grid-cols-5"
	>
		{#if products.length > 0}
			{#each products.slice(0, limit || products.length) as product}
				<ProductCard {product} />
			{/each}
		{:else}
			<p class="text-sm text-gray-700">No products found.</p>
		{/if}
	</div>
</div>
