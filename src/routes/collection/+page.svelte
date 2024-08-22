<script lang="ts">
	import ProductCard from '$lib/components/product-card.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: menu = data.menu.items.find(({ title }) => title === data.collection.title);
</script>

<h2 class="font-bold text-3xl mt-10">{data.collection.title}</h2>

<ul class="mt-10 grid grid-cols-6 gap-10">
	{#each data.collection.products.edges as { node: product }}
		<ProductCard
			id={product.id}
			title={product.title}
			featuredImage={product.featuredImage}
			price={product.priceRange.minVariantPrice.amount}
		/>
	{/each}
</ul>

{#if menu && menu.items.length > 0}
	<ul class="flex flex-col">
		{#each menu.items as item}
			<li>
				<header class="flex items-center my-10 justify-between">
					<h3 class="font-bold text-xl">{item.title}</h3>
					<a class="text-blue-500 hover:underline" href="/collection?id={item.resource.id}">
						See more
					</a>
				</header>
				<ul class="grid grid-cols-6 gap-10">
					{#each item.resource.products.edges as { node: product }}
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
			</li>
		{/each}
	</ul>
{/if}
