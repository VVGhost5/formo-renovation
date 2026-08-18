/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
	readonly MAINTENANCE_MODE: string
	readonly MAINTENANCE_SECRET: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

declare module "*.vue" {
	import type {DefineComponent} from "vue";
	const component: DefineComponent<object, object, unknown>;
	export default component;
}
