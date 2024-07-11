<script lang="ts">
	let cartId = '';
	let checkoutUrl = '';

	const handleCreateCart = async () => {
		const response = await fetch('/api/cart/create', {
			method: 'POST'
		});

		const data = await response.json();

		cartId = data.id;
		checkoutUrl = data.checkoutUrl;
	};

	const handleAddToCart = () => {
		fetch('/api/cart', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				cartId,
				productVariantId: 'gid://shopify/ProductVariant/49316588159275',
				quantity: 1
			})
		});
	};
</script>

<button on:click={handleCreateCart}>create cart</button>
<button on:click={handleAddToCart}>add to cart</button>

<ul>
	<li>
		{cartId}
	</li>
	<li>
		{checkoutUrl}
	</li>
</ul>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
