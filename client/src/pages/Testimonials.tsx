import TestimonialSlider from '@/components/testimonials/TestimonialSlider';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet';

const Testimonials = () => {
  return (
    <>
      <Helmet>
        <title>Customer Testimonials - Banadir Auto Body Shop</title>
        <meta name="description" content="See what our satisfied customers have to say about Banadir Auto Body Shop. Real reviews from real customers in Minneapolis, MN." />
      </Helmet>
      
      <div className="pt-8">
        <div className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-['Montserrat'] mb-6">Customer Testimonials</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Don't just take our word for it. Here's what our satisfied customers have to say.
            </p>
          </div>
        </div>
        
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-20">
              <TestimonialSlider />
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#F9F9F9] p-8 rounded-lg">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-quote-left text-primary text-2xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold font-['Montserrat'] text-primary">Why Our Customers Love Us</h2>
                </div>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-[#D4AF37] mt-1 mr-3"></i>
                    <span className="text-gray-700">Transparent communication throughout the repair process</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-[#D4AF37] mt-1 mr-3"></i>
                    <span className="text-gray-700">Expert craftsmanship that restores vehicles to like-new condition</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-[#D4AF37] mt-1 mr-3"></i>
                    <span className="text-gray-700">Hassle-free insurance claims coordination</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-[#D4AF37] mt-1 mr-3"></i>
                    <span className="text-gray-700">Timely completion of repairs with regular updates</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-[#D4AF37] mt-1 mr-3"></i>
                    <span className="text-gray-700">Friendly, knowledgeable staff focused on customer satisfaction</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-[#F9F9F9] p-8 rounded-lg">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-star text-primary text-2xl"></i>
                  </div>
                  <h2 className="text-2xl font-bold font-['Montserrat'] text-primary">Our Ratings</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Google Reviews</span>
                      <div className="flex">
                        <i className="fas fa-star text-[#D4AF37]"></i>
                        <i className="fas fa-star text-[#D4AF37]"></i>
                        <i className="fas fa-star text-[#D4AF37]"></i>
                        <i className="fas fa-star text-[#D4AF37]"></i>
                        <i className="fas fa-star text-[#D4AF37]"></i>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-[#D4AF37] h-2 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                    <div className="text-right text-sm text-gray-600 mt-1">4.8/5 (120+ reviews)</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Yelp</span>
                      <div className="flex">
                        <i className="fas fa-star text-[#D4AF37]"></i>
                        <i className="fas fa-star text-[#D4AF37]"></i>
                        <i className="fas fa-star text-[#D4AF37]"></i>
                        <i className="fas fa-star text-[#D4AF37]"></i>
                        <i className="fas fa-star text-[#D4AF37]"></i>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-[#D4AF37] h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                    <div className="text-right text-sm text-gray-600 mt-1">4.7/5 (85+ reviews)</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Facebook</span>
                      <div className="flex">
                        <i className="fas fa-star text-[#D4AF37]"></i>
                        <i className="fas fa-star text-[#D4AF37]"></i>
                        <i className="fas fa-star text-[#D4AF37]"></i>
                        <i className="fas fa-star text-[#D4AF37]"></i>
                        <i className="fas fa-star text-[#D4AF37]"></i>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-[#D4AF37] h-2 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                    <div className="text-right text-sm text-gray-600 mt-1">4.9/5 (95+ reviews)</div>
                  </div>
                  
                  <div className="mt-8">
                    <a 
                      href="#" 
                      className="block w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-md text-center font-semibold transition"
                    >
                      Leave a Review <i className="fas fa-external-link-alt ml-2"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold font-['Montserrat'] mb-6 text-primary">Ready to Experience Our 5-Star Service?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-700">
              Join our list of satisfied customers. Schedule your service today.
            </p>
            <Link href="/contact">
              <a className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-md font-bold text-lg transition">
                Schedule Your Appointment
              </a>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Testimonials;
