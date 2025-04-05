'use client';

import { client } from './sanity';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { urlForImage } from './sanity-image';

/**
 * Utility script to generate static favicons from Sanity CMS
 * Run this script manually when a new favicon is uploaded
 * 
 * To use: 
 * 1. Navigate to site directory
 * 2. Run: node -e "require('./src/lib/FaviconGenerator.js').generateFavicons()"
 */

export async function generateFavicons() {
  try {
    console.log('Fetching favicon from Sanity CMS...');
    
    // Fetch favicon data from Sanity
    const siteSettings = await client.fetch(`*[_type == "favicon"][0]{
      favicon,
      appleTouchIcon
    }`);
    
    if (!siteSettings?.favicon) {
      console.error('No favicon found in Sanity CMS. Please upload a favicon first.');
      return;
    }
    
    // Get image URLs
    const favicon = siteSettings.favicon;
    const appleTouchIcon = siteSettings.appleTouchIcon || favicon;
    
    const faviconSizes = [16, 32, 192, 512];
    const touchIconSize = 180;
    
    // Create URLs using Sanity's image API
    const faviconUrls = faviconSizes.map(size => ({
      url: urlForImage(favicon).width(size).height(size).url(),
      size,
      filename: size === 192 || size === 512 
        ? `favicon-${size}.png` 
        : `favicon-${size}x${size}.png`
    }));
    
    const touchIconUrl = {
      url: urlForImage(appleTouchIcon).width(touchIconSize).height(touchIconSize).url(),
      size: touchIconSize,
      filename: 'apple-touch-icon.png'
    };
    
    // Combine all icons for download
    const allIcons = [...faviconUrls, touchIconUrl];
    
    console.log('Generating favicons...');
    console.log(`Found ${allIcons.length} icons to generate`);
    
    // Log the URLs that would be downloaded
    allIcons.forEach(icon => {
      console.log(`${icon.filename} (${icon.size}x${icon.size}): ${icon.url}`);
    });
    
    console.log('\nTo actually download these files:');
    console.log('1. Copy each URL');
    console.log('2. Download the image');
    console.log('3. Save it to the site/public directory with the filename shown above');
    
    return allIcons;
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
} 