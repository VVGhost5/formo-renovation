import { defineMiddleware } from 'astro:middleware';

const CANONICAL_HOST = 'formorenovations.com';

export const onRequest = defineMiddleware((context, next) => {
	const { hostname, pathname, search } = context.url;

	if (hostname === `www.${CANONICAL_HOST}`) {
		return Response.redirect(`https://${CANONICAL_HOST}${pathname}${search}`, 301);
	}

	return next();
});
