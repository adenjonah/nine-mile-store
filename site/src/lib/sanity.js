import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'f0k2uz7k',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  perspective: 'published'
}) 