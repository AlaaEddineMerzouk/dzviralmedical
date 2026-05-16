import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'
import { apiVersion, dataset, projectId } from './sanity/env'
import { structure } from './sanity/deskStructure'

export default defineConfig({
  name: 'dz-viral-medical',
  title: 'DZ Viral Medical CMS',
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
})
