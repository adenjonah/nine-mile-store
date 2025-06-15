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
    serviceCategories: [],
    saleItems: [],
    heroImage: null,
    blurbPhotos: [],
    logo: null,
    socialLinks: [],
    favicon: null,
    appleTouchIcon: null,
    loading: true
  });

  useEffect(() => {
    async function fetchAllData() {
      try {
        const query = `{
          "storeInfo": *[_type == "storeInfo"][0] {
            storeName,
            phone,
            email,
            address,
            city,
            communityText
          },
          "storeHours": *[_type == "storeHours"][0] {
            _id,
            _createdAt,
            _updatedAt,
            title,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday
          },
          "services": *[_type == "service"] {
            _id,
            title,
            description,
            image,
            featured
          },
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
            image,
            orderRank
          } | order(orderRank asc),
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
        }`;

        const data = await client.fetch(query);

        // Process images by category
        const heroImage = data.images?.find(img => img.category === 'hero') || null;
        const blurbPhotos = data.images?.filter(img => img.category === 'interior') || [];
        const logo = data.images?.find(img => img.category === 'logo') || null;

        // If debug mode is active, simulate missing data for testing UI feedback
        if (DEBUG_EMPTY_DATA) {
          setStoreData({
            storeInfo: {},
            storeHours: {},
            services: [],
            serviceCategories: [],
            saleItems: [],
            heroImage: null,
            blurbPhotos: [],
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
            serviceCategories: data.serviceCategories || [],
            saleItems: data.saleItems || [],
            heroImage,
            blurbPhotos,
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