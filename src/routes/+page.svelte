<script lang="ts">
	import ProductCard from '$lib/components/product-card.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h2 class="font-bold text-3xl">Collections</h2>
<ul class="mt-10 grid grid-cols-6 gap-10">
	{#each data.collections as collection}
		<a href="/collection?id={collection.id}" class="flex flex-col gap-4">
			<img src={collection.image.originalSrc} alt="" />
			<h3 class="font-bold text-xl">{collection.title}</h3>
		</a>
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
