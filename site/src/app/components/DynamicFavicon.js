'use client';

import { useStoreData } from '../../lib/StoreDataContext';
import { urlForImage } from '../../lib/sanity-image';
import { useEffect } from 'react';

export default function DynamicFavicon() {
  const { favicon, appleTouchIcon } = useStoreData();
  
  useEffect(() => {
    if (!favicon) return;
    
    // Set favicon links
    const faviconUrl = urlForImage(favicon).width(32).height(32).url();
    const faviconSmallUrl = urlForImage(favicon).width(16).height(16).url();
    const faviconLargeUrl = urlForImage(favicon).width(180).height(180).url();
    const appleTouchIconUrl = appleTouchIcon 
      ? urlForImage(appleTouchIcon).width(180).height(180).url() 
      : faviconLargeUrl;
    
    // Update favicon links
    let link = document.querySelector('link[rel="icon"][sizes="32x32"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      link.sizes = '32x32';
      document.head.appendChild(link);
    }
    link.href = faviconUrl;
    
    link = document.querySelector('link[rel="icon"][sizes="16x16"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      link.sizes = '16x16';
      document.head.appendChild(link);
    }
    link.href = faviconSmallUrl;
    
    link = document.querySelector('link[rel="apple-touch-icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'apple-touch-icon';
      link.sizes = '180x180';
      document.head.appendChild(link);
    }
    link.href = appleTouchIconUrl;
    
    // Update meta tags
    let meta = document.querySelector('meta[name="msapplication-TileImage"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'msapplication-TileImage';
      document.head.appendChild(meta);
    }
    meta.content = faviconLargeUrl;
    
  }, [favicon, appleTouchIcon]);
  
  return null; // This component doesn't render anything
} 