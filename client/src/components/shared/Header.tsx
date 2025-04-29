import { useState } from 'react';
import { useLocation } from 'wouter';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

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
    { name: 'Testimonials', path: '#testimonials' },
    { name: 'Insurance', path: '#insurance' },
    { name: 'Contact', path: '#contact', isButton: true }
  ];

  return (
    <header className="bg-primary py-4 text-white w-full z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#home" className="flex items-center" onClick={closeMobileMenu}>
            <span className="text-2xl font-bold font-['Montserrat'] tracking-tight">
              <span className="text-orange-500">BANADIR</span> AUTO BODY
            </span>
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button 
            onClick={toggleMobileMenu} 
            className="text-white bg-primary/80 hover:bg-orange-500/20 p-2 rounded-md focus:outline-none transition-colors"
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
                <span className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-md font-bold transition cursor-pointer inline-block shadow-md hover:shadow-lg">
                  {item.name}
                </span>
              </a>
            ) : (
              <a key={item.name} href={item.path} onClick={closeMobileMenu}>
                <span className={`text-white hover:text-orange-400 font-semibold transition cursor-pointer relative after:absolute after:w-0 after:h-0.5 after:bg-orange-400 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300`}>
                  {item.name}
                </span>
              </a>
            )
          ))}
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`${isMobileMenuOpen ? 'max-h-96 opacity-100 border-b border-white/10' : 'max-h-0 opacity-0 border-none'} bg-primary/95 backdrop-blur-sm lg:hidden overflow-hidden transition-all duration-300`}>
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          {navItems.map((item) => (
            <a key={item.name} href={item.path} onClick={closeMobileMenu}>
              <span className={item.isButton 
                ? "bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-md inline-block font-bold transition text-center w-full cursor-pointer shadow-md" 
                : `text-white hover:text-orange-400 py-2 font-semibold transition cursor-pointer block border-b border-white/10 pb-2`}>
                {item.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
