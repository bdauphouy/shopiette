<button
	{...$$props}
	class="py-4 px-20 border-solid border-2 text-md font-medium border-black text-black rounded-lg hover:bg-black hover:text-white transition-colors duration-300 disabled:bg-gray-300 disabled:hover:text-black disabled:cursor-not-allowed disabled:hover:bg-gray-300"
	on:click
>
	<slot />
</button>
