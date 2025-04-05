import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Simplified configuration without custom structure
export default defineConfig({
  name: 'default',
  title: 'Nine Mile Store CMS',

  projectId: 'f0k2uz7k',
  dataset: 'production-new',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
