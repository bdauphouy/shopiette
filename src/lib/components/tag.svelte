<script lang="ts">
	export let status: 'info' | 'error' = 'info';

	$: backgroundColor = status === 'info' ? 'bg-indigo-500' : 'bg-red-500';
</script>

<span class="{backgroundColor} inline-block px-3 py-1 rounded-full text-sm font-bold text-white"
	><slot /></span
>
