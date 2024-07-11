import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import graphqlLoader from 'vite-plugin-graphql-loader';

export default defineConfig({
	plugins: [sveltekit(), graphqlLoader()]
});
