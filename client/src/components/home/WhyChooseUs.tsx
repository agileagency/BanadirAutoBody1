import { FEATURES } from '@/lib/constants';

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] mb-4">Why Choose Banadir Auto Body</h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            We set ourselves apart through quality, integrity, and exceptional customer service.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div key={index} className="bg-white/10 p-8 rounded-lg backdrop-blur-sm hover:bg-white/20 transition">
              <div className="text-[#D4AF37] text-4xl mb-4">
                <i className={`fas ${feature.icon}`}></i>
              </div>
              <h3 className="text-xl font-bold font-['Montserrat'] mb-3">{feature.title}</h3>
              <p className="opacity-90">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
