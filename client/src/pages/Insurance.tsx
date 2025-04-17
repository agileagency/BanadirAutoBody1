import { Link } from 'wouter';
import { INSURANCE_PROCESS, INSURANCE_COMPANIES } from '@/lib/constants';
import { Helmet } from 'react-helmet';

const Insurance = () => {
  return (
    <>
      <Helmet>
        <title>Insurance Information - Banadir Auto Body Shop</title>
        <meta name="description" content="We work with ALL insurance providers to make your repair experience seamless. Learn about our insurance claims process and how we coordinate with your provider." />
      </Helmet>
      
      <div className="pt-8">
        <div className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-['Montserrat'] mb-6">Insurance Claims Made Easy</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              We work with ALL insurance providers to make your repair experience as smooth as possible.
            </p>
          </div>
        </div>
        
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] mb-6 text-primary">We Handle Your Insurance Claim</h2>
                <p className="text-lg mb-6 text-gray-700">
                  At Banadir Auto Body Shop, we take the stress out of the insurance claims process. Our experienced team works directly with your insurance company to ensure a seamless repair experience.
                </p>
                <p className="text-lg mb-8 text-gray-700">
                  From the initial assessment to the final inspection, we handle all communication with your insurance adjuster, ensuring your vehicle receives all the necessary repairs covered by your policy.
                </p>
                
                <div className="bg-[#F9F9F9] p-6 rounded-lg shadow-md mb-8">
                  <h3 className="text-xl font-bold font-['Montserrat'] mb-4 text-primary">Our Insurance Process</h3>
                  <ul className="space-y-4">
                    {INSURANCE_PROCESS.map((step) => (
                      <li key={step.step} className="flex items-start">
                        <div className="bg-[#D4AF37] text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          {step.step}
                        </div>
                        <div>
                          <span className="font-semibold">{step.title}</span>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Insurance claim process" 
                  className="rounded-lg shadow-xl mb-8"
                />
                
                <div className="bg-primary p-8 rounded-lg text-white">
                  <h3 className="text-xl font-bold font-['Montserrat'] mb-4">Common Insurance Questions</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold mb-2">Do I have to use the shop my insurance recommends?</h4>
                      <p className="opacity-90">
                        No. You have the legal right to choose any repair facility you prefer, regardless of what your insurance company suggests.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold mb-2">Will my rates go up if I file a claim?</h4>
                      <p className="opacity-90">
                        Rate increases depend on your insurance policy and who was at fault in the accident. We can help explain the potential implications.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold mb-2">What if my insurance estimate doesn't cover all the damage?</h4>
                      <p className="opacity-90">
                        We communicate directly with your insurance company to ensure all damage is documented and covered in the repair process.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold mb-2">Do I have to pay my deductible?</h4>
                      <p className="opacity-90">
                        Yes, typically you're responsible for paying your deductible directly to the repair shop. We can discuss payment options with you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-[#F9F9F9]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] mb-4 text-primary">Insurance Companies We Work With</h2>
              <p className="text-lg max-w-2xl mx-auto text-gray-600">
                We work with all major insurance providers to ensure a smooth claims process.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {INSURANCE_COMPANIES.map((company, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-32">
                  <div className="text-center text-primary font-bold text-xl">{company}</div>
                </div>
              ))}
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-32 col-span-2 md:col-span-4">
                <div className="text-center text-primary font-bold text-xl">And Many More Insurance Providers</div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold font-['Montserrat'] mb-6">Need Help With Your Insurance Claim?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Our team is ready to assist you with the entire claims process.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/contact">
                <a className="bg-[#D4AF37] hover:bg-opacity-90 text-primary px-8 py-4 rounded-md font-bold text-lg transition">
                  Start Your Claim
                </a>
              </Link>
              <a 
                href="tel:6125551234" 
                className="bg-white hover:bg-opacity-90 text-primary px-8 py-4 rounded-md font-bold text-lg transition"
              >
                Call For Assistance
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Insurance;
