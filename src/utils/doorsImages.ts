import hero from '../assets/images/doors/hero.webp'
import patio from '../assets/images/doors/patio.webp'
import commercial from '../assets/images/doors/commercial.webp'
import frontEntry from '../assets/images/doors/front-entry.webp'
import patioDoor from '../assets/images/doors/patio-door.webp'
import closetDoor from '../assets/images/doors/closet-door.webp'
import interiorDoor from '../assets/images/doors/interior-door.webp'
import glassInsert from '../assets/images/doors/glass-insert.webp'
import garageDoor from '../assets/images/doors/garage-door.webp'
import commercialDoor from '../assets/images/doors/commercial-door.webp'
import storefrontDoor from '../assets/images/doors/storefront-door.webp'
import fireRatedDoor from '../assets/images/doors/fire-rated-door.webp'
import industrialDoor from '../assets/images/doors/industrial-door.webp'

type Asset = {src: string; width?: number; height?: number}

function assetSrc(file: Asset | string): string {
	return typeof file === 'string' ? file : file.src
}

export const doorsHeroSrc = assetSrc(hero)
export const doorsPatioSrc = assetSrc(patio)
export const doorsCommercialSrc = assetSrc(commercial)

const CARD_FILES = {
	'front-entry': frontEntry,
	'patio-door': patioDoor,
	'closet-door': closetDoor,
	'interior-door': interiorDoor,
	'glass-insert': glassInsert,
	'garage-door': garageDoor,
	'commercial-door': commercialDoor,
	'storefront-door': storefrontDoor,
	'fire-rated-door': fireRatedDoor,
	'industrial-door': industrialDoor,
} as const

const CARD_META: Record<keyof typeof CARD_FILES, {alt: string}> = {
	'front-entry': {
		alt: 'Black six-panel front door with two amber sidelights and a matching arched transom.',
	},
	'patio-door': {
		alt: 'Black four-panel patio glazing with central French doors and fixed side panels.',
	},
	'closet-door': {
		alt: 'Black metal sliding closet doors with frosted divided glass and exposed overhead hardware.',
	},
	'interior-door': {
		alt: 'Gray two-panel interior door with a brass lever and white fluted casing.',
	},
	'glass-insert': {
		alt: 'Black entry door with decorative leaded glass, two sidelights and an arched transom.',
	},
	'garage-door': {
		alt: 'Two white sectional garage doors with gridded top windows in a brick bungalow.',
	},
	'commercial-door': {
		alt: 'Blue steel commercial double doors with silver hardware and an off-white stucco exterior.',
	},
	'storefront-door': {
		alt: 'Bronze aluminum storefront door with clear glazing and a narrow matching sidelight.',
	},
	'fire-rated-door': {
		alt: 'Burgundy steel corridor door with a silver push bar and overhead closer.',
	},
	'industrial-door': {
		alt: 'Light-gray industrial sectional door with upper windows and yellow protective posts.',
	},
}

export function doorCardImage(imageKey: string): {src: string; alt: string} | null {
	const key = imageKey as keyof typeof CARD_FILES
	const file = CARD_FILES[key]
	const meta = CARD_META[key]
	if (!file || !meta) return null
	return {src: assetSrc(file), alt: meta.alt}
}
