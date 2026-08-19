import { defineMiddleware } from 'astro:middleware'
// In Astro v6 + @astrojs/cloudflare v13, Cloudflare runtime env vars (set in the CF
// dashboard) are accessed via cloudflare:workers — NOT import.meta.env, which is
// baked at build time and cannot reflect runtime changes.
import { env as cfEnv } from 'cloudflare:workers'

const BYPASS_COOKIE = 'formo_admin'
const COOKIE_MAX_AGE = 60 * 60 * 24 // 24 hours

const MAINTENANCE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Coming Soon — Formo Renovations</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100svh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0f0f0f;
      color: #f5f5f0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      padding: 2rem;
    }
    .card {
      text-align: center;
      max-width: 480px;
    }
    .logo {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #c8a96e;
      margin-bottom: 2.5rem;
    }
    h1 {
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 300;
      line-height: 1.15;
      margin-bottom: 1rem;
    }
    h1 em { font-style: normal; color: #c8a96e; }
    p {
      font-size: 1rem;
      line-height: 1.7;
      color: #999;
    }
    .divider {
      width: 40px;
      height: 2px;
      background: #c8a96e;
      margin: 2rem auto;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">Formo Renovations</div>
    <h1>We're <em>almost</em> ready</h1>
    <div class="divider"></div>
    <p>Our new website is being prepared. We'll be back shortly — in the meantime, reach us at <strong>hello@formorenovations.ca</strong></p>
  </div>
</body>
</html>`

export const onRequest = defineMiddleware(async (context, next) => {
	// Read directly from the Cloudflare Workers runtime env — this reflects
	// the current value set in the CF dashboard without requiring a rebuild.
	const env = cfEnv as Record<string, string | undefined>
	const maintenanceMode = env.MAINTENANCE_MODE === 'true'
	const maintenanceSecret = env.MAINTENANCE_SECRET ?? 'formo-admin'

	if (!maintenanceMode) return next()

	const { url, cookies } = context

	// Always let Sanity Studio through
	if (url.pathname.startsWith('/studio')) return next()

	const adminParam = url.searchParams.get('admin')
	const secureFlag = url.protocol === 'https:' ? '; Secure' : ''
	const bypassCookie = `${BYPASS_COOKIE}=${maintenanceSecret}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; SameSite=Lax${secureFlag}`
	const clearCookie = `${BYPASS_COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${secureFlag}`

	// ?admin=SECRET grants access: store the cookie, then redirect to the clean URL
	if (adminParam === maintenanceSecret) {
		const cleanUrl = new URL(url)
		cleanUrl.searchParams.delete('admin')
		const response = context.redirect(cleanUrl.toString(), 302)
		response.headers.append('Set-Cookie', bypassCookie)
		return response
	}

	// ?admin=off drops the bypass — useful to check what visitors actually see
	const hasBypass = cookies.get(BYPASS_COOKIE)?.value === maintenanceSecret
	if (hasBypass && adminParam !== 'off') return next()

	const response = new Response(MAINTENANCE_HTML, {
		status: 503,
		headers: {
			'Content-Type': 'text/html; charset=utf-8',
			'Retry-After': '3600',
			// Never cache the placeholder — otherwise it survives in browser/edge
			// caches after MAINTENANCE_MODE is switched back off.
			'Cache-Control': 'no-store, must-revalidate',
			'X-Robots-Tag': 'noindex, nofollow',
		},
	})
	if (adminParam === 'off') response.headers.append('Set-Cookie', clearCookie)
	return response
})
