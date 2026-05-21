import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactsPage',
  title: 'Contacts Page',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'titleBefore', title: 'Title — before emphasis', type: 'string'}),
    defineField({name: 'titleEmphasis', title: 'Title — emphasis', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
    defineField({name: 'heroImage', title: 'Hero background', type: 'image', options: {hotspot: true}}),
    defineField({name: 'formEyebrow', title: 'Form eyebrow', type: 'string'}),
    defineField({name: 'formTitleBefore', title: 'Form title — before emphasis', type: 'string'}),
    defineField({name: 'formTitleEmphasis', title: 'Form title — emphasis', type: 'string'}),
    defineField({name: 'formSubtext', title: 'Form subtext', type: 'text', rows: 2}),
  ],
  preview: {
    prepare() {
      return {title: 'Contacts Page'}
    },
  },
})
