'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { client } from '../../lib/sanity';
import { urlForImage } from '../../lib/sanity-image';

export default function OnSaleSection() {
  const [saleItems, setSaleItems] = useState([]);
  const [closeoutItems, setCloseoutItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fallback data in case Sanity isn't populated yet
  const fallbackSaleItems = [
    {
      id: 1,
      name: 'Miracle-Gro Potting Mix',
      description: '2 cu. ft. bag - Perfect for all potted plants',
      regularPrice: '$12.99',
      salePrice: '$9.99',
      image: 'potting-mix.png',
    },
    {
      id: 2,
      name: 'Weber Charcoal Grill',
      description: '22-inch Original Kettle Premium Charcoal Grill',
      regularPrice: '$175.00',
      salePrice: '$149.99',
      image: 'charcoal-grill.png',
    },
    {
      id: 3,
      name: 'Premium Bird Seed Mix',
      description: '20 lb bag - Attracts a variety of wild birds',
      regularPrice: '$24.99',
      salePrice: '$19.99',
      image: 'bird-seed.png',
    },
  ];
  
  const fallbackCloseoutItems = [
    "Assorted Garden Tools - 30% off",
    "Select Pet Toys - Buy One Get One Free",
    "Remaining Summer Items - Up to 50% off",
    "Lawn Fertilizer - 25% off",
  ];
  
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        
        // Fetch products on sale
        const products = await client.fetch(`
          *[_type == "product" && onSale == true] {
            _id,
            name,
            description,
            regularPrice,
            salePrice,
            image
          }
        `);
        
        // Fetch closeout items
        const closeouts = await client.fetch(`
          *[_type == "closeoutItem" && active == true] {
            _id,
            title
          }
        `);
        
        // If we have products from Sanity, use them, otherwise use fallback data
        setSaleItems(products.length > 0 ? products : fallbackSaleItems);
        setCloseoutItems(closeouts.length > 0 
          ? closeouts.map(item => item.title) 
          : fallbackCloseoutItems);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Use fallback data if there's an error
        setSaleItems(fallbackSaleItems);
        setCloseoutItems(fallbackCloseoutItems);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, [fallbackSaleItems, fallbackCloseoutItems]);
  
  return (
    <section id="on-sale" className="py-12 bg-background-alternate">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2 text-black">ON SALE</h2>
        <p className="text-center text-xl mb-8 text-black">THIS WEEK&apos;S SPECIALS</p>
        
        {/* Sale Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {saleItems.map((item) => (
            <div 
              key={item._id || item.id} 
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-theme-md hover:shadow-theme-lg transition-all"
            >
              {/* Product Image */}
              <div className="w-full h-48 rounded-md mb-4 overflow-hidden">
                {item.image ? (
                  <div className="relative w-full h-full">
                    <Image 
                      src={item.image.asset 
                        ? urlForImage(item.image).width(400).height(300).url() 
                        : `/images/products/${item.image}`}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-background-alternate flex items-center justify-center">
                    <span className="text-black">Product Image</span>
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
        
        {/* Closeout Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-theme-md">
          <h3 className="text-xl font-semibold mb-6 text-black">Closeout Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative w-full h-64 rounded-md overflow-hidden">
              <Image 
                src="/images/products/garden-tools.png"
                alt="Garden Tools on Sale"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
                <span className="text-white font-bold text-xl">Closeout Sale</span>
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-4">
              {closeoutItems.map((item, index) => (
                <li key={index} className="flex items-center bg-background-alternate p-3 rounded-lg">
                  <span className="w-3 h-3 bg-primary rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-black font-medium">{item}</span>
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
      </div>
    </section>
  );
} 