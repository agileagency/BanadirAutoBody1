import Hero from '@/components/home/Hero';
import FeaturedServices from '@/components/home/FeaturedServices';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import CallToAction from '@/components/home/CallToAction';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import TestimonialSlider from '@/components/testimonials/TestimonialSlider';
import InsuranceProcess from '@/components/insurance/InsuranceProcess';
import Map from '@/components/contact/Map';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Banadir Auto Body - Premier Auto Repair Shop in Minneapolis</title>
        <meta name="description" content="Banadir Auto Body Shop offers premier auto repair services in Minneapolis, MN. Expert collision repair, paintwork, and more with insurance coordination." />
      </Helmet>
      
      <div>
        <Hero />
        
        <section id="featured-services" className="py-20 bg-[#F9F9F9]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] mb-4 text-primary">Our Expert Services</h2>
              <p className="text-lg max-w-2xl mx-auto text-gray-600">
                We provide comprehensive auto body repair services for all vehicle makes and models.
              </p>
            </div>
            
            <FeaturedServices />
            
            <div className="text-center mt-12">
              <Link href="/services">
                <a className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-md font-bold text-lg transition">
                  See All Services
                </a>
              </Link>
            </div>
          </div>
        </section>
        
        <WhyChooseUs />
        
        <section id="home-gallery" className="py-20 bg-[#F9F9F9]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] mb-4 text-primary">Our Work Gallery</h2>
              <p className="text-lg max-w-2xl mx-auto text-gray-600">
                Browse through our portfolio of before and after transformations.
              </p>
            </div>
            
            <GalleryGrid limit={3} />
            
            <div className="text-center mt-12">
              <Link href="/gallery">
                <a className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-md font-bold text-lg transition">
                  View Full Gallery
                </a>
              </Link>
            </div>
          </div>
        </section>
        
        <section id="home-testimonials" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] mb-4 text-primary">Customer Testimonials</h2>
              <p className="text-lg max-w-2xl mx-auto text-gray-600">
                Don't just take our word for it. Here's what our customers have to say.
              </p>
            </div>
            
            <TestimonialSlider />
          </div>
        </section>
        
        <InsuranceProcess />
        
        <section id="home-location" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] mb-4 text-primary">Find Us</h2>
              <p className="text-lg max-w-2xl mx-auto text-gray-600">
                Conveniently located in Minneapolis, MN. Stop by or schedule an appointment today.
              </p>
            </div>
            
            <div className="bg-gradient-to-b from-primary/5 to-primary/20 rounded-2xl p-8 shadow-lg">
              <Map />
            </div>
          </div>
        </section>
        
        <CallToAction />
      </div>
    </>
  );
};

export default Home;
