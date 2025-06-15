'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useStoreData } from '../../lib/StoreDataContext';
import SocialLinks from '../../components/SocialLinks';

export default function FooterSection() {
  const { storeInfo, storeHours, loading } = useStoreData();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">{storeInfo.storeName || 'Nine Mile Hardware'}</h3>
            <p className="mb-4">
              Your local hardware store for all your home and garden needs. 
              Family owned and operated, serving the community for over 25 years.
            </p>
            <SocialLinks className="mt-4" />
          </div>
          
          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            {storeInfo.address ? (
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mt-1 mr-2 text-primary">
                    <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p>{storeInfo.address}</p>
                    <p>{storeInfo.city}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mt-1 mr-2 text-primary">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                  </svg>
                  <p>{storeInfo.phone || "Phone not available"}</p>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mt-1 mr-2 text-primary">
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                  </svg>
                  <p>{storeInfo.email || "Email not available"}</p>
                </li>
              </ul>
            ) : (
              <p>Contact information not available. Please check back later.</p>
            )}
          </div>
          
          {/* Hours Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">Store Hours</h3>
            {Object.keys(storeHours).length > 0 ? (
              <ul className="space-y-1">
                <li className="flex justify-between">
                  <span>Monday:</span>
                  <span>{storeHours.monday || "Not available"}</span>
                </li>
                <li className="flex justify-between">
                  <span>Tuesday:</span>
                  <span>{storeHours.tuesday || "Not available"}</span>
                </li>
                <li className="flex justify-between">
                  <span>Wednesday:</span>
                  <span>{storeHours.wednesday || "Not available"}</span>
                </li>
                <li className="flex justify-between">
                  <span>Thursday:</span>
                  <span>{storeHours.thursday || "Not available"}</span>
                </li>
                <li className="flex justify-between">
                  <span>Friday:</span>
                  <span>{storeHours.friday || "Not available"}</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span>{storeHours.saturday || "Not available"}</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span>{storeHours.sunday || "Not available"}</span>
                </li>
              </ul>
            ) : (
              <p>Store hours not available. Please check back later.</p>
            )}
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-4 text-center text-sm">
          <p>&copy; {currentYear} {storeInfo.storeName || 'Nine Mile Hardware'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 