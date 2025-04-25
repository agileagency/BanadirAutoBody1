import { useState } from 'react';
import { Link, useLocation } from 'wouter';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Insurance', path: '/insurance' },
    { name: 'Contact Us', path: '/contact', isButton: true }
  ];
  
  // Admin link - separate from main navigation
  const adminLink = { name: 'Admin', path: '/admin' };

  return (
    <header className="bg-primary text-white w-full relative z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold font-['Montserrat'] tracking-tight">
              <span className="text-[#D4AF37]">BANADIR</span> AUTO BODY
            </span>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} className="text-white hover:text-[#D4AF37] focus:outline-none">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            item.isButton ? (
              <Link key={item.name} href={item.path} onClick={closeMobileMenu}>
                <span className="bg-[#D4AF37] hover:bg-opacity-90 text-primary px-5 py-2 rounded-md font-bold transition cursor-pointer inline-block">
                  {item.name}
                </span>
              </Link>
            ) : (
              <Link key={item.name} href={item.path} onClick={closeMobileMenu}>
                <span className={`text-white hover:text-[#D4AF37] font-semibold transition cursor-pointer ${location === item.path ? 'text-[#D4AF37]' : ''}`}>
                  {item.name}
                </span>
              </Link>
            )
          ))}
          
          {/* Admin Link */}
          <div className="border-l border-white/30 pl-4">
            <Link href={adminLink.path} onClick={closeMobileMenu}>
              <span className={`text-white hover:text-[#D4AF37] font-semibold transition cursor-pointer ${location === adminLink.path ? 'text-[#D4AF37]' : ''}`}>
                {adminLink.name}
              </span>
            </Link>
          </div>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} bg-primary lg:hidden`}>
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link key={item.name} href={item.path} onClick={closeMobileMenu}>
              <span className={item.isButton 
                ? "bg-[#D4AF37] text-primary px-5 py-2 rounded-md inline-block font-bold transition text-center w-full cursor-pointer" 
                : `text-white hover:text-[#D4AF37] py-2 font-semibold transition cursor-pointer block ${location === item.path ? 'text-[#D4AF37]' : ''}`}>
                {item.name}
              </span>
            </Link>
          ))}
          
          {/* Admin Link for Mobile */}
          <div className="border-t border-white/30 pt-2 mt-2">
            <Link href={adminLink.path} onClick={closeMobileMenu}>
              <span className={`text-white hover:text-[#D4AF37] py-2 font-semibold transition cursor-pointer block ${location === adminLink.path ? 'text-[#D4AF37]' : ''}`}>
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
