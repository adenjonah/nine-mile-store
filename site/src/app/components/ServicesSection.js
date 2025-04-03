'use client';

import Image from 'next/image';

// Sample services data
const services = [
  {
    id: 1,
    title: 'Key Cutting',
    description: 'We offer professional key cutting services for most types of keys.',
    image: 'key-cutting.png'
  },
  {
    id: 2,
    title: 'Glass Cutting',
    description: 'Custom glass cutting for windows, picture frames, and other needs.',
    image: 'glass-cutting.png'
  },
  {
    id: 3,
    title: 'Equipment Rental',
    description: 'Rent high-quality tools and equipment for your projects.',
    image: 'equipment-rental.png'
  },
  {
    id: 4,
    title: 'Knife Sharpening',
    description: 'Professional knife and blade sharpening services.',
    image: 'knife-sharpening.png'
  },
  {
    id: 5,
    title: 'Screen Repair',
    description: 'Window and door screen repair and replacement.',
    image: 'screen-repair.png'
  },
  {
    id: 6,
    title: 'Custom Paint Mixing',
    description: 'Custom paint mixing and color matching services.',
    image: 'paint-mixing.png'
  }
];

// Landscaping services list
const landscapingServices = [
  'Soil, bark, gravel, and rock delivery',
  'Local delivery for all store purchases',
  'Custom soil blending available',
  'Seasonal landscaping services',
  'Free estimates for local projects'
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-12 bg-background-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif text-center mb-10 text-text-primary">Our Services</h2>
        
        {/* Landscaping Services */}
        <div className="bg-white rounded-lg p-8 shadow-theme-md mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-text-primary">Landscaping and Delivery</h3>
              <p className="mb-6 text-text-primary">We offer general delivery and landscaping services which include:</p>
              
              <ul className="space-y-3">
                {landscapingServices.map((item, index) => (
                  <li key={index} className="flex items-start bg-background-alternate p-3 rounded-lg">
                    <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">✓</span>
                    <span className="font-medium text-text-primary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Landscaping Images */}
            <div className="h-full grid grid-cols-2 gap-3">
              <div className="relative rounded-lg overflow-hidden">
                <Image 
                  src="/images/services/landscaping-1.png"
                  alt="Landscaping Services"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative rounded-lg overflow-hidden">
                <Image 
                  src="/images/services/landscaping-2.png"
                  alt="Landscaping Projects"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Store Services */}
        <h3 className="text-2xl font-semibold mb-6 text-text-primary text-center">Our Professional Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {services.map(service => (
            <div key={service.id} className="bg-white p-6 rounded-lg shadow-theme-md hover:shadow-theme-lg hover:translate-y-[-4px] transition-all">
              <div className="relative w-full h-40 rounded-lg overflow-hidden mb-4">
                <Image 
                  src={`/images/services/${service.image}`}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">{service.title}</h3>
              <p className="text-text-secondary">{service.description}</p>
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="mt-10 text-center">
          <div className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold shadow-md hover:shadow-lg">
            Call Us Today: (509)-466-9502
          </div>
        </div>
      </div>
    </section>
  );
} 