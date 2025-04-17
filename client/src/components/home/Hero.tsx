import { Link } from 'wouter';

const Hero = () => {
  return (
    <section className="relative h-[32rem] bg-gray-900 overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero-image.svg" 
          alt="Professional auto mechanic working on a vehicle" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      
      {/* Hero Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-10"></div>
      
      <div className="container mx-auto px-4 h-full flex items-center relative z-20">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Montserrat'] leading-tight mb-6">
            Minneapolis' Premier <span className="text-[#D4AF37]">Auto Body Shop</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Expert repairs for all vehicle types with a commitment to quality and customer satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/contact">
              <a className="bg-[#D4AF37] hover:bg-opacity-90 text-primary px-8 py-4 rounded-md font-bold text-lg transition text-center">
                Schedule Repair
              </a>
            </Link>
            <Link href="/services">
              <a className="border-2 border-white hover:border-[#D4AF37] hover:text-[#D4AF37] text-white px-8 py-4 rounded-md font-bold text-lg transition text-center">
                Our Services
              </a>
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center mt-12 gap-8">
            <div className="flex items-center">
              <i className="fas fa-shield-alt text-[#D4AF37] text-3xl mr-3"></i>
              <span className="text-lg">Certified Technicians</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-check-circle text-[#D4AF37] text-3xl mr-3"></i>
              <span className="text-lg">Quality Guaranteed</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-file-invoice-dollar text-[#D4AF37] text-3xl mr-3"></i>
              <span className="text-lg">All Insurance Accepted</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
