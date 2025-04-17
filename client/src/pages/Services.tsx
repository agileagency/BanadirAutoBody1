import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { SERVICES } from '@/lib/constants';
import { Helmet } from 'react-helmet';

const Services = () => {
  const [location] = useLocation();
  const serviceRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  useEffect(() => {
    // Check if there's a hash in the URL and scroll to that section
    if (location.includes('#')) {
      const id = location.split('#')[1];
      if (serviceRefs.current[id]) {
        serviceRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  
  return (
    <>
      <Helmet>
        <title>Our Services - Banadir Auto Body Shop</title>
        <meta name="description" content="Comprehensive auto body repair services including collision repair, paint services, frame straightening, dent repair, auto glass repair, and detailing." />
      </Helmet>
      
      <div className="pt-8">
        <div className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-['Montserrat'] mb-6">Our Expert Services</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              We provide comprehensive auto body repair services for all vehicle makes and models with expert precision and quality.
            </p>
          </div>
        </div>
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-16">
              {SERVICES.map((service, index) => (
                <div 
                  key={service.id} 
                  id={service.id}
                  ref={el => serviceRefs.current[service.id] = el}
                  className={`grid md:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'md:order-2' : 'md:order-1'}>
                    <div className="h-72 relative rounded-lg overflow-hidden shadow-xl">
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent flex items-end">
                        <div className="p-6 text-white">
                          <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={index % 2 === 1 ? 'md:order-1' : 'md:order-2'}>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mr-4">
                        <i className={`fas ${service.icon} text-xl`}></i>
                      </div>
                      <h2 className="text-3xl font-bold font-['Montserrat'] text-primary">{service.name}</h2>
                    </div>
                    
                    <p className="text-lg text-gray-700 mb-4">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-3 mb-6">
                      {generateServiceDetails(service.id).map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <i className="fas fa-check-circle text-[#D4AF37] mt-1 mr-3"></i>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <a 
                      href="/contact" 
                      className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-semibold transition"
                    >
                      Request This Service
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

// Helper function to generate service details based on service ID
const generateServiceDetails = (serviceId: string): string[] => {
  switch (serviceId) {
    case 'collision':
      return [
        'Comprehensive collision damage assessment',
        'Structural and frame repairs',
        'Expert panel replacement and repair',
        'Factory-matched paint and finish',
        'Quality assurance testing'
      ];
    case 'paint':
      return [
        'Factory color matching technology',
        'Premium paint products',
        'Expert surface preparation',
        'Multi-stage painting process',
        'UV protection clear coat'
      ];
    case 'frame':
      return [
        'Computer-assisted measuring systems',
        'Hydraulic pulling and pushing equipment',
        'Factory specification restoration',
        'Structural integrity testing',
        'Alignment verification'
      ];
    case 'dent':
      return [
        'Paintless dent repair for minor damage',
        'Traditional dent repair methods',
        'Metal reshaping techniques',
        'Surface smoothing and preparation',
        'Seamless finish matching'
      ];
    case 'glass':
      return [
        'Windshield repair and replacement',
        'Side and rear window replacement',
        'OEM and aftermarket glass options',
        'Advanced ADAS recalibration',
        'Water leak testing'
      ];
    case 'detailing':
      return [
        'Exterior hand washing and polishing',
        'Interior deep cleaning',
        'Leather conditioning',
        'Paint correction and ceramic coating',
        'Engine bay detailing'
      ];
    default:
      return [
        'Professional service with attention to detail',
        'Quality materials and workmanship',
        'Efficient and timely completion',
        'Comprehensive quality testing',
        'Customer satisfaction guarantee'
      ];
  }
};

export default Services;
