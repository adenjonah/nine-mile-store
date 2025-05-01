'use client';

import Image from 'next/image';
import { useStoreData } from '../../lib/StoreDataContext';
import { urlForImage } from '../../lib/sanity-image';
import EmptyContentGuide from '../../components/EmptyContentGuide';

export default function ServicesSection() {
  const { services, loading } = useStoreData();
  
  // Determine grid classes based on number of services
  const getGridClasses = () => {
    if (services.length === 1) {
      return 'grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 max-w-md mx-auto';
    } else if (services.length === 2) {
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-3xl mx-auto';
    } else if (services.length === 3) {
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto';
    } else {
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
    }
  };
  
  return (
    <section id="services" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2 text-black">OUR SERVICES</h2>
        <p className="text-center mb-10 text-black">We offer a variety of services to help with your home and garden needs</p>
        
        {/* Core Services */}
        {loading ? (
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
          </div>
        ) : (
          <>
            {services.length > 0 ? (
              <div className={`${getGridClasses()} gap-6`}>
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
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-theme-md">
                <EmptyContentGuide 
                  contentType="Services" 
                  schemaType="service" 
                  className="max-w-xl mx-auto"
                />
                <div className="text-center mt-4">
                  <p className="text-gray-500 text-sm">
                    Services show up here after you add them in the CMS. You can add images and descriptions.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
} 