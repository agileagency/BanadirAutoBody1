import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import Map from '@/components/contact/Map';
import { Helmet } from 'react-helmet';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - Banadir Auto Body Shop</title>
        <meta name="description" content="Contact Banadir Auto Body Shop in Minneapolis, MN for all your auto repair needs. Schedule a service, request a quote, or ask us a question." />
      </Helmet>
      
      <div className="pt-8">
        <div className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-['Montserrat'] mb-6">Contact Us</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Schedule a repair, request a quote, or ask us a question. We're here to help.
            </p>
          </div>
        </div>
        
        <section id="contact" className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <ContactForm />
              </div>
              
              <div>
                <ContactInfo />
                <Map />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-tools text-primary text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold font-['Montserrat'] mb-4 text-primary">Repair Services</h3>
                <p className="text-gray-700 mb-6">
                  Need to schedule a repair or get an estimate? Our team is ready to help you get your vehicle back on the road.
                </p>
                <a 
                  href="tel:6125551234" 
                  className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md font-semibold transition"
                >
                  Schedule Now
                </a>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-file-invoice-dollar text-primary text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold font-['Montserrat'] mb-4 text-primary">Insurance Claims</h3>
                <p className="text-gray-700 mb-6">
                  Need assistance with an insurance claim? Our experienced team can help guide you through the process.
                </p>
                <a 
                  href="#contact" 
                  className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md font-semibold transition"
                >
                  Get Help
                </a>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-question-circle text-primary text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold font-['Montserrat'] mb-4 text-primary">General Inquiries</h3>
                <p className="text-gray-700 mb-6">
                  Have questions about our services? Our knowledgeable team is here to provide the information you need.
                </p>
                <a 
                  href="mailto:info@banadirauto.com" 
                  className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md font-semibold transition"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
