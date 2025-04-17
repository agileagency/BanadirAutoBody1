import { Link } from 'wouter';
import { SERVICES } from '@/lib/constants';

const FeaturedServices = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {SERVICES.map((service) => (
        <div 
          key={service.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300"
        >
          <div className="h-48 bg-gray-200 relative">
            <img 
              src={service.image} 
              alt={service.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
              <i className={`fas ${service.icon} text-white text-5xl`}></i>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold font-['Montserrat'] text-primary mb-3">{service.name}</h3>
            <p className="text-gray-600 mb-4">
              {service.description}
            </p>
            <Link href={`/services#${service.id}`}>
              <a className="text-[#D4AF37] font-semibold flex items-center hover:underline">
                Learn More <i className="fas fa-chevron-right ml-2 text-sm"></i>
              </a>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedServices;
