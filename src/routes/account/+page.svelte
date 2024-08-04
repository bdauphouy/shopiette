<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h2>account</h2>
<ul>
	<li>First name: {data.customer?.firstName}</li>
	<li>Last name: {data.customer?.lastName}</li>
	<li>Email: {data.customer?.email}</li>
</ul>

<a href="/account/logout">logout</a>
