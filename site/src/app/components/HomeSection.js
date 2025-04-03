'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HomeSection() {
  return (
    <section id="home" className="bg-background-alternate">
      {/* Hero Banner */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        <Image 
          src="/images/hero/store-front.png"
          alt="Nine Mile Feed & Hardware Store Front"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white text-center px-4 max-w-4xl">
            Nine Mile Feed & Hardware
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-white p-8 rounded-lg shadow-theme-md">
            <p className="text-lg mb-6 text-black">
              Nine Mile Feed & Hardware is proud to serve the community of Nine Mile Falls and the surrounding areas. 
              We are a family-owned business committed to providing quality products and exceptional service to our customers.
            </p>
            
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="relative w-full md:w-1/3 h-60 rounded-md overflow-hidden">
                <Image 
                  src="/images/community/owner-portrait.png"
                  alt="Store Owner"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-xl font-semibold text-black bg-primary-light/10 p-4 rounded-lg border-l-4 border-primary md:w-2/3">
                Under new ownership with a commitment to expanding our products and services to better serve our community!
              </p>
            </div>
          </div>
        </div>
        
        {/* Store Info */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-theme-md transform hover:shadow-theme-lg hover:scale-[1.02] transition-all">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black">Contact Information</h3>
            </div>
            <p className="text-lg font-medium text-black">(509)-466-9502</p>
            <p className="text-black">12516 N Nine Mile Rd</p>
            <p className="text-black">Nine Mile Falls, WA 99026</p>
            <div className="relative w-full h-48 mt-4 rounded-md overflow-hidden">
              <Image 
                src="/images/hero/rustic-interior.png"
                alt="Store Interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-theme-md transform hover:shadow-theme-lg hover:scale-[1.02] transition-all">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black">Hours of Operation</h3>
            </div>
            <div className="space-y-2">
              <p className="text-black bg-background-alternate px-3 py-2 rounded-md">Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p className="text-black bg-background-alternate px-3 py-2 rounded-md">Saturday: 9:00 AM - 5:00 PM</p>
              <p className="text-black bg-background-alternate px-3 py-2 rounded-md">Sunday: 10:00 AM - 4:00 PM</p>
            </div>
            <div className="relative w-full h-48 mt-4 rounded-md overflow-hidden">
              <Image 
                src="/images/community/staff-group.png"
                alt="Our Staff"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Community Section */}
        <div className="bg-white p-8 rounded-lg shadow-theme-md">
          <h3 className="text-2xl font-semibold mb-8 text-black text-center">Charities We Support</h3>
          
          <div className="grid md:grid-cols-2 gap-10">
            {/* Charity 1 */}
            <div className="flex flex-col items-center bg-background-alternate p-6 rounded-lg">
              <div className="relative w-40 h-24 mb-4 overflow-hidden">
                <Image 
                  src="/images/community/ccc-logo.png"
                  alt="Childhood Cancer Coalition"
                  fill
                  className="object-contain"
                />
              </div>
              <h4 className="font-semibold text-center text-black text-xl mb-3">Childhood Cancer Coalition</h4>
              <p className="text-center text-black">
                We proudly support the Childhood Cancer Coalition in their mission to help families 
                affected by childhood cancer.
              </p>
            </div>
            
            {/* Charity 2 */}
            <div className="flex flex-col items-center bg-background-alternate p-6 rounded-lg">
              <div className="relative w-40 h-24 mb-4 overflow-hidden">
                <Image 
                  src="/images/community/dw-logo.png"
                  alt="Dignified Workday"
                  fill
                  className="object-contain"
                />
              </div>
              <h4 className="font-semibold text-center text-black text-xl mb-3">Dignified Workday</h4>
              <p className="text-center text-black">
                We support Dignified Workday in their efforts to provide professional clothing 
                and support to individuals in need.
              </p>
            </div>
          </div>
          
          <div className="mt-8 relative w-full h-64 rounded-lg overflow-hidden">
            <Image 
              src="/images/community/community-event.png"
              alt="Community Event at Nine Mile Feed & Hardware"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
              <h3 className="text-white text-2xl font-serif text-center px-4">Join us for community events throughout the year!</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 