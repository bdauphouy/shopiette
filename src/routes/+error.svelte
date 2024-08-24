<script lang="ts">
	import { page } from '$app/stores';
</script>

<main class="px-6 py-24 sm:py-32 lg:px-8">
	<div class="text-center">
		<p class="text-base font-semibold text-indigo-600">{$page.status}</p>
		<h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
		{#if $page.error}
			<p class="mt-6 text-base leading-7 text-gray-600">
				{$page.error.message}
			</p>
		{/if}
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<a
				href="/"
				class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>
				Go back home
			</a>
		</div>
	</div>
</main>
