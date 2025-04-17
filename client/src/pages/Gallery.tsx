import GalleryGrid from '@/components/gallery/GalleryGrid';
import { Helmet } from 'react-helmet';

const Gallery = () => {
  return (
    <>
      <Helmet>
        <title>Our Work Gallery - Banadir Auto Body Shop</title>
        <meta name="description" content="Browse our portfolio of before and after auto body repairs. See the quality craftsmanship and attention to detail that makes Banadir Auto Body Shop Minneapolis' preferred choice." />
      </Helmet>
      
      <div className="pt-8">
        <div className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-['Montserrat'] mb-6">Our Work Gallery</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Browse through our portfolio of before and after transformations. Our work speaks for itself.
            </p>
          </div>
        </div>
        
        <section className="py-20 bg-[#F9F9F9]">
          <div className="container mx-auto px-4">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] mb-6 text-primary text-center">Recent Projects</h2>
              <p className="text-lg mx-auto text-gray-600 max-w-3xl text-center mb-12">
                Each project represents our commitment to quality, precision, and customer satisfaction. Click on any image to see more details.
              </p>
              
              <GalleryGrid />
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md mt-16">
              <h3 className="text-2xl font-bold font-['Montserrat'] mb-6 text-primary">Our Work Process</h3>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-4">
                    <span className="font-bold">1</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Assessment</h4>
                  <p className="text-gray-600 mb-8">
                    Thorough inspection and detailed documentation of all damage.
                  </p>
                  <div className="absolute top-6 right-0 left-12 h-1 bg-primary/20 hidden md:block"></div>
                </div>
                
                <div className="relative">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-4">
                    <span className="font-bold">2</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Disassembly</h4>
                  <p className="text-gray-600 mb-8">
                    Careful disassembly to uncover all damage and create a precise repair plan.
                  </p>
                  <div className="absolute top-6 right-0 left-12 h-1 bg-primary/20 hidden md:block"></div>
                </div>
                
                <div className="relative">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-4">
                    <span className="font-bold">3</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Repair</h4>
                  <p className="text-gray-600 mb-8">
                    Expert repair techniques and quality parts to restore your vehicle.
                  </p>
                  <div className="absolute top-6 right-0 left-12 h-1 bg-primary/20 hidden md:block"></div>
                </div>
                
                <div>
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-4">
                    <span className="font-bold">4</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Finishing</h4>
                  <p className="text-gray-600 mb-8">
                    Precise color matching, expert painting, and quality control inspection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold font-['Montserrat'] mb-6">Ready to Experience Our Quality Service?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Contact us today to schedule your repair or request a free estimate.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-[#D4AF37] hover:bg-opacity-90 text-primary px-8 py-4 rounded-md font-bold text-lg transition"
            >
              Request a Quote
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default Gallery;
