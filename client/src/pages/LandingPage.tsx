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
      <section className="relative h-[32rem] bg-gray-900 overflow-hidden" id="home">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1603553329474-99f95f35394f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Classic red Ford Mustang" 
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-10"></div>
        
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Montserrat'] leading-tight mb-6">
              Minneapolis' Premier <span className="text-[#D4AF37]">Auto Body Shop</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Expert repairs for all vehicle types with a commitment to quality and customer satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#contact" className="bg-[#D4AF37] hover:bg-opacity-90 text-primary px-8 py-4 rounded-md font-bold text-lg transition text-center">
                Schedule Repair
              </a>
              <a href="#services" className="border-2 border-white hover:border-[#D4AF37] hover:text-[#D4AF37] text-white px-8 py-4 rounded-md font-bold text-lg transition text-center">
                Our Services
              </a>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center mt-12 gap-8">
              <div className="flex items-center">
                <Shield className="text-[#D4AF37] w-6 h-6 mr-3" />
                <span className="text-lg">Certified Technicians</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-[#D4AF37] w-6 h-6 mr-3" />
                <span className="text-lg">Quality Guaranteed</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="text-[#D4AF37] w-6 h-6 mr-3" />
                <span className="text-lg">All Insurance Accepted</span>
              </div>
            </div>
          </div>
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
      <section className="py-20 bg-gray-50" id="services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] mb-4">Our <span className="text-primary">Services</span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive auto body repair services with a focus on quality and customer satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  {/* Service keywords */}
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                      Professional
                    </span>
                    <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                      Quality
                    </span>
                    <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                      Expert
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] mb-4">Why Choose <span className="text-[#D4AF37]">Banadir Auto</span></h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              We're committed to providing exceptional service and quality repairs for every vehicle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-8 transition-transform duration-300 hover:scale-105">
                <div className="text-[#D4AF37] text-3xl mb-4">
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
      <section className="py-20 bg-gray-50" id="testimonials">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] mb-4">What Our <span className="text-primary">Customers Say</span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it—hear from our satisfied customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.slice(0, 3).map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#D4AF37] mx-0.5">★</span>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
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
      <section className="py-20 bg-gray-50" id="insurance">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] mb-4">Insurance <span className="text-primary">Partners</span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We accept <span className="font-bold">ALL</span> insurance companies and have experts on staff who specialize in handling claims to make your repair process completely hassle-free.
            </p>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Our team handles the entire insurance process from start to finish, including direct communication with adjusters, detailed documentation, and ensuring proper coverage for all repairs.
            </p>
          </div>
          
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-10">Our Insurance Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {INSURANCE_PROCESS.map((step: { step: number; title: string; description: string }) => (
                <div key={step.step} className="bg-white rounded-lg shadow-md p-6 border-t-4 border-primary">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-xl font-bold mb-4">
                    {step.step}
                  </div>
                  <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-center mb-6">We Work With All Insurance Companies</h3>
            <p className="text-center mb-10 max-w-3xl mx-auto">Including but not limited to the following providers:</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {INSURANCE_COMPANIES.map((company, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center h-24">
                <div className="text-gray-700 font-semibold text-center">
                  {company}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white" id="contact">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] mb-4">Contact <span className="text-primary">Us</span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Request a quote or schedule a repair. We're here to help with all your auto body repair needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-primary mb-6">Get In Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary text-white p-3 rounded-full mr-4">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Location</h4>
                      <p className="text-gray-600">{COMPANY_ADDRESS}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary text-white p-3 rounded-full mr-4">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Phone</h4>
                      <p className="text-gray-600">{COMPANY_PHONE}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary text-white p-3 rounded-full mr-4">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Email</h4>
                      <p className="text-gray-600">{COMPANY_EMAIL}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary text-white p-3 rounded-full mr-4">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Business Hours</h4>
                      <div className="text-gray-600 space-y-1">
                        {Object.entries(BUSINESS_HOURS).map(([day, hours], index) => (
                          <p key={index}>{day}: {hours}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="rounded-lg overflow-hidden shadow-md h-64 lg:h-80">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2823.8704382280206!2d-93.28978668446308!3d44.94868137909837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87fc2bab9b830ca3%3A0x3f0eb9e78f9c0ce7!2s3013%20Pillsbury%20Ave%2C%20Minneapolis%2C%20MN%2055408!5e0!3m2!1sen!2sus!4v1680298696419!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Banadir Auto Body Shop location"
                ></iframe>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-primary mb-6">Send Us a Message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="vehicle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Details</FormLabel>
                        <FormControl>
                          <Input placeholder="Year, Make, Model" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Needed</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
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
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us more about your repair needs"
                            {...field}
                            rows={4}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="insuranceHelp"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value || false}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Need help with insurance?</FormLabel>
                          <FormDescription>
                            Check this if you need assistance with your insurance claim.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "Submitting..." : "Submit Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;