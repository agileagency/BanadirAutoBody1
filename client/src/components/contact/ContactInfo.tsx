import { COMPANY_PHONE, COMPANY_EMAIL, COMPANY_ADDRESS, BUSINESS_HOURS } from '@/lib/constants';

const ContactInfo = () => {
  return (
    <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm mb-8">
      <h3 className="text-2xl font-bold font-['Montserrat'] mb-6">Contact Information</h3>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="text-[#D4AF37] text-xl mt-1 mr-4">
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <div>
            <h4 className="font-bold mb-1">Our Location</h4>
            <p className="opacity-90">{COMPANY_ADDRESS}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="text-[#D4AF37] text-xl mt-1 mr-4">
            <i className="fas fa-phone-alt"></i>
          </div>
          <div>
            <h4 className="font-bold mb-1">Phone Number</h4>
            <p className="opacity-90">{COMPANY_PHONE}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="text-[#D4AF37] text-xl mt-1 mr-4">
            <i className="fas fa-envelope"></i>
          </div>
          <div>
            <h4 className="font-bold mb-1">Email Address</h4>
            <p className="opacity-90">{COMPANY_EMAIL}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="text-[#D4AF37] text-xl mt-1 mr-4">
            <i className="fas fa-clock"></i>
          </div>
          <div>
            <h4 className="font-bold mb-1">Business Hours</h4>
            <p className="opacity-90">{BUSINESS_HOURS.weekdays}</p>
            <p className="opacity-90">{BUSINESS_HOURS.saturday}</p>
            <p className="opacity-90">{BUSINESS_HOURS.sunday}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h4 className="font-bold mb-3">Connect With Us</h4>
        <div className="flex space-x-4">
          <a href="#" className="text-white hover:text-[#D4AF37] text-xl">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-white hover:text-[#D4AF37] text-xl">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-white hover:text-[#D4AF37] text-xl">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-white hover:text-[#D4AF37] text-xl">
            <i className="fab fa-yelp"></i>
          </a>
          <a href="#" className="text-white hover:text-[#D4AF37] text-xl">
            <i className="fab fa-google"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
