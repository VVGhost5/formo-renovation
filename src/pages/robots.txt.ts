import type { APIRoute } from 'astro';

const AI_BOTS = [
	'GPTBot',
	'ClaudeBot',
	'Google-Extended',
	'Applebot-Extended',
	'CCBot',
	'Bytespider',
	'Amazonbot',
	'meta-externalagent',
	'CloudflareBrowserRenderingCrawler',
];

const getRobotsTxt = (sitemapURL: URL) => {
	const aiBotRules = AI_BOTS.map((bot) => `User-agent: ${bot}\nAllow: /`).join('\n\n');

	return `User-agent: *
Content-Signal: search=yes,ai-input=yes,ai-train=no,use=reference
Allow: /

${aiBotRules}

Sitemap: ${sitemapURL.href}
`;
};

export const GET: APIRoute = ({ site }) => {
	const sitemapURL = new URL('sitemap-index.xml', site);
	return new Response(getRobotsTxt(sitemapURL), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
