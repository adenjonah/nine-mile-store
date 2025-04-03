import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-dark text-background-light py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8 border-b border-primary-light/20 pb-8">
          {/* Contact Information */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-serif mb-5 text-background-light">Nine Mile Feed & Hardware</h3>
            <address className="not-italic text-background-light/90">
              <p>12516 N Nine Mile Rd</p>
              <p>Nine Mile Falls, WA 99026</p>
              <p className="mt-3">Phone: (509)-466-9502</p>
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
            <div className="space-y-2 text-background-light/90">
              <p className="pb-2 border-b border-primary-light/10">Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p className="pb-2 border-b border-primary-light/10">Saturday: 9:00 AM - 5:00 PM</p>
              <p>Sunday: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-background-light/80 pt-4">
          <p>&copy; {currentYear} Nine Mile Feed & Hardware. All rights reserved.</p>
          <p className="mt-2 font-serif italic">Under new ownership and soon new direction!</p>
        </div>
      </div>
    </footer>
  );
} 