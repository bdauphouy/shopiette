<script lang="ts">
	import ProductList from '$lib/components/product/product-list.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ProductList title="Products" products={data.products} />
