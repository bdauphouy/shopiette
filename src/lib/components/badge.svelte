<script lang="ts">
	export let status: 'info' | 'success' | 'error' = 'info';

	$: backgroundColor =
		status === 'info' ? 'bg-blue-50' : status === 'success' ? 'bg-green-50' : 'bg-red-50';
	$: textColor =
		status === 'info' ? 'text-blue-700' : status === 'success' ? 'text-green-700' : 'text-red-700';
	$: ringColor =
		status === 'info'
			? 'ring-blue-600/10'
			: status === 'success'
				? 'ring-green-600/10'
				: 'ring-red-600/10';
</script>

<span
	class="{backgroundColor} {textColor} {ringColor} inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
>
	<slot />
</span>
