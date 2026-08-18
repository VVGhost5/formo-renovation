import {defineField, defineType} from 'sanity'
import {isShowedField} from './fields/isShowed'

export default defineType({
  name: 'aboutTeam',
  title: 'About — Our Team',
  type: 'document',
  fields: [
    isShowedField({
      initialValue: false,
      description: 'Hidden on the live site until Is showed is on.',
    }),
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'headline', title: 'Headline', type: 'string'}),
    defineField({name: 'headlineEmphasis', title: 'Headline emphasis', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
    defineField({
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [{
        type: 'object',
        name: 'teamMember',
        fields: [
          defineField({name: 'name', type: 'string', title: 'Name', validation: R => R.required()}),
          defineField({name: 'role', type: 'string', title: 'Role'}),
          defineField({name: 'bio', type: 'text', title: 'Bio', rows: 3}),
          defineField({name: 'photo', type: 'image', title: 'Photo', options: {hotspot: true}}),
        ],
        preview: {
          select: {name: 'name', role: 'role', media: 'photo'},
          prepare({name, role, media}) {return {title: name, subtitle: role, media}},
        },
      }],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'About — Our Team'}
    },
  },
})
