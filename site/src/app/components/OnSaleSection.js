'use client';

import Image from 'next/image';
import { useStoreData } from '../../lib/StoreDataContext';
import { urlForImage } from '../../lib/sanity-image';

export default function OnSaleSection() {
  const { saleItems, closeoutItems, loading } = useStoreData();
  
  return (
    <section id="on-sale" className="py-12 bg-background-alternate">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2 text-black">ON SALE</h2>
        <p className="text-center text-xl mb-8 text-black">THIS WEEK&apos;S SPECIALS</p>
        
        {/* Sale Items */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-full max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[1, 2, 3].map((item) => (
                  <div 
                    key={item}
                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-theme-md"
                  >
                    <div className="w-full h-48 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-4 animate-pulse"></div>
                    <div className="flex items-center mt-auto">
                      <div className="h-4 bg-gray-200 rounded w-16 mr-3 animate-pulse"></div>
                      <div className="h-6 bg-primary/30 rounded-full w-20 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-theme-md animate-pulse">
                <div className="h-7 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-64 bg-gray-200 rounded-md"></div>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="h-12 bg-gray-200 rounded-lg"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {saleItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {saleItems.map((item) => (
                  <div 
                    key={item._id} 
                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-theme-md hover:shadow-theme-lg transition-all"
                  >
                    {/* Product Image */}
                    <div className="w-full h-48 rounded-md mb-4 overflow-hidden">
                      {item.image ? (
                        <div className="relative w-full h-full">
                          <Image 
                            src={urlForImage(item.image).width(400).height(300).url()}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-background-alternate flex items-center justify-center">
                          <span className="text-black">No Product Image</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Product Details */}
                    <h3 className="text-lg font-semibold mb-2 text-black">{item.name}</h3>
                    <p className="text-black mb-4">{item.description}</p>
                    <div className="flex items-center mt-auto">
                      <span className="text-gray-500 line-through mr-3">{item.regularPrice}</span>
                      <span className="text-white bg-primary px-3 py-1 rounded-full font-bold text-md">{item.salePrice}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-theme-md mb-12 text-center">
                <p className="text-black text-lg">No sale items available. Please check back later.</p>
              </div>
            )}
            
            {/* Closeout Section */}
            {closeoutItems.length > 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-theme-md">
                <h3 className="text-xl font-semibold mb-6 text-black">Closeout Items</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative w-full h-64 rounded-md overflow-hidden">
                    {closeoutItems[0].image ? (
                      <Image 
                        src={urlForImage(closeoutItems[0].image).width(400).height(300).url()}
                        alt="Closeout Items"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-background-alternate flex items-center justify-center">
                        <span className="text-black">No Closeout Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">Closeout Sale</span>
                    </div>
                  </div>
                  <ul className="grid grid-cols-1 gap-4">
                    {closeoutItems.map((item) => (
                      <li key={item._id} className="flex items-center bg-background-alternate p-3 rounded-lg">
                        <span className="w-3 h-3 bg-primary rounded-full mr-3 flex-shrink-0"></span>
                        <span className="text-black font-medium">{item.title} {item.discount ? `- ${item.discount}` : ''}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8 p-4 border-t border-gray-200">
                  <p className="text-black text-center">
                    Sale prices valid through the end of the month. While supplies last. Cannot be combined with other offers.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-theme-md text-center">
                <p className="text-black text-lg">No closeout items available. Please check back later.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
} 