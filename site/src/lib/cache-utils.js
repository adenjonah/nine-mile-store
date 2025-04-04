// Cache utility functions for Sanity content

/**
 * Adds a cache-busting timestamp to a Sanity GROQ query
 * This helps ensure we're always getting fresh content on the live site
 * 
 * @param {string} query - The original GROQ query
 * @returns {string} The query with a cache-busting comment
 */
export function addCacheBuster(query) {
  // Add a timestamp as a GROQ comment to bust cache
  const timestamp = new Date().toISOString();
  return `${query} /* cache-bust: ${timestamp} */`;
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