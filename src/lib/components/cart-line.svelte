<script lang="ts">
	import { formatPrice } from '$lib/utils';

	export let background: 'white' | 'gray' = 'white';
	export let title: string;
	export let quantity: number;
	export let price: string;
</script>

<tr class:bg-gray-100={background === 'gray'}>
	<td class="px-6 py-4 rounded-l-lg">{title}</td>
	<td class="px-6 py-4">{quantity}</td>
	<td class="px-6 py-4 rounded-r-lg">{formatPrice(price)}</td>
</tr>
