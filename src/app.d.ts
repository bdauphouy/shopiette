// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	declare module '*.gql' {
		const Query: import('graphql').DocumentNode;
		export default Query;
		export const _queries: Record<string, import('graphql').DocumentNode>;
		export const _fragments: Record<string, import('graphql').FragmentDefinitionNode>;
	}
}

export {};
