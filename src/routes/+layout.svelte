<script lang="ts">
	import '../app.css';

	import { Cart } from '$lib/api';
	import Header from '$lib/components/header/header.svelte';
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: cart = data.cart;

	const handleCartCreate = async () => {
		if (cart) return;

		const {
			cart: { id }
		} = await Cart.create();

		Cookies.set('cart', JSON.stringify({ id }), { expires: 7 });
	};

	onMount(() => {
		handleCartCreate();
	});
</script>

<Header {cart} shop={data.shop} menu={data.menu} />

<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
	<slot />
</main>
