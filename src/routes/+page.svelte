<script lang="ts">
	import ProductCard from '$lib/components/product-card.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ul class="mt-10 grid grid-cols-6 gap-10">
	{#each data.menu?.items as item}
		{#if item.resource?.id}
			<li>
				<a
					href="/collection?id={item.resource.id}"
					class="flex flex-col gap-4 text-xl font-bold bg-slate-200 px-6 py-4 rounded-lg"
				>
					{item.title}
				</a>
			</li>
		{/if}
	{/each}
</ul>

<h2 class="font-bold text-3xl mt-20">Products</h2>
<ul class="mt-10 grid grid-cols-6 gap-10">
	{#each data.products as product}
		<ProductCard
			id={product.id}
			title={product.title}
			featuredImage={product.featuredImage}
			price={product.priceRange.minVariantPrice.amount}
		/>
	{/each}
</ul>
