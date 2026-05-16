/// <reference types="@sanity/astro/module" />
import imageUrlBuilder, {type SanityImageObject} from '@sanity/image-url'
import {sanityClient} from 'sanity:client'
import {defineQuery} from 'groq'

const HERO_QUERY = defineQuery(`*[_type == "hero"][0]{
  title,
  subtitle,
  ctaLabel,
  ctaLink,
  backgroundImage{
    asset,
    alt
  }
}`)

const TESTIMONIALS_QUERY = defineQuery(`*[_type == "testimonial"] | order(_createdAt asc){
  _id,
  name,
  quote,
  rating
}`)

export type HeroDoc = {
	title: string | null
	subtitle?: string | null
	ctaLabel?: string | null
	ctaLink?: string | null
	backgroundImage?: (SanityImageObject & {alt?: string | null}) | null
} | null

export type TestimonialDoc = {
	_id: string
	name: string
	quote: string
	rating: number
}

const imageBuilder = imageUrlBuilder(sanityClient)

export function urlForImage(
	image: (SanityImageObject & {alt?: string | null}) | null | undefined,
) {
	if (!image?.asset) return null
	return imageBuilder.image(image).auto('format').fit('max').width(1920).url()
}

export function getHero() {
	return sanityClient.fetch<HeroDoc>(HERO_QUERY)
}

export function getTestimonials() {
	return sanityClient.fetch<TestimonialDoc[]>(TESTIMONIALS_QUERY)
}
