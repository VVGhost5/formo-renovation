import hero from './hero'
import testimonial from './testimonial'
import review from './review'
import siteSettings from './siteSettings'
import homeNumbers from './homeNumbers'
import homeServices from './homeServices'
import homeAbout from './homeAbout'
import homePortfolio from './homePortfolio'
import homeProcess from './homeProcess'
import homePricing from './homePricing'
import homeContact from './homeContact'
import homeBeforeAfter from './homeBeforeAfter'
import portfolioProject from './portfolioProject'
import beforeAfterProject from './beforeAfterProject'
import service from './service'
import servicesPage from './servicesPage'
import servicesHero from './servicesHero'
import servicesProcess from './servicesProcess'
import servicesPricing from './servicesPricing'
import servicesFaq from './servicesFaq'
import portfolioPage from './portfolioPage'
import aboutPage from './aboutPage'
import aboutHero from './aboutHero'
import aboutFounder from './aboutFounder'
import aboutWho from './aboutWho'
import aboutStory from './aboutStory'
import aboutValues from './aboutValues'
import aboutTeam from './aboutTeam'
import aboutWhy from './aboutWhy'
import aboutCert from './aboutCert'
import contactsPage from './contactsPage'
import reviewsPage from './reviewsPage'
import metaData from './metadata'

import statItem from './objects/statItem'
import aboutRow from './objects/aboutRow'
import processStep from './objects/processStep'
import pricingFactor from './objects/pricingFactor'
import keyValue from './objects/keyValue'
import serviceCard from './objects/serviceCard'
import pageSeo from './objects/pageSeo'

export const schemaTypes = [
  // Objects
  statItem,
  aboutRow,
  processStep,
  pricingFactor,
  keyValue,
  serviceCard,
  pageSeo,
  // Documents — legacy (kept so existing Sanity data is not orphaned)
  servicesPage,
  aboutPage,
  // Documents
  metaData,
  hero,
  testimonial,
  review,
  siteSettings,
  homeNumbers,
  homeServices,
  homeAbout,
  homePortfolio,
  homeProcess,
  homePricing,
  homeContact,
  homeBeforeAfter,
  portfolioProject,
  beforeAfterProject,
  service,
  servicesHero,
  servicesProcess,
  servicesPricing,
  servicesFaq,
  portfolioPage,
  aboutHero,
  aboutFounder,
  aboutWho,
  aboutStory,
  aboutValues,
  aboutTeam,
  aboutWhy,
  aboutCert,
  contactsPage,
  reviewsPage,
]
