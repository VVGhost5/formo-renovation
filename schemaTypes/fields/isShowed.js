import {defineField} from 'sanity'

export function isShowedField({name = 'isShowed', title = 'Is showed', initialValue = true, fieldset, description} = {}) {
  return defineField({
    name,
    title,
    type: 'boolean',
    description: description || 'When off, this section is hidden on the live site.',
    initialValue,
    options: {layout: 'switch'},
    ...(fieldset ? {fieldset} : {}),
  })
}
