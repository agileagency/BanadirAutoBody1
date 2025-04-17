import { STATS, COMPANY_FOUNDED } from '@/lib/constants';
import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Banadir Auto Body Shop</title>
        <meta name="description" content="Banadir Auto Body Shop has been the trusted choice for quality auto repairs in Minneapolis for over a decade. Learn about our team and commitment to excellence." />
      </Helmet>
      
      <div className="pt-8">
        <div className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-['Montserrat'] mb-6">About Banadir Auto Body</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Minneapolis' trusted auto repair shop committed to quality service and customer satisfaction.
            </p>
          </div>
        </div>
        
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] mb-6 text-primary">Our Story</h2>
                <p className="text-lg mb-6 text-gray-700">
                  Established in Minneapolis in {COMPANY_FOUNDED}, Banadir Auto Body Shop has been the trusted choice for quality auto repairs for over a decade.
                </p>
                <p className="text-lg mb-6 text-gray-700">
                  Our team of certified technicians brings years of experience and dedication to every repair, ensuring your vehicle receives the highest quality service possible.
                </p>
                <p className="text-lg mb-8 text-gray-700">
                  We pride ourselves on honesty, transparency, and building lasting relationships with our customers. At Banadir, you're not just a customer - you're family.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {STATS.map((stat, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="text-4xl font-bold text-[#D4AF37]">{stat.value}</span>
                      <span className="text-gray-600">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <div className="relative">
                  <img 
                    src="/images/about-hero.svg" 
                    alt="Banadir Auto Body Shop facility" 
                    className="w-full h-auto rounded-lg shadow-xl"
                  />
                  <div className="absolute -bottom-8 -left-8 bg-[#D4AF37] p-6 rounded-lg shadow-lg">
                    <div className="text-primary font-bold text-2xl">Since {COMPANY_FOUNDED}</div>
                    <div className="text-primary/90 font-medium">Trusted in Minneapolis</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-[#F9F9F9]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] mb-4 text-primary">Our Values</h2>
              <p className="text-lg max-w-2xl mx-auto text-gray-600">
                These core principles guide everything we do at Banadir Auto Body Shop.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-medal text-primary text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold font-['Montserrat'] mb-4 text-primary">Quality</h3>
                <p className="text-gray-700">
                  We take pride in delivering the highest quality repairs using premium materials and expert craftsmanship. Every vehicle that leaves our shop meets our rigorous standards.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-handshake text-primary text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold font-['Montserrat'] mb-4 text-primary">Integrity</h3>
                <p className="text-gray-700">
                  Honesty and transparency are at the heart of our business. We provide clear explanations, upfront pricing, and always act in our customers' best interests.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-users text-primary text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold font-['Montserrat'] mb-4 text-primary">Customer Focus</h3>
                <p className="text-gray-700">
                  We believe in building lasting relationships with our customers through exceptional service, clear communication, and going above and beyond to exceed expectations.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] mb-4 text-primary">Our Expert Team</h2>
              <p className="text-lg max-w-2xl mx-auto text-gray-600">
                Meet the skilled professionals behind our exceptional service.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#F9F9F9] rounded-lg overflow-hidden">
                <div className="h-64 bg-gray-300 relative">
                  <img 
                    src="/images/team-owner.svg" 
                    alt="Ahmed Hassan, Owner" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold font-['Montserrat'] text-primary mb-1">Ahmed Hassan</h3>
                  <p className="text-[#D4AF37] font-semibold mb-4">Owner & Master Technician</p>
                  <p className="text-gray-700 mb-4">
                    With over 20 years of experience in auto body repair, Ahmed founded Banadir Auto Body Shop with a vision of providing quality repairs and exceptional customer service.
                  </p>
                </div>
              </div>
              
              <div className="bg-[#F9F9F9] rounded-lg overflow-hidden">
                <div className="h-64 bg-gray-300 relative">
                  <img 
                    src="/images/team-manager.svg" 
                    alt="Sarah Johnson, Service Manager" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold font-['Montserrat'] text-primary mb-1">Sarah Johnson</h3>
                  <p className="text-[#D4AF37] font-semibold mb-4">Service Manager</p>
                  <p className="text-gray-700 mb-4">
                    Sarah oversees our daily operations, ensuring every customer receives prompt, professional service and every repair meets our high standards.
                  </p>
                </div>
              </div>
              
              <div className="bg-[#F9F9F9] rounded-lg overflow-hidden">
                <div className="h-64 bg-gray-300 relative">
                  <img 
                    src="/images/team-technician.svg" 
                    alt="Michael Rodriguez, Lead Technician" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold font-['Montserrat'] text-primary mb-1">Michael Rodriguez</h3>
                  <p className="text-[#D4AF37] font-semibold mb-4">Lead Technician</p>
                  <p className="text-gray-700 mb-4">
                    Michael brings 15 years of specialized experience in collision repair and leads our team of technicians with expertise and attention to detail.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
