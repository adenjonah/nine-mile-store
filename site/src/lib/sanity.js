import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'f0k2uz7k',
  dataset: 'production-new',
  apiVersion: '2023-05-03',
  useCdn: false,
  perspective: 'published',
  // Disable cache for development and add cache control headers
  token: process.env.SANITY_API_TOKEN,
  // Add cache control headers to always get fresh content
  withCredentials: true,
  // Adding the stega parameter to ensure latest content
  stega: {
    enabled: process.env.NODE_ENV === 'development',
    studioUrl: '/studio',
  }
}) 