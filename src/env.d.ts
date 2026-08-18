/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
	readonly MAINTENANCE_MODE: string
	readonly MAINTENANCE_SECRET: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

// Cloudflare Workers runtime env bindings (set in CF dashboard / .dev.vars locally)
declare module 'cloudflare:workers' {
	const env: {
		MAINTENANCE_MODE?: string
		MAINTENANCE_SECRET?: string
		[key: string]: string | undefined
	}
	export { env }
}

declare module "*.vue" {
	import type {DefineComponent} from "vue";
	const component: DefineComponent<object, object, unknown>;
	export default component;
}
