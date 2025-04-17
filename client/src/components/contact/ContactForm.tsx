import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { apiRequest } from '@/lib/queryClient';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { SERVICES } from '@/lib/constants';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  service: z.string({ required_error: "Please select a service" }),
  vehicle: z.string().min(2, { message: "Please enter your vehicle information" }),
  message: z.string().optional(),
  insuranceHelp: z.boolean().default(false)
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      service: '',
      vehicle: '',
      message: '',
      insuranceHelp: false
    }
  });
  
  const mutation = useMutation({
    mutationFn: (data: ContactFormValues) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted",
        description: "Thank you! We'll get back to you as soon as possible.",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    }
  });
  
  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true);
    mutation.mutate(data);
    setIsSubmitting(false);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
        <h3 className="text-2xl font-bold font-['Montserrat'] mb-6">Schedule a Service</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Your Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
                    {...field} 
                    className="bg-white/20 border border-white/30 rounded-md p-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Phone Number</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="(612) 555-1234" 
                    {...field} 
                    className="bg-white/20 border border-white/30 rounded-md p-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel className="text-white">Email Address</FormLabel>
              <FormControl>
                <Input 
                  placeholder="your@email.com" 
                  {...field} 
                  className="bg-white/20 border border-white/30 rounded-md p-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel className="text-white">Service Needed</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value} 
              >
                <FormControl>
                  <SelectTrigger className="bg-white/20 border border-white/30 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SERVICES.map(service => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="other">Other Services</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="vehicle"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel className="text-white">Vehicle Information</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Year, Make, Model" 
                  {...field} 
                  className="bg-white/20 border border-white/30 rounded-md p-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel className="text-white">Additional Details</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us more about the service you need..." 
                  {...field} 
                  className="bg-white/20 border border-white/30 rounded-md p-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" 
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="insuranceHelp"
          render={({ field }) => (
            <FormItem className="mb-6 flex items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox 
                  checked={field.value} 
                  onCheckedChange={field.onChange} 
                  className="bg-white/20 border border-white/30 rounded w-5 h-5 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-primary"
                />
              </FormControl>
              <FormLabel className="text-sm text-white font-normal">
                I have insurance and would like help with the claims process
              </FormLabel>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-[#D4AF37] hover:bg-opacity-90 text-primary font-bold py-3 px-6 rounded-md transition"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
