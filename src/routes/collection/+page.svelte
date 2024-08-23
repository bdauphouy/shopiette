<script lang="ts">
	import ProductList from '$lib/components/product/product-list.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: menu = data.menu.items.find(({ title }) => title === data.collection.title);
</script>

<ProductList
	title={data.collection.title}
	products={data.collection.products.edges.map(({ node }) => node)}
/>

{#if menu && menu.items.length > 0}
	<ul class="flex flex-col gap-10 mt-10">
		{#each menu.items as item}
			<li>
				<ProductList
					title={item.title}
					products={item.resource.products.edges.map(({ node }) => node)}
					limit={5}
					seeMoreLink="/collection?id={item.resource.id}"
				/>
			</li>
		{/each}
	</ul>
{/if}
