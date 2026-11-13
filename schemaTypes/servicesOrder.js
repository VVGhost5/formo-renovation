import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'servicesOrder',
  title: 'Service order',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Order on the Services page',
      description:
        'Drag to reorder the jump list, the icon strip, and the service blocks on /services/. Add Doors anywhere in the list. Anything left out is shown at the end. Until you publish an order here, Doors stays directly after Finish Carpentry.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'service'}, {type: 'doorsPage'}],
          options: {disableNew: true},
        }),
      ],
      validation: (Rule) =>
        Rule.custom((items) => {
          if (!items?.length) return true
          const refs = items.map((item) => item?._ref).filter(Boolean)
          return new Set(refs).size === refs.length || 'Each service can only appear once'
        }),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Service order'}
    },
  },
})
