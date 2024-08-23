<script lang="ts">
	import type { Product } from '$lib/types';
	import { formatPrice } from '$lib/utils';

	export let product: Omit<Product, 'variants'>;

	$: hasPriceRange =
		product.priceRange.minVariantPrice.amount !== product.priceRange.maxVariantPrice.amount;
</script>

<div class="group relative">
	{#if product.featuredImage}
		<div
			class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
		>
			<img
				src={product.featuredImage.originalSrc}
				alt={product.featuredImage.altText}
				class="h-full w-full object-cover object-center lg:h-full lg:w-full"
			/>
		</div>
	{/if}
	<div class="mt-4 flex flex-col gap-2">
		<div>
			<h3 class="text-sm text-gray-700">
				<a href="/product?id={product.id}">
					<span aria-hidden="true" class="absolute inset-0"></span>
					{product.title}
				</a>
			</h3>
		</div>
		<p class="text-sm font-medium text-gray-900">
			{hasPriceRange ? 'à partir de' : ''}
			{formatPrice(product.priceRange.minVariantPrice.amount)}
		</p>
	</div>
</div>
