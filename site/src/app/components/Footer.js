import { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '../../lib/sanity';

export default function Footer() {
  const [storeInfo, setStoreInfo] = useState({});
  const [storeHours, setStoreHours] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const currentYear = new Date().getFullYear();
  
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        
        // Fetch store info
        const info = await client.fetch(`
          *[_type == "storeInfo"][0] {
            storeName,
            phone,
            address,
            city
          }
        `);
        
        // Fetch store hours
        const hours = await client.fetch(`
          *[_type == "storeHours"][0] {
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday
          }
        `);
        
        setStoreInfo(info || {});
        setStoreHours(hours || {});
      } catch (error) {
        console.error('Error fetching footer data:', error);
        setStoreInfo({});
        setStoreHours({});
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  return (
    <footer className="bg-primary-dark text-background-light py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8 border-b border-primary-light/20 pb-8">
          {/* Contact Information */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-serif mb-5 text-background-light">{storeInfo.storeName || 'Nine Mile Feed & Hardware'}</h3>
            <address className="not-italic text-background-light/90">
              {storeInfo.address ? (
                <>
                  <p>{storeInfo.address}</p>
                  <p>{storeInfo.city}</p>
                  <p className="mt-3">Phone: {storeInfo.phone || 'Not available'}</p>
                </>
              ) : (
                <p>Contact information not available</p>
              )}
            </address>
          </div>
          
          {/* Quick Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-serif mb-5 text-background-light">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              <Link href="/#home" className="text-background-light/90 hover:text-background-light">
                Home
              </Link>
              <Link href="/#on-sale" className="text-background-light/90 hover:text-background-light">
                On Sale
              </Link>
              <Link href="/#services" className="text-background-light/90 hover:text-background-light">
                Services
              </Link>
              <Link href="/#feedback" className="text-background-light/90 hover:text-background-light">
                Feedback
              </Link>
            </nav>
          </div>
          
          {/* Business Hours */}
          <div>
            <h3 className="text-xl font-serif mb-5 text-background-light">Business Hours</h3>
            {Object.keys(storeHours).length > 0 ? (
              <div className="space-y-2 text-background-light/90">
                <p className="pb-2 border-b border-primary-light/10">
                  Monday - Friday: {storeHours.monday ? `${storeHours.monday}` : 'Not available'}
                </p>
                <p className="pb-2 border-b border-primary-light/10">
                  Saturday: {storeHours.saturday ? `${storeHours.saturday}` : 'Not available'}
                </p>
                <p>
                  Sunday: {storeHours.sunday ? `${storeHours.sunday}` : 'Not available'}
                </p>
              </div>
            ) : (
              <p className="text-background-light/90">Business hours not available</p>
            )}
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-background-light/80 pt-4">
          <p>&copy; {currentYear} {storeInfo.storeName || 'Nine Mile Feed & Hardware'}. All rights reserved.</p>
          <p className="mt-2 font-serif italic">Under new ownership and soon new direction!</p>
        </div>
      </div>
    </footer>
  );
} 