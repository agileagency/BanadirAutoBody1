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

  return (
    <header className="bg-primary text-white w-full fixed top-0 z-50 shadow-md">
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
                <a className="bg-[#D4AF37] hover:bg-opacity-90 text-primary px-5 py-2 rounded-md font-bold transition">
                  {item.name}
                </a>
              </Link>
            ) : (
              <Link key={item.name} href={item.path} onClick={closeMobileMenu}>
                <a className={`text-white hover:text-[#D4AF37] font-semibold transition ${location === item.path ? 'text-[#D4AF37]' : ''}`}>
                  {item.name}
                </a>
              </Link>
            )
          ))}
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} bg-primary lg:hidden`}>
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link key={item.name} href={item.path} onClick={closeMobileMenu}>
              <a className={item.isButton 
                ? "bg-[#D4AF37] text-primary px-5 py-2 rounded-md inline-block font-bold transition text-center" 
                : `text-white hover:text-[#D4AF37] py-2 font-semibold transition ${location === item.path ? 'text-[#D4AF37]' : ''}`}>
                {item.name}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
