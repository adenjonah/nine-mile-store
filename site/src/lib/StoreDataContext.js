'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { client } from './sanity';

// Create a context for store data
const StoreDataContext = createContext(null);

export function StoreDataProvider({ children }) {
  const [storeData, setStoreData] = useState({
    storeInfo: {},
    storeHours: {},
    services: [],
    landscapingServices: [],
    saleItems: [],
    closeoutItems: [],
    heroImage: null,
    interiorImages: [],
    staffImages: [],
    communityImages: [],
    logo: null,
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
          "saleItems": *[_type == "product" && onSale == true] {
            _id,
            name,
            description,
            regularPrice,
            salePrice,
            image
          },
          "closeoutItems": *[_type == "closeoutItem" && active == true] {
            _id,
            title,
            discount,
            image
          },
          "images": *[_type == "siteImage"] {
            _id,
            title,
            category,
            image
          }
        }`);

        // Process images by category
        const heroImage = data.images?.find(img => img.category === 'hero') || null;
        const interiorImages = data.images?.filter(img => img.category === 'interior') || [];
        const staffImages = data.images?.filter(img => img.category === 'staff') || [];
        const communityImages = data.images?.filter(img => img.category === 'community') || [];
        const logo = data.images?.find(img => img.category === 'logo') || null;

        // Process landscaping services to match expected format in components
        const processedLandscapingServices = data.landscapingServices?.map(item => item.title) || [];

        setStoreData({
          storeInfo: data.storeInfo || {},
          storeHours: data.storeHours || {},
          services: data.services || [],
          landscapingServices: processedLandscapingServices,
          saleItems: data.saleItems || [],
          closeoutItems: data.closeoutItems || [],
          heroImage,
          interiorImages,
          staffImages,
          communityImages,
          logo,
          loading: false
        });
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