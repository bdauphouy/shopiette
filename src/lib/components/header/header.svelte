<script lang="ts">
	import type { Menu, Shop, Cart as TCart } from '$lib/types';
	import AnnouncementBar from '../announcement-bar.svelte';
	import CartDrawer from '../cart/cart-drawer.svelte';
	import Search from '../search/search.svelte';
	import MobileMenu from './mobile-menu.svelte';

	export let shop: Shop;
	export let menu: Menu;
	export let cart: TCart | null;
	export let isLoggedIn = false;

	let isMobileMenuOpen = false;
	let isCartOpen = false;
	let isSearchOpen = false;

	$: cartQuantity = cart?.lines.edges.reduce((acc, { node }) => acc + node.quantity, 0);

	const handleMobileMenuToggle = () => {
		isMobileMenuOpen = !isMobileMenuOpen;
	};

	const handleCartToggle = () => {
		isCartOpen = !isCartOpen;
	};

	const handleSearchToggle = () => {
		isSearchOpen = !isSearchOpen;
	};
</script>

<MobileMenu {menu} isOpen={isMobileMenuOpen} on:close={handleMobileMenuToggle} />

{#if cart}
	<CartDrawer {cart} isOpen={isCartOpen} on:close={handleCartToggle} />
{/if}

{#if isSearchOpen}
	<Search isOpen={isSearchOpen} on:close={handleSearchToggle} />
{/if}

<header class="relative bg-white">
	<AnnouncementBar>Get free delivery on orders over 100 €</AnnouncementBar>
	<nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="border-b border-gray-200">
			<div class="flex h-16 items-center">
				<button
					on:click={handleMobileMenuToggle}
					type="button"
					class="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
				>
					<span class="absolute -inset-0.5"></span>
					<span class="sr-only">Open menu</span>
					<svg
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</button>
				<div class="ml-4 flex lg:ml-0">
					<a href="/">
						<span class="sr-only">{shop.name}</span>
						{#if shop.brand.logo}
							<img
								class="h-8 w-auto"
								src={shop.brand.logo.image.originalSrc}
								alt={shop.brand.logo.image.altText}
							/>
						{/if}
					</a>
				</div>
				<div class="hidden lg:ml-8 lg:block lg:self-stretch">
					<div class="flex h-full space-x-8">
						{#each menu.items.filter((item) => item.resource?.id) as item}
							<div class="flex">
								<div class="relative flex">
									<a
										href="/collection?id={item.resource?.id}"
										type="button"
										class="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800"
										aria-expanded="false"
									>
										{item.title}
									</a>
								</div>
							</div>
						{/each}
					</div>
				</div>
				<div class="ml-auto flex items-center">
					<div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
						{#if isLoggedIn}
							<a href="/account" class="text-sm font-medium text-gray-700 hover:text-gray-800">
								My account
							</a>
						{:else}
							<a
								href="/account/login"
								class="text-sm font-medium text-gray-700 hover:text-gray-800"
							>
								Sign in
							</a>
							<span class="h-6 w-px bg-gray-200" aria-hidden="true"></span>

							<a
								href="/account/signup"
								class="text-sm font-medium text-gray-700 hover:text-gray-800"
							>
								Create account
							</a>
						{/if}
					</div>
					<div class="flex lg:ml-6">
						<button on:click={handleSearchToggle} class="p-2 text-gray-400 hover:text-gray-500">
							<span class="sr-only">Search</span>
							<svg
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
								/>
							</svg>
						</button>
					</div>
					{#if cartQuantity !== null}
						<div class="ml-4 flow-root lg:ml-6">
							<button on:click={handleCartToggle} class="group -m-2 flex items-center p-2">
								<svg
									class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
									/>
								</svg>
								<span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
									{cartQuantity}
								</span>
								<span class="sr-only">items in cart, view bag</span>
							</button>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</nav>
</header>
