<script lang="ts">
	import ProductList from '$lib/components/product/product-list.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
	<div class="relative mx-auto max-w-7xl sm:static">
		<div class="sm:max-w-lg">
			<h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
				Welcome to this example store
			</h1>
			<p class="mt-4 text-xl text-gray-500">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam esse atque fugit eum
				suscipit necessitatibus cupiditate quidem quam. Sit, maxime deleniti. Placeat corporis
				laboriosam voluptas!
			</p>
		</div>
	</div>
</div>

<ProductList title="Products" products={data.products} />
