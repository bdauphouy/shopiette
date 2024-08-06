<script lang="ts">
	import type { Product } from '$lib/types';
	import { formatPrice } from '$lib/utils';

	export let id: Product['id'];
	export let title: Product['title'];
	export let featuredImage: Product['featuredImage'];
	export let price: Product['priceRange']['minVariantPrice']['amount'];
</script>

<a href="/product?id={id}">
	<div>
		{#if featuredImage}
			<img src={featuredImage.originalSrc} alt={title} />
		{/if}
	</div>
	<div class="py-4 flex flex-col gap-1">
		<h2 class="font-bold text-md">{title}</h2>
		<p class="text-md">à partir de {formatPrice(price)}</p>
	</div>
</a>
