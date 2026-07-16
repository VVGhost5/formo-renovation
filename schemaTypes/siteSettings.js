import {defineField, defineType} from 'sanity'

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
    defineField({name: 'phoneHours', title: 'Phone hours note', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'emailNote', title: 'Email note', type: 'string'}),
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
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
