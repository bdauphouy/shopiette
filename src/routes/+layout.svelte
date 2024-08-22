<script lang="ts">
	import '../app.css';

	import { Cart } from '$lib/api';
	import Header from '$lib/components/header.svelte';
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

<Header {cart} shop={data.shop} />

<main class="px-40 py-10">
	<slot />
</main>
