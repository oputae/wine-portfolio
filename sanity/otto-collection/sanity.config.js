// File: sanity.config.js

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
// This path works because schema.js is now in the SAME folder.
import {wine} from './schema.js'

// You can find these in your sanity.json or on manage.sanity.io
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '474twdvg'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'Otto Collection',

  projectId: projectId,
  dataset: dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [wine],
  },
})