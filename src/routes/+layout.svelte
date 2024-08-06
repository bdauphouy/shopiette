<script lang="ts">
	import '../app.css';

	import { Cart } from '$lib/api/cart';
	import Header from '$lib/components/header.svelte';
	import type { Cart as TCart } from '$lib/types';
	import Cookies from 'js-cookie';
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	let cart = writable<TCart | null>(null);
	let accessToken = writable<string | null>(null);

	const handleCartCreate = async () => {
		const lsCart = Cookies.get('cart');

		if (lsCart) {
			cart.set(JSON.parse(lsCart));

			return;
		}

		cart.set(await Cart.create());

		Cookies.set('cart', JSON.stringify($cart), { expires: 7 });
	};

	const handleAccessToken = () => {
		const at = Cookies.get('accessToken');

		if (at) {
			accessToken.set(at);
		}
	};

	onMount(() => {
		handleCartCreate();
		handleAccessToken();
	});

	setContext('cart', cart);
	setContext('accessToken', accessToken);
</script>

<Header />

<main class="px-40 py-10">
	<slot />
</main>
