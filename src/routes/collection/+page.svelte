<script lang="ts">
	import ProductCard from '$lib/components/product-card.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	console.log(data);
</script>

<img class="max-w-xs" src={data.collection.image.originalSrc} alt="" />
<h2 class="font-bold text-3xl my-10">{data.collection.title}</h2>
<p>{data.collection.description}</p>

<h3 class="font-bold text-3xl my-10">Products</h3>

<ul class="grid grid-cols-6 gap-10">
	{#each data.collection.products.edges as { node: product }}
		<li>
			<ProductCard
				id={product.id}
				title={product.title}
				price={product.priceRange.minVariantPrice.amount}
				featuredImage={product.featuredImage}
			/>
		</li>
	{/each}
</ul>
