import { Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { 
  MapPin, Phone, Mail, Clock, Shield, Award, Car, Wrench, CheckCircle, DollarSign
} from 'lucide-react';

import { 
  COMPANY_NAME, 
  COMPANY_PHONE, 
  COMPANY_EMAIL, 
  COMPANY_ADDRESS, 
  BUSINESS_HOURS,
  SERVICES,
  FEATURES,
  GALLERY_ITEMS,
  TESTIMONIALS,
  INSURANCE_COMPANIES,
  INSURANCE_PROCESS,
  STATS
} from '@/lib/constants';

// Form components
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { insertContactSubmissionSchema } from '@shared/schema';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

// Create a more extensive contact form schema
const contactFormSchema = insertContactSubmissionSchema.extend({
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  vehicle: z.string().min(3, {
    message: "Please provide details about your vehicle.",
  }),
  service: z.string({
    required_error: "Please select the service you need.",
  }),
});

// Define form value types
type ContactFormValues = z.infer<typeof contactFormSchema>;

const LandingPage = () => {
  const { toast } = useToast();
  
  // Contact form setup
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      vehicle: "",
      service: "",
      insuranceHelp: false as boolean,
    },
  });

  // Contact form submission
  const contactMutation = useMutation({
    mutationFn: (data: ContactFormValues) => {
      return apiRequest<{ success: boolean }>({
        url: '/api/contact',
        method: 'POST',
        data
      });
    },
    onSuccess: () => {
      toast({
        title: "Contact form submitted",
        description: "We'll get back to you as soon as possible!",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error submitting form",
        description: String(error),
        variant: "destructive",
      });
    }
  });

  // Form submission handler
  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };

  return (
    <>
      <Helmet>
        <title>{COMPANY_NAME} - Premier Auto Body Shop in Minneapolis</title>
        <meta name="description" content="Banadir Auto Body Shop provides professional auto repair services in Minneapolis, MN. Certified technicians, all insurance accepted, and quality guaranteed." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gray-900 overflow-hidden flex items-center pt-24 pb-16" id="home">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1603553329474-99f95f35394f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Classic red Ford Mustang" 
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-10"></div>
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 z-10"></div>
        
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-block bg-teal-600/20 backdrop-blur-sm px-4 py-2 rounded-lg mb-6 border-l-4 border-teal-600 animate-fade-in-right">
                <span className="text-teal-600 font-semibold">Minneapolis, MN</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-['Montserrat'] leading-tight mb-6 animate-fade-in-up">
                Minneapolis' <span className="text-teal-600 inline-block relative">
                  Premier
                  <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 100 12" width="100%" height="12">
                    <path d="M0,5 Q50,10 100,5 T200,5" fill="none" stroke="currentColor" strokeWidth="3" />
                  </svg>
                </span> Auto Body Shop
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-xl animate-fade-in-up animation-delay-300">
                Expert repairs for all vehicle types with a commitment to quality and customer satisfaction.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up animation-delay-500">
                <a href="#contact" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-md font-bold text-lg transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 group">
                  Schedule Repair
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 inline-block ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a href="#services" className="border-2 border-white hover:border-teal-400 hover:text-teal-400 hover:bg-white/5 text-white px-8 py-4 rounded-md font-bold text-lg transition-all duration-300 text-center backdrop-blur-sm">
                  Our Services
                </a>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center mt-12 gap-8 animate-fade-in-up animation-delay-700">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Shield className="text-teal-500 w-6 h-6 mr-3" />
                  <span className="text-lg">Certified Technicians</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <CheckCircle className="text-teal-500 w-6 h-6 mr-3" />
                  <span className="text-lg">Quality Guaranteed</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <DollarSign className="text-teal-500 w-6 h-6 mr-3" />
                  <span className="text-lg">All Insurance Accepted</span>
                </div>
              </div>
            </div>
            
            {/* Right side decorative element */}
            <div className="hidden md:block relative">
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-teal-500/30 to-teal-500/0 rounded-full filter blur-2xl opacity-70 animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="text-white text-lg mb-4">10+ Years of Excellence</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/40 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-teal-400">2,500+</div>
                    <div className="text-white/90 text-sm">Vehicles Repaired</div>
                  </div>
                  <div className="bg-primary/40 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-teal-400">100%</div>
                    <div className="text-white/90 text-sm">Satisfaction</div>
                  </div>
                  <div className="bg-primary/40 p-4 rounded-lg text-center col-span-2">
                    <div className="text-xl font-bold text-white">All Insurance Companies Accepted</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce hidden md:block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 shadow-inner">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((stat, index) => (
              <div key={index} className="p-4">
                <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden" id="services">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <div className="inline-block bg-primary/10 rounded-full px-4 py-1 text-primary font-medium mb-4">PROFESSIONAL SERVICES</div>
            <h2 className="text-4xl md:text-5xl font-bold font-['Montserrat'] mb-6 text-shadow">
              Our <span className="text-primary relative inline-block">
                Premium Services
                <div className="absolute left-0 -bottom-2 w-full h-1 bg-[#D4AF37]/40"></div>
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive auto body repair services with a focus on quality, precision, and customer satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SERVICES.map((service, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover-card-effect group"
              >
                <div className="h-56 bg-gray-200 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Hover action */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <a href="#contact" className="inline-flex items-center text-orange-500 font-semibold">
                      Request Service
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-3">{service.name}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  {/* Service features */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="bg-orange-50 text-orange-700 text-sm px-3 py-1 rounded-full">
                      Expert Technicians
                    </span>
                    <span className="bg-orange-50 text-orange-700 text-sm px-3 py-1 rounded-full">
                      Quality Materials
                    </span>
                    <span className="bg-orange-50 text-orange-700 text-sm px-3 py-1 rounded-full">
                      Warranty Coverage
                    </span>
                  </div>
                  
                  {/* Service action */}
                  <div className="pt-4 border-t border-gray-100">
                    <a 
                      href="#contact" 
                      className="inline-flex items-center text-primary font-medium hover:text-orange-600 transition-colors"
                    >
                      Learn more about {service.name.toLowerCase()}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Service CTA */}
          <div className="mt-16 text-center">
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Request a Free Quote
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] mb-4">Why Choose <span className="text-orange-400">Banadir Auto</span></h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              We're committed to providing exceptional service and quality repairs for every vehicle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-8 transition-transform duration-300 hover:scale-105">
                <div className="text-orange-400 text-3xl mb-4">
                  {feature.icon === 'award' && <Award className="w-12 h-12" />}
                  {feature.icon === 'tools' && <Wrench className="w-12 h-12" />}
                  {feature.icon === 'shield' && <Shield className="w-12 h-12" />}
                  {feature.icon === 'car' && <Car className="w-12 h-12" />}
                  {feature.icon === 'check' && <CheckCircle className="w-12 h-12" />}
                  {feature.icon === 'dollar' && <DollarSign className="w-12 h-12" />}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="opacity-90">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-primary relative overflow-hidden" id="testimonials">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="quote-pattern" patternUnits="userSpaceOnUse" width="80" height="80">
                <text x="10" y="50" className="text-5xl text-white" fill="currentColor" opacity="0.1">❝</text>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#quote-pattern)" />
          </svg>
        </div>
        
        <div className="absolute top-10 right-10 w-40 h-40 bg-orange-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-orange-500/20 rounded-full filter blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-1 text-white font-medium mb-4">CUSTOMER TESTIMONIALS</div>
            <h2 className="text-4xl md:text-5xl font-bold font-['Montserrat'] mb-6 text-white">
              What Our <span className="text-orange-400 relative inline-block">
                Customers Say
                <div className="absolute left-0 -bottom-2 w-full h-1 bg-orange-500/40"></div>
              </span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Don't just take our word for it—hear from our satisfied customers who've experienced our premium auto body services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.slice(0, 3).map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover-card-effect relative overflow-hidden group"
              >
                {/* Quote mark decoration */}
                <div className="absolute -top-2 -right-2 text-orange-500/20 text-9xl font-serif transform -rotate-6">❝</div>
                
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-orange-400 mx-0.5">★</span>
                  ))}
                </div>
                
                <p className="text-white italic mb-8 relative z-10 leading-relaxed">"{testimonial.content}"</p>
                
                <div className="flex items-center relative z-10">
                  <div className="w-14 h-14 bg-gray-300 rounded-full overflow-hidden mr-4 ring-2 ring-orange-500 ring-offset-2 ring-offset-primary">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{testimonial.author}</h4>
                    <p className="text-orange-400">{testimonial.location}</p>
                  </div>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
          
          {/* Social proof */}
          <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">4.9/5</div>
                <div className="flex justify-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-orange-400 mx-0.5 text-lg">★</span>
                  ))}
                </div>
                <p className="text-white/80">Google Reviews</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">5/5</div>
                <div className="flex justify-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-orange-400 mx-0.5 text-lg">★</span>
                  ))}
                </div>
                <p className="text-white/80">Facebook</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">4.8/5</div>
                <div className="flex justify-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-orange-400 mx-0.5 text-lg">★</span>
                  ))}
                </div>
                <p className="text-white/80">Yelp</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">A+</div>
                <div className="flex justify-center mb-1">
                  <span className="text-orange-400 font-bold">BBB</span>
                </div>
                <p className="text-white/80">Accredited Business</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white" id="gallery">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] mb-4">Our <span className="text-primary">Work</span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take a look at some of our recent auto body repair projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GALLERY_ITEMS.slice(0, 6).map((item, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg shadow-md">
                <img 
                  src={item.image} 
                  alt={item.title || `Gallery image ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden" id="insurance">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 -ml-20 -mt-20 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl"></div>
        
        <div className="absolute right-0 top-1/3 w-32 h-32 bg-orange-500/20 rounded-full filter blur-2xl"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-50 rounded-full px-4 py-1 text-orange-700 font-medium mb-4">NO HASSLE CLAIMS</div>
            <h2 className="text-4xl md:text-5xl font-bold font-['Montserrat'] mb-6 text-shadow">
              Insurance <span className="text-orange-600 relative inline-block">
                Claims Specialists
                <div className="absolute left-0 -bottom-2 w-full h-1 bg-orange-400/40"></div>
              </span>
            </h2>
            <div className="flex flex-col items-center justify-center">
              <p className="text-xl text-gray-700 max-w-3xl">
                We accept <span className="font-extrabold text-orange-600">ALL</span> insurance companies and have dedicated experts who specialize in handling claims to make your repair process completely hassle-free.
              </p>
              <div className="w-24 h-1 bg-orange-200 rounded-full my-6"></div>
              <p className="text-lg text-gray-600 max-w-3xl">
                Our team handles the entire insurance process from start to finish, including direct communication with adjusters, detailed documentation, and ensuring proper coverage for all repairs.
              </p>
            </div>
          </div>
          
          {/* Insurance Process Cards */}
          <div className="mb-20 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 transform -translate-y-1/2 hidden lg:block"></div>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-14 relative">
              <span className="bg-gradient-to-r from-gray-50 via-white to-gray-50 px-8 relative z-10">Our Insurance Process</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {INSURANCE_PROCESS.slice(0, 3).map((step: { step: number; title: string; description: string }) => (
                <div key={step.step} className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-orange-500 hover-card-effect relative z-10">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-600 text-white text-xl font-bold shadow-lg border-4 border-white">
                    {step.step}
                  </div>
                  <h4 className="text-xl font-bold mb-4 text-center pt-4">{step.title}</h4>
                  <p className="text-gray-600 text-center">{step.description}</p>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
              {INSURANCE_PROCESS.slice(3).map((step: { step: number; title: string; description: string }) => (
                <div key={step.step} className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-orange-500 hover-card-effect relative z-10">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-600 text-white text-xl font-bold shadow-lg border-4 border-white">
                    {step.step}
                  </div>
                  <h4 className="text-xl font-bold mb-4 text-center pt-4">{step.title}</h4>
                  <p className="text-gray-600 text-center">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Insurance Companies */}
          <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
            <div className="mb-10 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">We Work With <span className="text-orange-600">All Insurance Companies</span></h3>
              <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-6"></div>
              <p className="text-gray-600 max-w-3xl mx-auto">
                No matter which insurance provider you use, we have the expertise to handle your claim. Our team has established relationships with all major providers to ensure a smooth repair process.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {INSURANCE_COMPANIES.map((company, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 hover:bg-orange-50 rounded-lg p-4 flex items-center justify-center h-24 transition-colors duration-300 border border-gray-100 shadow-sm hover:shadow"
                >
                  <div className="text-gray-700 font-semibold text-center">
                    {company}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Insurance CTA */}
            <div className="mt-14 text-center">
              <div className="bg-gray-50 p-8 rounded-xl inline-block max-w-3xl">
                <h4 className="text-xl font-bold mb-4">Have Insurance Questions?</h4>
                <p className="text-gray-600 mb-6">
                  Our insurance specialists are ready to answer any questions and guide you through the entire claims process.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a 
                    href="#contact" 
                    className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Contact Insurance Team
                  </a>
                  <div className="flex items-center justify-center text-primary font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    (612) 555-1234
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden" id="contact">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-full h-32 bg-primary/5 opacity-50 transform -skew-y-6"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-primary/5 opacity-50 transform skew-y-6"></div>
        
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-50 rounded-full px-4 py-1 text-orange-700 font-medium mb-4">GET IN TOUCH</div>
            <h2 className="text-4xl md:text-5xl font-bold font-['Montserrat'] mb-6 text-shadow">
              Contact <span className="text-orange-600 relative inline-block">
                Our Team
                <div className="absolute left-0 -bottom-2 w-full h-1 bg-orange-400/40"></div>
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Request a quote, schedule a repair, or get insurance assistance. We're here to help with all your auto body repair needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Info */}
            <div className="space-y-8 lg:col-span-5">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover-card-effect">
                <h3 className="text-2xl font-bold text-slate-700 mb-8 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                    <Phone className="w-5 h-5 text-slate-600" />
                  </div>
                  How to Reach Us
                </h3>
                
                <div className="space-y-8">
                  <div className="flex items-start hover:bg-gray-50 p-3 rounded-lg transition-colors">
                    <div className="bg-slate-100 text-slate-600 p-3 rounded-lg mr-4">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-lg">Location</h4>
                      <p className="text-gray-700">{COMPANY_ADDRESS}</p>
                      <a href="https://maps.google.com/?q=3013+Pillsbury+Ave+Minneapolis+MN+55408" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 text-sm flex items-center mt-2">
                        Get Directions
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start hover:bg-gray-50 p-3 rounded-lg transition-colors">
                    <div className="bg-orange-50 text-orange-600 p-3 rounded-lg mr-4">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-lg">Phone</h4>
                      <p className="text-gray-700">{COMPANY_PHONE}</p>
                      <a href={`tel:${COMPANY_PHONE.replace(/[^0-9]/g, '')}`} className="text-orange-600 hover:text-orange-700 text-sm flex items-center mt-2">
                        Call Us Now
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start hover:bg-gray-50 p-3 rounded-lg transition-colors">
                    <div className="bg-orange-50 text-orange-600 p-3 rounded-lg mr-4">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-lg">Email</h4>
                      <p className="text-gray-700">{COMPANY_EMAIL}</p>
                      <a href={`mailto:${COMPANY_EMAIL}`} className="text-orange-600 hover:text-orange-700 text-sm flex items-center mt-2">
                        Send Email
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start hover:bg-gray-50 p-3 rounded-lg transition-colors">
                    <div className="bg-orange-50 text-orange-600 p-3 rounded-lg mr-4">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-lg">Business Hours</h4>
                      <div className="text-gray-700 space-y-1">
                        {Object.entries(BUSINESS_HOURS).map(([day, hours], index) => (
                          <p key={index} className={day === 'Monday' ? "font-medium" : ""}>
                            <span className={day === 'Sunday' ? "text-orange-600" : ""}>{day}:</span> {hours}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/30 to-orange-400/30 rounded-xl blur-sm"></div>
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2823.8704382280206!2d-93.28978668446308!3d44.94868137909837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87fc2bab9b830ca3%3A0x3f0eb9e78f9c0ce7!2s3013%20Pillsbury%20Ave%2C%20Minneapolis%2C%20MN%2055408!5e0!3m2!1sen!2sus!4v1680298696419!5m2!1sen!2sus" 
                    width="100%" 
                    height="300" 
                    style={{ border: 0 }} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Banadir Auto Body Shop location"
                  ></iframe>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover-card-effect">
                <h3 className="text-2xl font-bold text-orange-700 mb-8 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mr-3">
                    <Mail className="w-5 h-5 text-orange-600" />
                  </div>
                  Send Us a Message
                </h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your name" 
                                {...field} 
                                className="border-gray-300 focus:border-slate-700 focus:ring-slate-700"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your email" 
                                {...field} 
                                className="border-gray-300 focus:border-slate-700 focus:ring-slate-700"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Phone Number</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="(612) 555-1234" 
                                {...field} 
                                className="border-gray-300 focus:border-slate-700 focus:ring-slate-700"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="vehicle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Vehicle Details</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Year, Make, Model" 
                                {...field} 
                                className="border-gray-300 focus:border-slate-700 focus:ring-slate-700"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Service Needed</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-gray-300 focus:border-slate-700 focus:ring-slate-700">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Collision Repair">Collision Repair</SelectItem>
                              <SelectItem value="Paint Services">Paint Services</SelectItem>
                              <SelectItem value="Dent Removal">Dent Removal</SelectItem>
                              <SelectItem value="Frame Straightening">Frame Straightening</SelectItem>
                              <SelectItem value="Glass Replacement">Glass Replacement</SelectItem>
                              <SelectItem value="Insurance Claim">Insurance Claim</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Your Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us more about your repair needs..."
                              {...field}
                              rows={5}
                              className="border-gray-300 focus:border-slate-700 focus:ring-slate-700 resize-none"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="insuranceHelp"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-200 p-4 bg-gray-50">
                          <FormControl>
                            <Checkbox
                              checked={field.value || false}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-slate-700 data-[state=checked]:border-slate-700"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-gray-700 font-medium">Need help with insurance?</FormLabel>
                            <FormDescription className="text-gray-500">
                              Check this if you need assistance with your insurance claim. Our insurance specialists will contact you.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-slate-700 hover:bg-slate-800 text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        disabled={contactMutation.isPending}
                      >
                        {contactMutation.isPending ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            Submit Message
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </span>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
        
        {/* Final CTA */}
        <div className="mt-20 bg-slate-700 text-white py-10 relative">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-2">Ready to get your vehicle repaired?</h3>
                <p className="text-white/90">Contact us today to schedule your appointment or get a free quote.</p>
              </div>
              <div className="text-right">
                <a 
                  href={`tel:${COMPANY_PHONE.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center justify-center bg-white text-slate-700 px-6 py-3 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;