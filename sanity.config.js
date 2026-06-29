import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Formo',

  projectId: '9g3zb5ng',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],
  token: process.env.PUBLIC_SANITY_WRITE_TOKEN,
  schema: {
    types: schemaTypes,
  },
})
