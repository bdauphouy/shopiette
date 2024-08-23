<script lang="ts" s>
	import type { Menu } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let menu: Menu;
	export let isOpen = false;

	const dispatch = createEventDispatcher();

	const handleClose = () => dispatch('close');
</script>

<div class="{isOpen ? 'relative' : 'hidden'} z-40 lg:hidden" role="dialog" aria-modal="true">
	<div class="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true"></div>
	<div class="fixed inset-0 z-40 flex">
		<div class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
			<div class="flex px-4 py-5">
				<button
					on:click={handleClose}
					type="button"
					class="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
				>
					<span class="absolute -inset-0.5"></span>
					<span class="sr-only">Close menu</span>
					<svg
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<div class="space-y-6 border-t border-gray-200 px-4 py-6">
				{#each menu.items.filter((item) => item.resource?.id) as item}
					<div class="flow-root">
						<a
							on:click={handleClose}
							href="/collection?id={item.resource.id}"
							class="-m-2 block p-2 font-medium text-gray-900"
						>
							{item.title}
						</a>
					</div>
				{/each}
			</div>
			<div class="space-y-6 border-t border-gray-200 px-4 py-6">
				<div class="flow-root">
					<a href="/account/login" class="-m-2 block p-2 font-medium text-gray-900">Sign in</a>
				</div>
				<div class="flow-root">
					<a href="/account/signup" class="-m-2 block p-2 font-medium text-gray-900">
						Create account
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
