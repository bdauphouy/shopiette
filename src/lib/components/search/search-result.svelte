<script lang="ts">
	import type { Product } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let result: Pick<Product, 'title' | 'id' | 'featuredImage'>;

	const dispatch = createEventDispatcher();

	const handleNavigate = () => {
		dispatch('navigate');
	};
</script>

<div class="flex gap-4">
	{#if result.featuredImage}
		<div class="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
			<img
				src={result.featuredImage.originalSrc}
				alt={result.featuredImage.altText}
				class="h-full w-full object-cover object-center"
			/>
		</div>
	{/if}
	<div class="flex flex-1 flex-col justify-center">
		<div class="flex justify-between text-base font-medium text-gray-900">
			<h3 class="text-sm font-medium text-gray-900">
				<a on:click={handleNavigate} href="/product?id={result.id}">{result.title}</a>
			</h3>
		</div>
	</div>
</div>
