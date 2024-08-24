<script lang="ts" s>
	import { invalidateAll } from '$app/navigation';
	import { Cart } from '$lib/api';
	import type { Cart as TCart, UserError } from '$lib/types';
	import { formatPrice } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';
	import CartLine from './cart-line.svelte';

	export let cart: TCart;
	export let isOpen = false;

	let cartErrors: UserError[] = [];

	const dispatch = createEventDispatcher();

	const handleClose = () => dispatch('close');

	const handleLineRemove = async (id: string) => {
		if (!cart) return;

		const { userErrors } = await Cart.deleteLines({
			cartId: cart.id,
			lineIds: [id]
		});

		if (userErrors?.length > 0) {
			cartErrors = userErrors;

			return;
		}

		invalidateAll();
	};
</script>

<div
	class="{isOpen ? 'relative' : 'hidden'} z-10"
	aria-labelledby="slide-over-title"
	role="dialog"
	aria-modal="true"
>
	<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
	<div class="fixed inset-0 overflow-hidden">
		<div class="absolute inset-0 overflow-hidden">
			<div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
				<div class="pointer-events-auto w-screen max-w-md">
					<div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
						<div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
							<div class="flex items-start justify-between">
								<h2 class="text-lg font-medium text-gray-900" id="slide-over-title">
									Shopping cart
								</h2>
								<div class="ml-3 flex h-7 items-center">
									<button
										on:click={handleClose}
										type="button"
										class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
									>
										<span class="absolute -inset-0.5"></span>
										<span class="sr-only">Close panel</span>
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
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
							</div>
							<div class="mt-8">
								{#if cart.lines.edges.length > 0}
									<ul role="list" class="-my-6 divide-y divide-gray-200">
										{#each cart.lines.edges as { node: line }}
											<li class="flex py-6">
												<CartLine
													{line}
													on:navigate={handleClose}
													on:remove={() => handleLineRemove(line.id)}
												/>
											</li>
										{/each}
									</ul>
								{:else}
									<div class="text-sm font-medium text-gray-800">Your cart is empty.</div>
								{/if}
							</div>
						</div>
						<div class="border-t border-gray-200 px-4 py-6 sm:px-6">
							<div class="flex justify-between text-base font-medium text-gray-900">
								<p>Subtotal</p>
								<p>{formatPrice(cart.cost.totalAmount.amount)}</p>
							</div>
							<p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
							<div class="mt-6">
								<a
									href={cart.checkoutUrl}
									class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
								>
									Checkout
								</a>
							</div>
							<div class="mt-6 flex justify-center text-center text-sm text-gray-500">
								<p>
									or
									<button
										on:click={handleClose}
										type="button"
										class="font-medium text-indigo-600 hover:text-indigo-500"
									>
										Continue Shopping
										<span aria-hidden="true"> &rarr;</span>
									</button>
									{#if cartErrors.length > 0}
										<ul class="text-md text-red-500 flex flex-col gap-2 mt-4">
											{#each cartErrors as error}
												<li class="text-sm font-medium text-red-500">{error.message}</li>
											{/each}
										</ul>
									{/if}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
