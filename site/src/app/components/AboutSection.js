'use client';

import Image from 'next/image';
import { useStoreData } from '../../lib/StoreDataContext';
import { urlForImage } from '../../lib/sanity-image';

export default function AboutSection() {
  const { storeHours: originalStoreHours, storeInfo, loading } = useStoreData();
  
  // Override the store hours with corrected values
  const storeHours = {
    ...originalStoreHours,
    monday: "7:00 AM - 6:00 PM",
    tuesday: "7:00 AM - 6:00 PM"
  };
  
  return (
    <section id="about" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-black">ABOUT US</h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-pulse text-center">
              <p className="text-black">Loading store information...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Store Info */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-8 rounded-lg shadow-theme-md">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-black">Contact Information</h3>
                </div>
                {storeInfo.phone ? (
                  <>
                    <p className="text-lg font-medium text-black mb-2">{storeInfo.phone}</p>
                    <p className="text-black mb-1">{storeInfo.address || "No address available"}</p>
                    <p className="text-black mb-6">{storeInfo.city || "No city available"}</p>
                  </>
                ) : (
                  <p className="text-black mb-6">No contact information available. Please check back later.</p>
                )}
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-theme-md">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-black">Hours of Operation</h3>
                </div>
                {Object.keys(storeHours).length > 0 ? (
                  <div className="space-y-2 mb-6">
                    <p className="text-black bg-background-alternate px-3 py-2 rounded-md">Monday: {storeHours.monday || "Not available"}</p>
                    <p className="text-black bg-background-alternate px-3 py-2 rounded-md">Tuesday: {storeHours.tuesday || "Not available"}</p>
                    <p className="text-black bg-background-alternate px-3 py-2 rounded-md">Wednesday: {storeHours.wednesday || "Not available"}</p>
                    <p className="text-black bg-background-alternate px-3 py-2 rounded-md">Thursday: {storeHours.thursday || "Not available"}</p>
                    <p className="text-black bg-background-alternate px-3 py-2 rounded-md">Friday: {storeHours.friday || "Not available"}</p>
                    <p className="text-black bg-background-alternate px-3 py-2 rounded-md">Saturday: {storeHours.saturday || "Not available"}</p>
                    <p className="text-black bg-background-alternate px-3 py-2 rounded-md">Sunday: {storeHours.sunday || "Not available"}</p>
                  </div>
                ) : (
                  <p className="text-black mb-6">No store hours available. Please check back later.</p>
                )}
              </div>
            </div>
            
            {/* Community Information */}
            <div className="bg-white p-8 rounded-lg shadow-theme-md">
              <h3 className="text-2xl font-bold mb-8 text-black text-center">Community Involvement</h3>
              
              <div>
                {storeInfo.communityText ? (
                  <>
                    <p className="text-black mb-4">
                      {storeInfo.communityText}
                    </p>
                    <p className="text-black mb-4">
                      Our team members are active in the Nine Mile Falls community, and we&apos;re proud to support local schools, youth sports teams, and community initiatives.
                    </p>
                    <p className="text-black">
                      Stop by the store to learn more about our upcoming community events and how you can get involved!
                    </p>
                  </>
                ) : (
                  <p className="text-black">No community information available. Please check back later.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
} 