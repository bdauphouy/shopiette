<script lang="ts">
	import '../app.css';

	import { Cart } from '$lib/api/cart';
	import Header from '$lib/components/header.svelte';
	import type { Cart as TCart } from '$lib/types';
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	let cart = writable<TCart | null>(null);

	const handleCartCreate = async () => {
		const lsCart = localStorage.getItem('cart');

		if (lsCart) {
			cart.set(JSON.parse(lsCart));

			return;
		}

		cart.set(await Cart.create());

		localStorage.setItem('cart', JSON.stringify($cart));
	};

	onMount(() => {
		handleCartCreate();
	});

	setContext('cart', cart);
</script>

<Header />

<main class="px-20 py-10">
	<slot />
</main>
