'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { client } from './sanity';

// Debug flag - set to true to simulate missing data for testing UI feedback
const DEBUG_EMPTY_DATA = false;

// Create a context for store data
const StoreDataContext = createContext(null);

export function StoreDataProvider({ children }) {
  const [storeData, setStoreData] = useState({
    storeInfo: {},
    storeHours: {},
    services: [],
    landscapingServices: [],
    serviceCategories: [],
    saleItems: [],
    heroImage: null,
    blurbPhotos: [],
    staffImages: [],
    communityImages: [],
    logo: null,
    socialLinks: [],
    favicon: null,
    appleTouchIcon: null,
    loading: true
  });

  useEffect(() => {
    async function fetchAllData() {
      try {
        // Use a single GROQ query to fetch multiple document types in parallel
        const data = await client.fetch(`{
          "storeInfo": *[_type == "storeInfo"][0] {
            storeName,
            phone,
            email,
            address,
            city,
            communityText
          },
          "storeHours": *[_type == "storeHours"][0],
          "services": *[_type == "service"] {
            _id,
            title,
            description,
            image,
            featured
          },
          "landscapingServices": *[_type == "landscapingService"] {
            _id,
            title,
            highlighted
          } | order(highlighted desc),
          "serviceCategories": *[_type == "serviceCategory"] {
            _id,
            title,
            slug,
            description,
            image,
            overlayText
          },
          "saleItems": *[_type == "product" && onSale == true] {
            _id,
            name,
            description,
            regularPrice,
            salePrice,
            image
          },
          "images": *[_type == "siteImage"] {
            _id,
            title,
            category,
            image
          },
          "socialLinks": *[_type == "socialLink"] | order(orderRank) {
            _id,
            platform,
            url,
            icon
          },
          "siteSettings": *[_type == "favicon"][0] {
            favicon,
            appleTouchIcon
          }
        }`);

        // Process images by category
        const heroImage = data.images?.find(img => img.category === 'hero') || null;
        const blurbPhotos = data.images?.filter(img => img.category === 'interior') || [];
        const staffImages = data.images?.filter(img => img.category === 'staff') || [];
        const communityImages = data.images?.filter(img => img.category === 'community') || [];
        const logo = data.images?.find(img => img.category === 'logo') || null;

        // Process landscaping services to match expected format in components
        const processedLandscapingServices = data.landscapingServices?.map(item => item.title) || [];

        // If debug mode is active, simulate missing data for testing UI feedback
        if (DEBUG_EMPTY_DATA) {
          setStoreData({
            storeInfo: {},
            storeHours: {},
            services: [],
            landscapingServices: [],
            serviceCategories: [],
            saleItems: [],
            heroImage: null,
            blurbPhotos: [],
            staffImages: [],
            communityImages: [],
            logo: null,
            socialLinks: [],
            favicon: null,
            appleTouchIcon: null,
            loading: false
          });
        } else {
          setStoreData({
            storeInfo: data.storeInfo || {},
            storeHours: data.storeHours || {},
            services: data.services || [],
            landscapingServices: processedLandscapingServices,
            serviceCategories: data.serviceCategories || [],
            saleItems: data.saleItems || [],
            heroImage,
            blurbPhotos,
            staffImages,
            communityImages,
            logo,
            socialLinks: data.socialLinks || [],
            favicon: data.siteSettings?.favicon || null,
            appleTouchIcon: data.siteSettings?.appleTouchIcon || null,
            loading: false
          });
        }
      } catch (error) {
        console.error('Error fetching store data:', error);
        // Set loading to false even on error to allow components to render fallback states
        setStoreData(prev => ({ ...prev, loading: false }));
      }
    }

    fetchAllData();

    // Set up a revalidation interval (e.g., every hour)
    const intervalId = setInterval(fetchAllData, 60 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <StoreDataContext.Provider value={storeData}>
      {children}
    </StoreDataContext.Provider>
  );
}

// Custom hook for components to use
export function useStoreData() {
  const context = useContext(StoreDataContext);
  if (context === null) {
    throw new Error('useStoreData must be used within a StoreDataProvider');
  }
  return context;
} 