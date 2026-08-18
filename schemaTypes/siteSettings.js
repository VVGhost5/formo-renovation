import {defineField, defineType} from 'sanity'
import {isShowedField} from './fields/isShowed'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'footerDescription',
      title: 'Footer description',
      type: 'text',
      rows: 3,
    }),
    defineField({name: 'phone', title: 'Phone', type: 'string'}),
    defineField({
      name: 'phoneHours',
      title: 'Phone hours note',
      type: 'string',
      description:
        'Shown under the phone number in the contact drawer, footer, and contact sections. e.g. Mon – Fri, 8:00 AM – 6:00 PM',
      initialValue: 'Mon – Fri, 8:00 AM – 6:00 PM',
    }),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({
      name: 'emailNote',
      title: 'Email note',
      type: 'string',
      description: 'Shown under the email address in the contact drawer. e.g. Response within 1 business day',
      initialValue: 'Response within 1 business day',
    }),
    defineField({
      name: 'notificationEmail',
      title: 'Notification Email (receives all form submissions)',
      type: 'string',
    }),
    defineField({name: 'whatsapp', title: 'WhatsApp number', type: 'string'}),
    defineField({name: 'whatsappNote', title: 'WhatsApp note', type: 'string'}),
    defineField({name: 'serviceArea', title: 'Service area', type: 'string'}),
    defineField({name: 'serviceAreaNote', title: 'Service area note', type: 'string'}),
    defineField({name: 'instagramUrl', title: 'Instagram URL', type: 'url'}),
    defineField({name: 'facebookUrl', title: 'Facebook URL', type: 'url'}),
    defineField({name: 'houzzUrl', title: 'Houzz URL', type: 'url'}),
    defineField({name: 'homestarsUrl', title: 'HomeStars URL', type: 'url'}),
    isShowedField({
      name: 'testimonialsIsShowed',
      title: 'Homepage testimonials — is showed',
      description: 'Show the testimonials slider on the homepage.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
