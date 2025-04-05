import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './deskStructure'

// Sanity configuration with clear cache hint
export default defineConfig({
  name: 'default',
  title: 'Nine Mile Store CMS',

  projectId: 'f0k2uz7k',
  dataset: 'production-new',

  plugins: [
    structureTool({structure}),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
