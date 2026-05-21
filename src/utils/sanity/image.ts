import imageUrlBuilder, {type SanityImageObject} from '@sanity/image-url'
import {sanityClient} from 'sanity:client'

const builder = imageUrlBuilder(sanityClient)

export function urlForImage(
	image: (SanityImageObject & {alt?: string | null}) | null | undefined,
	width = 2000,
) {
	if (!image?.asset) return null
	return builder.image(image).auto('format').fit('max').width(width).url()
}
