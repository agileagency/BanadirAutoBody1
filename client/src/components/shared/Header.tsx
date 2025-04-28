import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Phone } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Single page navigation
  const navItems = [
    { name: 'Home', path: '#home' },
    { name: 'Services', path: '#services' },
    { name: 'Gallery', path: '#gallery' },
    { name: 'Testimonials', path: '#testimonials' },
    { name: 'Insurance', path: '#insurance' },
    { name: 'Contact', path: '#contact', isButton: true }
  ];
  
  // Admin link - separate from main navigation
  const adminLink = { name: 'Admin', path: '/admin' };

  return (
    <header className={`${scrolled ? 'bg-primary/95 backdrop-blur-sm shadow-lg py-3' : 'bg-primary py-4'} text-white w-full fixed z-50 transition-all duration-300`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#home" className="flex items-center" onClick={closeMobileMenu}>
            <span className={`${scrolled ? 'text-xl' : 'text-2xl'} font-bold font-['Montserrat'] tracking-tight transition-all duration-300`}>
              <span className="text-teal-600">BANADIR</span> AUTO BODY
            </span>
          </a>
        </div>

        {/* Contact Info - Desktop */}
        <div className="hidden md:flex items-center mr-6">
          <div className="bg-teal-600/20 px-4 py-2 rounded-full flex items-center">
            <Phone className="text-teal-600 w-4 h-4 mr-2" />
            <span className="text-white font-semibold">(612) 555-1234</span>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button 
            onClick={toggleMobileMenu} 
            className="text-white bg-primary/80 hover:bg-teal-600/20 p-2 rounded-md focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            item.isButton ? (
              <a key={item.name} href={item.path} onClick={closeMobileMenu}>
                <span className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md font-bold transition cursor-pointer inline-block shadow-md hover:shadow-lg">
                  {item.name}
                </span>
              </a>
            ) : (
              <a key={item.name} href={item.path} onClick={closeMobileMenu}>
                <span className={`text-white hover:text-teal-400 font-semibold transition cursor-pointer relative after:absolute after:w-0 after:h-0.5 after:bg-teal-400 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300`}>
                  {item.name}
                </span>
              </a>
            )
          ))}
          
          {/* Admin Link */}
          <div className="border-l border-white/30 pl-4">
            <Link href={adminLink.path} onClick={closeMobileMenu}>
              <span className="text-white/70 hover:text-teal-400 font-semibold transition cursor-pointer">
                {adminLink.name}
              </span>
            </Link>
          </div>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`${isMobileMenuOpen ? 'max-h-96 opacity-100 border-b border-white/10' : 'max-h-0 opacity-0 border-none'} bg-primary/95 backdrop-blur-sm lg:hidden overflow-hidden transition-all duration-300`}>
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          {navItems.map((item) => (
            <a key={item.name} href={item.path} onClick={closeMobileMenu}>
              <span className={item.isButton 
                ? "bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md inline-block font-bold transition text-center w-full cursor-pointer shadow-md" 
                : `text-white hover:text-teal-400 py-2 font-semibold transition cursor-pointer block border-b border-white/10 pb-2`}>
                {item.name}
              </span>
            </a>
          ))}
          
          {/* Admin Link for Mobile */}
          <div className="pt-2">
            <Link href={adminLink.path} onClick={closeMobileMenu}>
              <span className="text-white/70 hover:text-teal-400 py-2 font-semibold transition cursor-pointer block">
                {adminLink.name}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
