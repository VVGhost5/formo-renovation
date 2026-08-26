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
        'Shown under the phone number in the contact drawer, footer, and contact sections. e.g. Mon – Fri, 8:00 AM – 5:00 PM',
      initialValue: 'Mon – Fri, 8:00 AM – 5:00 PM',
    }),
    defineField({
      name: 'officeWeekdayHours',
      title: 'Office hours — Monday to Friday',
      type: 'string',
      description:
        'Time range shown in the Office Hours card. Weekends are always closed. e.g. 8:00 AM – 5:00 PM',
      initialValue: '8:00 AM – 5:00 PM',
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
    defineField({
      name: 'testimonialsBackground',
      title: 'Homepage testimonials — background image',
      type: 'image',
      options: {hotspot: true},
      description: 'Optional background for the homepage testimonials section.',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
