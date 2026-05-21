import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'statItem',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({name: 'value', title: 'Value', type: 'string', validation: (R) => R.required()}),
    defineField({
      name: 'suffix',
      title: 'Suffix (superscript)',
      type: 'string',
      description: 'e.g. +, %, mo, yr — shown smaller next to the value',
    }),
    defineField({name: 'label', title: 'Label', type: 'string', validation: (R) => R.required()}),
  ],
  preview: {
    select: {value: 'value', suffix: 'suffix', label: 'label'},
    prepare({value, suffix, label}) {
      return {title: `${value}${suffix || ''} — ${label}`}
    },
  },
})
