<script lang="ts">
	import { Search } from '$lib/api';
	import type { Product } from '$lib/types';
	import { createEventDispatcher, onMount } from 'svelte';
	import SearchResult from './search-result.svelte';

	export let isOpen = false;

	let inputElement: HTMLInputElement;
	let searchValue = '';
	let searchResults: Pick<Product, 'id' | 'title' | 'featuredImage'>[] = [];

	const dispatch = createEventDispatcher();

	const handleClose = () => dispatch('close');

	const handleSearch = async () => {
		if (!searchValue) {
			searchResults = [];

			return;
		}

		const { search } = await Search.getProducts({ query: searchValue, first: 3 });

		searchResults = search.edges.map(({ node }) => node);
	};

	onMount(() => {
		inputElement.focus();
	});
</script>

<div class="{isOpen ? 'relative' : 'hidden'} z-40" role="dialog" aria-modal="true">
	<div on:click={handleClose} class="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true"></div>
	<div class="fixed flex flex-col items-center w-full pt-12 pb-6 px-4 bg-white">
		<div class="relative w-full max-w-2xl">
			<input
				bind:value={searchValue}
				bind:this={inputElement}
				on:input={handleSearch}
				type="text"
				name="price"
				id="price"
				class="block w-full rounded-md border-0 py-3 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				placeholder="Search for a product"
			/>
			{#if searchResults.length > 0}
				<ul class="absolute top-16 w-full p-6 rounded-md bg-white flex flex-col gap-6">
					{#each searchResults as product}
						<li>
							<SearchResult result={product} on:navigate={handleClose} />
						</li>
					{/each}
				</ul>
			{:else if searchValue}
				<div class="absolute top-16 w-full p-6 rounded-md bg-white flex flex-col gap-6">
					<p class="font-medium text-sm text-gray-800">No results found</p>
				</div>
			{/if}
		</div>
	</div>
</div>
