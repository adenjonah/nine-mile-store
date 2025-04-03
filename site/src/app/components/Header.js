'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-background-light border-b border-primary/20 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-6">
          {/* Logo and Name */}
          <div className="flex items-center">
            <div className="relative w-12 h-12 mr-3 shrink-0">
              <Image 
                src="/images/logo/nine-mile-logo.png"
                alt="Nine Mile Feed & Hardware Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-serif text-text-primary">Nine Mile Feed & Hardware</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <nav className="flex space-x-8">
              <Link href="/#home" className="font-medium text-text-primary hover:text-primary transition-all relative py-1">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/#on-sale" className="font-medium text-text-primary hover:text-primary transition-all relative py-1">
                On Sale
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/#services" className="font-medium text-text-primary hover:text-primary transition-all relative py-1">
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>
            <div className="ml-12 px-5 py-2 bg-primary/10 rounded border border-primary/20 text-md text-primary font-medium">(509)-466-9502</div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="focus:outline-none text-text-primary"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor" 
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                {isMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background-light border-t border-primary/10">
          <div className="px-2 pt-4 pb-6 space-y-3">
            <Link 
              href="/#home" 
              className="block px-4 py-2 text-base font-medium text-text-primary hover:text-primary transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/#on-sale" 
              className="block px-4 py-2 text-base font-medium text-text-primary hover:text-primary transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              On Sale
            </Link>
            <Link 
              href="/#services" 
              className="block px-4 py-2 text-base font-medium text-text-primary hover:text-primary transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <div className="mx-4 mt-4 px-4 py-3 bg-primary/10 rounded border border-primary/20 text-center font-medium text-primary">
              (509)-466-9502
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 