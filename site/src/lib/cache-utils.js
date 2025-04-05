// Cache utility functions for Sanity content
import { client } from './sanity';

/**
 * Performs a Sanity query with cache-busting
 * Uses a simpler and more reliable approach than modifying the query
 * 
 * @param {string} query - The GROQ query
 * @param {Object} params - Optional parameters for the query
 * @returns {Promise<any>} The query results
 */
export async function fetchWithNoCache(query, params = {}) {
  try {
    // Add a random parameter to the URL to bust cache
    const timestamp = Date.now();
    
    // Pass the query directly to the client but with cache control
    return await client.fetch(
      query,
      {
        ...params,
        // Add a cache buster that won't affect the actual query
        _cacheBuster: timestamp
      }
    );
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    throw error;
  }
}

/**
 * Adds a cache-busting timestamp to a Sanity GROQ query
 * This helps ensure we're always getting fresh content on the live site
 * 
 * @param {string} query - The original GROQ query
 * @returns {string} The query with a cache-busting parameter
 */
export function addCacheBuster(query) {
  // Using a proper GROQ filter that won't affect the results but forces a fresh query
  // The _updatedAt will always be less than a future date
  const future = new Date();
  future.setFullYear(future.getFullYear() + 1); // Set to one year in the future
  const futureTimestamp = future.toISOString();
  
  // Check if the query already has a filter
  if (query.trim().endsWith(']')) {
    // For queries that already end with a filter, append the condition
    return query.replace(/\]$/, ` && _updatedAt < "${futureTimestamp}"]`);
  }
  
  return `${query} [_updatedAt < "${futureTimestamp}"]`;
}

/**
 * Revalidates a path in the Next.js app
 * Use this when you know content has been updated
 * 
 * @param {string} path - The path to revalidate
 */
export async function revalidatePath(path) {
  try {
    const response = await fetch(`/api/revalidate?path=${path}`);
    if (!response.ok) {
      console.error('Failed to revalidate path:', path);
    }
  } catch (error) {
    console.error('Error revalidating path:', error);
  }
} 