'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { client } from '../../lib/sanity';
import { urlForImage } from '../../lib/sanity-image';
import { fetchWithNoCache } from '../../lib/cache-utils';

export default function HomeSection() {
  const [heroImage, setHeroImage] = useState(null);
  const [interiorImages, setInteriorImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchImages() {
      try {
        setIsLoading(true);
        
        // Fetch hero image
        const heroData = await fetchWithNoCache(`
          *[_type == "siteImage" && category == "hero"][0] {
            title,
            image
          }
        `);
        
        // Fetch interior images
        const interiorData = await fetchWithNoCache(`
          *[_type == "siteImage" && category == "interior"] {
            _id,
            title,
            image
          }[0...3]
        `);
        
        if (heroData?.image) {
          setHeroImage(heroData);
        }
        
        if (interiorData && interiorData.length > 0) {
          setInteriorImages(interiorData);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        // Add a slight delay to ensure the loading state is visible
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }
    
    fetchImages();
  }, []);
  
  return (
    <section id="home" className="pt-24 pb-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="relative w-full h-[500px] rounded-lg overflow-hidden mb-12">
          <Image 
            src={heroImage?.image 
              ? urlForImage(heroImage.image).width(1200).height(500).url() 
              : "/images/hero-transparent.png"}
            alt={heroImage?.title || "Nine Mile Hardware Store"}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/20 flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">Nine Mile Hardware</h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl drop-shadow-lg">Your local hardware store for all your home and garden needs.</p>
          </div>
        </div>
        
        {/* Family-Owned Business Section */}
        <div className="bg-white rounded-lg p-8 shadow-theme-md mb-12">
          <h2 className="text-3xl font-bold text-center mb-6 text-black">Family-Owned Business</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-black mb-4">
                Nine Mile Hardware is a family-owned and operated business that has been serving the Nine Mile Falls community for over 25 years. We pride ourselves on personal service and quality products.
              </p>
              <p className="text-black mb-4">
                Our knowledgeable staff is always ready to help you find exactly what you need for your project, big or small. We believe in being a helpful neighbor and an integral part of our local community.
              </p>
              <p className="text-black">
                Whether you&apos;re a professional contractor or a weekend DIY enthusiast, you&apos;ll find everything you need at Nine Mile Hardware. Stop by today and experience the difference of shopping at a local, family-owned hardware store.
              </p>
            </div>
            
            {/* Store Interior Images */}
            <div className="h-full">
              {interiorImages.length > 0 ? (
                // Use first Sanity image if available
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image 
                    src={urlForImage(interiorImages[0].image).width(600).height(400).url()}
                    alt={interiorImages[0].title || "Store Interior"}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                // Use fallback image if Sanity images are not available
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image 
                    src="/images/store-interior-1.png" 
                    alt="Store Interior"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 