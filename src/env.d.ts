/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

declare module "*.vue" {
	import type {DefineComponent} from "vue";
	const component: DefineComponent<object, object, unknown>;
	export default component;
}
