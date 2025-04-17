import { Link } from 'wouter';
import { COMPANY_PHONE } from '@/lib/constants';

const CallToAction = () => {
  const formattedPhone = COMPANY_PHONE.replace(/[^0-9]/g, '');
  
  return (
    <section className="py-12 bg-[#D4AF37] text-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold font-['Montserrat'] mb-6">Ready to Restore Your Vehicle?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Trust the experts at Banadir Auto Body Shop for all your repair needs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a 
            href={`tel:${formattedPhone}`} 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-md font-bold text-lg flex items-center justify-center transition"
          >
            <i className="fas fa-phone-alt mr-2"></i> Call Now
          </a>
          <Link href="/contact">
            <a className="bg-white hover:bg-opacity-90 text-primary px-8 py-4 rounded-md font-bold text-lg flex items-center justify-center transition">
              <i className="fas fa-calendar-alt mr-2"></i> Schedule Service
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
