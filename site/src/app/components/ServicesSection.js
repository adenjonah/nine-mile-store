'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { client } from '../../lib/sanity';
import { urlForImage } from '../../lib/sanity-image';

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [landscapingServices, setLandscapingServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fallback data in case Sanity isn't populated yet
  const fallbackServices = [
    {
      id: 1,
      title: 'Key Cutting',
      description: 'We can duplicate most residential and commercial keys while you wait.',
      image: 'key-cutting.png',
    },
    {
      id: 2,
      title: 'Glass Cutting',
      description: 'Custom glass cutting service for windows, picture frames, and more.',
      image: 'glass-cutting.png',
    },
    {
      id: 3,
      title: 'Paint Mixing',
      description: 'Custom paint color matching and mixing in any quantity.',
      image: 'paint-mixing.png',
    },
    {
      id: 4,
      title: 'Tool Rental',
      description: 'Rent professional-grade tools for your home improvement projects.',
      image: 'tool-rental.png',
    },
  ];
  
  const fallbackLandscapingServices = [
    "Spring & Fall Cleanup",
    "Lawn Mowing & Maintenance",
    "Mulch & Stone Installation",
    "Tree & Shrub Planting",
    "Landscape Design",
    "Hardscaping & Patios",
  ];
  
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        
        // Fetch services
        const servicesData = await client.fetch(`
          *[_type == "service"] {
            _id,
            title,
            description,
            image,
            featured
          }
        `);
        
        // Fetch landscaping services
        const landscapingData = await client.fetch(`
          *[_type == "landscapingService"] {
            _id,
            title,
            highlighted
          } | order(highlighted desc)
        `);
        
        // If we have services from Sanity, use them, otherwise use fallback data
        setServices(servicesData.length > 0 ? servicesData : fallbackServices);
        setLandscapingServices(landscapingData.length > 0 
          ? landscapingData.map(item => item.title) 
          : fallbackLandscapingServices);
      } catch (error) {
        console.error('Error fetching services:', error);
        // Use fallback data if there's an error
        setServices(fallbackServices);
        setLandscapingServices(fallbackLandscapingServices);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  return (
    <section id="services" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2 text-black">OUR SERVICES</h2>
        <p className="text-center mb-10 text-black">We offer a variety of services to help with your home and garden needs</p>
        
        {/* Core Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service) => (
            <div 
              key={service._id || service.id} 
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-theme-md hover:shadow-theme-lg transition-all"
            >
              <div className="w-full h-48 bg-background-alternate rounded-md mb-4 overflow-hidden">
                {service.image ? (
                  <div className="relative w-full h-full">
                    <Image 
                      src={service.image.asset 
                        ? urlForImage(service.image).width(400).height(300).url() 
                        : `/images/services/${service.image}`}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-background-alternate flex items-center justify-center">
                    <span className="text-gray-500">Service Image</span>
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">{service.title}</h3>
              <p className="text-black">{service.description}</p>
            </div>
          ))}
        </div>
        
        {/* Landscaping Services */}
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
      </div>
    </section>
  );
} 