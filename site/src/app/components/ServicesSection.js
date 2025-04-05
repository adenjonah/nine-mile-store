'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { client } from '../../lib/sanity';
import { urlForImage } from '../../lib/sanity-image';
import { fetchWithNoCache } from '../../lib/cache-utils';

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [landscapingServices, setLandscapingServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    let isMounted = true;
    
    async function fetchData() {
      try {
        if (!isMounted) return;
        
        setIsLoading(true);
        
        // Fetch services using the no-cache fetch method
        const servicesData = await fetchWithNoCache(`
          *[_type == "service"] {
            _id,
            title,
            description,
            image,
            featured
          }
        `);
        
        // Fetch landscaping services using the no-cache fetch method
        const landscapingData = await fetchWithNoCache(`
          *[_type == "landscapingService"] {
            _id,
            title,
            highlighted
          } | order(highlighted desc)
        `);
        
        // Only update state if component is still mounted
        if (isMounted) {
          setServices(servicesData || []);
          
          if (landscapingData && landscapingData.length > 0) {
            setLandscapingServices(landscapingData.map(item => item.title));
          } else {
            setLandscapingServices([]);
          }
          
          // Set loading to false after a minimum delay of 1000ms to prevent flickering
          setTimeout(() => {
            if (isMounted) {
              setIsLoading(false);
            }
          }, 1000);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        if (isMounted) {
          setServices([]);
          setLandscapingServices([]);
          setIsLoading(false);
        }
      }
    }
    
    fetchData();
    
    // Cleanup function to prevent updates if component unmounts
    return () => {
      isMounted = false;
    };
  }, []);
  
  return (
    <section id="services" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2 text-black">OUR SERVICES</h2>
        <p className="text-center mb-10 text-black">We offer a variety of services to help with your home and garden needs</p>
        
        {/* Core Services */}
        {isLoading ? (
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[1, 2, 3, 4].map((item) => (
                <div 
                  key={item}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-theme-md"
                >
                  <div className="w-full h-48 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                </div>
              ))}
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-theme-md animate-pulse">
              <div className="h-7 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64 bg-gray-200 rounded-md"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="h-12 bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {services.map((service) => (
                  <div 
                    key={service._id} 
                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-theme-md hover:shadow-theme-lg transition-all"
                  >
                    <div className="w-full h-48 bg-background-alternate rounded-md mb-4 overflow-hidden">
                      {service.image ? (
                        <div className="relative w-full h-full">
                          <Image 
                            src={urlForImage(service.image).width(400).height(300).url()}
                            alt={service.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-background-alternate flex items-center justify-center">
                          <span className="text-gray-500">No Image Available</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-black">{service.title}</h3>
                    <p className="text-black">{service.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-theme-md mb-16 text-center">
                <p className="text-black text-lg">No services data available. Please check back later.</p>
              </div>
            )}
            
            {/* Landscaping Services */}
            {landscapingServices.length > 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-theme-md">
                <h3 className="text-xl font-semibold mb-6 text-black">Landscaping Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative w-full h-64 rounded-md overflow-hidden">
                    <Image 
                      src="/images/services/landscaping.png"
                      alt="Landscaping Services"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">Professional Landscaping</span>
                    </div>
                  </div>
                  <div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {landscapingServices.map((service, index) => (
                        <li key={index} className="flex items-center bg-background-alternate p-3 rounded-lg">
                          <span className="w-3 h-3 bg-primary rounded-full mr-3 flex-shrink-0"></span>
                          <span className="text-black font-medium">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 p-4 border-t border-gray-200">
                  <p className="text-black text-center">
                    Contact us for a free estimate on any of our landscaping services. 
                    We service residential and commercial properties in the local area.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-theme-md text-center">
                <p className="text-black text-lg">No landscaping services data available. Please check back later.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
} 