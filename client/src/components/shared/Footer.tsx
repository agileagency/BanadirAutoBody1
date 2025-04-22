import { Link } from 'wouter';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Insurance', path: '/insurance' },
    { name: 'Contact', path: '/contact' }
  ];
  
  const services = [
    { name: 'Collision Repair', path: '/services#collision' },
    { name: 'Paint Services', path: '/services#paint' },
    { name: 'Frame Straightening', path: '/services#frame' },
    { name: 'Dent Repair', path: '/services#dent' },
    { name: 'Auto Glass', path: '/services#glass' },
    { name: 'Detailing', path: '/services#detailing' }
  ];

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold font-['Montserrat'] mb-6">Banadir Auto Body</h3>
            <p className="opacity-90 mb-6">
              Minneapolis' trusted auto body shop providing quality repairs and exceptional customer service since 2012.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#D4AF37]">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-[#D4AF37]">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-[#D4AF37]">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-[#D4AF37]">
                <i className="fab fa-yelp"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold font-['Montserrat'] mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.path}>
                    <a className="opacity-90 hover:opacity-100 hover:text-[#D4AF37]">{link.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold font-['Montserrat'] mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.path}>
                    <a className="opacity-90 hover:opacity-100 hover:text-[#D4AF37]">{service.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold font-['Montserrat'] mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-[#D4AF37]"></i>
                <span className="opacity-90">3013 Pillsbury Ave<br />Minneapolis, MN 55408</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-[#D4AF37]"></i>
                <span className="opacity-90">(612) 555-1234</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-[#D4AF37]"></i>
                <span className="opacity-90">info@banadirauto.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-clock mt-1 mr-3 text-[#D4AF37]"></i>
                <div className="opacity-90">
                  <p>Mon-Fri: 8:00 AM - 6:00 PM</p>
                  <p>Sat: 9:00 AM - 4:00 PM</p>
                  <p>Sun: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="opacity-80 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Banadir Auto Body Shop. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="opacity-80 text-sm hover:opacity-100">Privacy Policy</a>
              <a href="#" className="opacity-80 text-sm hover:opacity-100">Terms of Service</a>
              <a href="#" className="opacity-80 text-sm hover:opacity-100">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
