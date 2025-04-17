import { Link } from 'wouter';
import { INSURANCE_PROCESS, INSURANCE_COMPANIES } from '@/lib/constants';

const InsuranceProcess = () => {
  return (
    <section id="insurance-section" className="py-20 bg-[#F9F9F9]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] mb-6 text-primary">Insurance Claims Made Easy</h2>
            <p className="text-lg mb-6 text-gray-700">
              At Banadir Auto Body Shop, we work with <span className="font-semibold">ALL insurance providers</span> to make your repair experience as smooth as possible.
            </p>
            <p className="text-lg mb-8 text-gray-700">
              Our team has years of experience navigating the claims process and will work directly with your insurance company to ensure you receive the full benefits your policy allows.
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
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
            
            <Link href="/insurance">
              <a className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-md font-bold text-lg transition">
                Start Your Claim
              </a>
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {INSURANCE_COMPANIES.map((company, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-24">
                <div className="text-center text-primary font-bold">{company}</div>
              </div>
            ))}
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center h-24 flex-col">
              <div className="text-center text-primary font-bold">And Many</div>
              <div className="text-center text-primary font-bold">More</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsuranceProcess;
