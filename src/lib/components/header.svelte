<script lang="ts">
	import Icon from '@iconify/svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import { Search } from '$lib/api/search';
	import type { Product, Shop, Cart as TCart } from '$lib/types';

	export let shop: Shop;
	export let searchValue = '';
	export let searchResults: Pick<Product, 'id' | 'title' | 'featuredImage'>[] = [];

	const cart =
		getContext<Writable<(Pick<TCart, 'id' | 'checkoutUrl'> & { quantity: number }) | null>>('cart');

	const handleSearch = async () => {
		if (!searchValue) {
			searchResults = [];

			return;
		}

		const { search } = await Search.products({ query: searchValue, first: 3 });

		searchResults = search.edges.map(({ node }) => node);
	};

	const handleBlur = () => {
		setTimeout(() => {
			searchResults = [];
		}, 200);
	};
</script>

<header class="flex justify-between px-40 py-10 items-center">
	<div class="flex gap-6 items-center">
		<img class="w-14" src={shop.brand.logo.image.originalSrc} alt={shop.brand.logo.image.altText} />
		<h1 class="text-xl font-bold"><a href="/">{shop.name}</a></h1>
	</div>

	<div class="relative w-1/3">
		<input
			id="search"
			class="bg-gray-100 py-3 px-6 rounded-md w-full"
			bind:value={searchValue}
			on:input={handleSearch}
			on:focus={handleSearch}
			on:blur={handleBlur}
			type="text"
			placeholder="Search"
		/>
		{#if searchResults.length > 0}
			<ul class="absolute top-16 left-0 bg-white w-full rounded-md shadow-lg">
				{#each searchResults as product}
					<li class="flex items-center gap-4 p-4">
						<img
							class="w-16 h-16 object-cover rounded-md"
							src={product.featuredImage.originalSrc}
							alt={product.title}
						/>
						<a href={`/product?id=${product.id}`}>{product.title}</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<ul class="text-2xl font-bold flex gap-4 items-center">
		<li>
			<a href="/account">
				<Icon icon="solar:user-rounded-linear" />
			</a>
		</li>
		{#if $cart?.checkoutUrl}
			<li>
				<a class="relative" href="/cart">
					<Icon icon="solar:cart-large-minimalistic-outline" />
					{#if $cart?.quantity}
						<span
							class="absolute top-0 right-0 translate-x-3 -translate-y-2 w-5 h-5 rounded-full text-xs bg-black text-white flex justify-center items-center"
						>
							{$cart.quantity}
						</span>
					{/if}
				</a>
			</li>
		{/if}
	</ul>
</header>
