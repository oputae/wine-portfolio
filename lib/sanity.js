// /lib/sanity.js

import {createClient} from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

// Validate required environment variables
if (!projectId) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID');
}
if (!dataset) {
  console.error('Missing NEXT_PUBLIC_SANITY_DATASET');
}
if (!apiVersion) {
  console.error('Missing NEXT_PUBLIC_SANITY_API_VERSION');
}

/**
 * Sanity client for fetching data in Next.js.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // `false` if you want to ensure fresh data
  stega: {
    enabled: false,
    studioUrl: '/studio',
  },
});