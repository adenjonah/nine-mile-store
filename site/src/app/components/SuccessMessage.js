'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessMessage() {
  const searchParams = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);

  // Check for success parameter in URL
  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setShowSuccess(true);
      
      // Hide the success message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccess(false);
        
        // Remove the success parameter from URL without page reload
        const url = new URL(window.location.href);
        url.searchParams.delete('success');
        window.history.replaceState({}, '', url);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!showSuccess) return null;

  return (
    <div className="bg-status-success/10 border border-status-success p-8 rounded-sm text-center mb-8">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-status-success mb-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      <h2 className="text-2xl font-serif mb-4 text-text-primary">Thank You!</h2>
      <p className="text-text-primary mb-4">Your feedback has been submitted successfully.</p>
      <p className="text-text-primary">We appreciate your input and will use it to improve our store and services.</p>
    </div>
  );
} 