import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'metaData',
    title: 'Metadata',
    type: 'document',
    fields: [
        defineField({name: 'metaTitle', title: 'Meta Title', type: 'string'}),
        defineField({name: 'metaDescription', title: 'Meta Description', type: 'string'}),
    ],
    preview: {
        prepare() {
            return {title: 'Metadata'}
        },
    },
})