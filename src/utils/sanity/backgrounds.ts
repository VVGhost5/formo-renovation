/** Apply a CSS background-image when a URL is present; otherwise return empty. */
export function bgStyle(url: string | null | undefined): string {
	const u = url?.trim()
	return u ? `background-image: url(${u})` : ''
}
