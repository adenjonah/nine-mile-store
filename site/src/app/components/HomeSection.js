'use client';

import Image from 'next/image';
import { useStoreData } from '../../lib/StoreDataContext';
import { urlForImage } from '../../lib/sanity-image';
import EmptyContentGuide from '../../components/EmptyContentGuide';

export default function HomeSection() {
  const { heroImage, blurbPhotos, loading } = useStoreData();
  
  return (
    <section id="home" className="pt-24 pb-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="relative w-full h-[500px] rounded-lg overflow-hidden mb-12">
          {loading ? (
            <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
              <span className="text-gray-400">Loading...</span>
            </div>
          ) : heroImage?.image ? (
            <>
              <Image 
                src={urlForImage(heroImage.image).width(1200).height(500).url()}
                alt={heroImage.title || "Nine Mile Hardware Store"}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/20 flex flex-col items-center justify-center text-center p-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">Nine Mile Hardware</h1>
                <p className="text-xl md:text-2xl text-white max-w-3xl drop-shadow-lg">Your local hardware store for all your home and garden needs.</p>
              </div>
            </>
          ) : (
            <div className="bg-background-alternate flex flex-col items-center justify-center text-center p-6 h-full">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">Nine Mile Hardware</h1>
              <p className="text-xl md:text-2xl text-black max-w-3xl">Your local hardware store for all your home and garden needs.</p>
              
              <div className="mt-8 max-w-md">
                <EmptyContentGuide 
                  contentType="Hero Image" 
                  schemaType="siteImage" 
                  category="hero" 
                />
              </div>
            </div>
          )}
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
            
            {/* Blurb Photo */}
            <div className="h-full">
              {loading ? (
                <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg"></div>
              ) : blurbPhotos.length > 0 ? (
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image 
                    src={urlForImage(blurbPhotos[0].image).width(600).height(400).url()}
                    alt={blurbPhotos[0].title || "Store Photo"}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <EmptyContentGuide 
                  contentType="Blurb Photo" 
                  schemaType="siteImage" 
                  category="blurbPhoto" 
                  className="h-full flex flex-col justify-center"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 