import { Mail, MapPin, Phone, Facebook, Instagram, Twitter, Clock, ArrowUpCircle } from 'lucide-react';
import { COMPANY_NAME, COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_PHONE, COMPANY_FOUNDED, BUSINESS_HOURS } from '@/lib/constants';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="bg-[url('/noise.svg')] w-full h-full"></div>
      </div>
      <div className="absolute -right-20 bottom-10 w-40 h-40 bg-white/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -left-20 top-20 w-40 h-40 bg-white/5 rounded-full filter blur-3xl"></div>
      
      {/* Back to top button */}
      <div className="absolute right-8 -top-5 z-10">
        <button 
          onClick={scrollToTop}
          className="bg-white text-primary p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          aria-label="Back to top"
        >
          <ArrowUpCircle className="w-6 h-6 group-hover:animate-bounce" />
        </button>
      </div>
      
      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold font-['Montserrat'] mb-6">
              <span className="text-teal-500">BANADIR</span> AUTO BODY
            </h3>
            <p className="text-white/90 mb-6">
              Minneapolis' trusted auto body shop providing quality repairs and exceptional customer service since {COMPANY_FOUNDED}.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4 mb-8">
              <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300">
                <Facebook className="w-5 h-5 text-teal-400" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300">
                <Instagram className="w-5 h-5 text-teal-400" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300">
                <Twitter className="w-5 h-5 text-teal-400" />
              </a>
            </div>
            
            {/* Insurance Badges */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4 relative inline-block">
                We Accept All Insurance
                <div className="absolute left-0 -bottom-1 w-full h-0.5 bg-teal-500/40"></div>
              </h4>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="bg-white/10 text-white/90 text-xs px-3 py-1 rounded-full">
                  State Farm
                </span>
                <span className="bg-white/10 text-white/90 text-xs px-3 py-1 rounded-full">
                  GEICO
                </span>
                <span className="bg-white/10 text-white/90 text-xs px-3 py-1 rounded-full">
                  Allstate
                </span>
                <span className="bg-white/10 text-white/90 text-xs px-3 py-1 rounded-full">
                  Progressive
                </span>
                <span className="bg-white/10 text-white/90 text-xs px-3 py-1 rounded-full">
                  All Providers
                </span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Quick Links
              <div className="absolute left-0 -bottom-1 w-1/2 h-0.5 bg-teal-500/80"></div>
            </h3>
            <div className="grid grid-cols-1 gap-y-3">
              <a href="#home" className="text-white/80 hover:text-teal-400 transition-colors duration-300 flex items-center group">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3 group-hover:scale-125 transition-all duration-300"></div>
                Home
              </a>
              <a href="#services" className="text-white/80 hover:text-teal-400 transition-colors duration-300 flex items-center group">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3 group-hover:scale-125 transition-all duration-300"></div>
                Services
              </a>
              <a href="#gallery" className="text-white/80 hover:text-teal-400 transition-colors duration-300 flex items-center group">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3 group-hover:scale-125 transition-all duration-300"></div>
                Gallery
              </a>
              <a href="#testimonials" className="text-white/80 hover:text-teal-400 transition-colors duration-300 flex items-center group">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3 group-hover:scale-125 transition-all duration-300"></div>
                Testimonials
              </a>
              <a href="#insurance" className="text-white/80 hover:text-teal-400 transition-colors duration-300 flex items-center group">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3 group-hover:scale-125 transition-all duration-300"></div>
                Insurance
              </a>
              <a href="#contact" className="text-white/80 hover:text-teal-400 transition-colors duration-300 flex items-center group">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3 group-hover:scale-125 transition-all duration-300"></div>
                Contact
              </a>
            </div>
            
            {/* Business Hours */}
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6 relative inline-block">
                Business Hours
                <div className="absolute left-0 -bottom-1 w-1/2 h-0.5 bg-teal-500/80"></div>
              </h3>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <Clock className="w-5 h-5 text-teal-400 mt-1" />
                  <div className="space-y-2 text-white/90">
                    <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 4:00 PM</p>
                    <p className="text-teal-400">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Contact Information
              <div className="absolute left-0 -bottom-1 w-1/2 h-0.5 bg-teal-500/80"></div>
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="bg-white/10 p-3 rounded-lg mr-4">
                  <MapPin className="w-5 h-5 text-teal-400 mt-1" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Our Location</h4>
                  <p className="text-white/80">3013 Pillsbury Ave<br />Minneapolis, MN 55408</p>
                  <a 
                    href="https://maps.google.com/?q=3013+Pillsbury+Ave+Minneapolis+MN+55408" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-teal-400 text-sm flex items-center mt-2 hover:underline"
                  >
                    Get Directions
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-white/10 p-3 rounded-lg mr-4">
                  <Phone className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Phone Number</h4>
                  <p className="text-white/80">(612) 555-1234</p>
                  <a 
                    href="tel:6125551234" 
                    className="text-teal-400 text-sm flex items-center mt-2 hover:underline"
                  >
                    Call Now
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-white/10 p-3 rounded-lg mr-4">
                  <Mail className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Email Address</h4>
                  <p className="text-white/80">info@banadirauto.com</p>
                  <a 
                    href="mailto:info@banadirauto.com" 
                    className="text-teal-400 text-sm flex items-center mt-2 hover:underline"
                  >
                    Send Email
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Banadir Auto Body Shop. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a href="#" className="text-white/70 text-sm hover:text-teal-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/70 text-sm hover:text-teal-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-white/70 text-sm hover:text-teal-400 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
