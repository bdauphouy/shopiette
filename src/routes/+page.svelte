<script lang="ts">
	import ProductCard from '$lib/components/product-card.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h2 class="font-bold text-3xl">Products</h2>
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
