'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '../../lib/sanity';
import { urlForImage } from '../../lib/sanity-image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [storeName, setStoreName] = useState('Nine Mile Hardware');
  const [logo, setLogo] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    async function fetchStoreInfo() {
      try {
        // Fetch store name
        const storeInfo = await client.fetch(`
          *[_type == "storeInfo"][0] {
            storeName
          }
        `);
        
        // Fetch logo
        const logoData = await client.fetch(`
          *[_type == "siteImage" && category == "Logo"][0] {
            title,
            image
          }
        `);
        
        if (storeInfo?.storeName) {
          setStoreName(storeInfo.storeName);
        }
        
        if (logoData?.image) {
          setLogo(logoData);
        }
      } catch (error) {
        console.error('Error fetching navbar data:', error);
      }
    }
    
    fetchStoreInfo();
    
    // Add scroll listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 shadow-md' : 'py-4'} bg-white`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {logo?.image ? (
              <div className="relative w-12 h-12 mr-3">
                <Image 
                  src={urlForImage(logo.image).width(48).height(48).url()}
                  alt={logo.title || storeName}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mr-3">
                <span className="font-bold text-xl">NH</span>
              </div>
            )}
            <span className="font-bold text-xl text-primary">
              {storeName}
            </span>
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-black"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="#home" label="Home" />
            <NavLink href="#services" label="Services" />
            <NavLink href="#on-sale" label="On Sale" />
            <NavLink href="#about" label="About" />
            <NavLink href="#contact" label="Contact" />
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-60 mt-4' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col space-y-3 bg-white p-4 rounded-lg shadow-md">
            <MobileNavLink href="#home" label="Home" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="#services" label="Services" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="#on-sale" label="On Sale" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="#about" label="About" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink href="#contact" label="Contact" onClick={() => setIsMenuOpen(false)} />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, label }) {
  return (
    <Link
      href={href}
      className="text-sm font-semibold text-black transition-colors hover:text-primary"
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-black hover:text-primary font-medium block py-2"
    >
      {label}
    </Link>
  );
} 