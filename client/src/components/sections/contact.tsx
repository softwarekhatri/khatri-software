import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { FaWhatsapp } from "react-icons/fa";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      service: "",
    },
    mode: "onSubmit",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("https://formspree.io/f/mqalopey", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: "Thank you! We'll contact you soon.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    // If there are errors, show the first error toast and do not submit
    const errors = form.formState.errors;
    const firstErrorKey = Object.keys(errors)[0] as keyof typeof errors | undefined;
    if (firstErrorKey && errors[firstErrorKey]) {
      const firstError = errors[firstErrorKey];
      toast({
        title: "Validation Error",
        description: (typeof firstError?.message === 'string' ? firstError.message : "Please fill all required fields correctly."),
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(data);
  };

  return (
    <section
      id="contact"
      className="py-20 bg-white text-primary-black"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-thin mb-6 text-primary-black">
            Get a <span className="font-bold">Quote</span>
          </h2>
          <p className="text-xl text-gray-600">
            {/* @khatrichanges We'd love to hear from you. Send us a message and we'll respond as soon as possible. */}
            Ready to transform your ideas into reality? Let's discuss your
            project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
              <Form {...form}>
                <form
                  method="POST"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-10"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-500">
                          Your Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-white border-b-2 border-gray-200 focus:border-primary-black rounded-none border-x-0 border-t-0 px-2 text-primary-black focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 placeholder:text-black/45 caret-black/45"
                            placeholder="e.g. Ankit Khatri"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-500">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              className="bg-white border-b-2 border-gray-200 focus:border-primary-black rounded-none border-x-0 border-t-0 px-2 text-primary-black focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 placeholder:text-black/45 caret-black/45"
                              placeholder="e.g. softwarekhatri@gmail.com"
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
                          <FormLabel className="text-gray-500">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              className="bg-white border-b-2 border-gray-200 focus:border-primary-black rounded-none border-x-0 border-t-0 px-2 text-primary-black focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 placeholder:text-black/45 caret-black/45"
                              placeholder="e.g. +91 7209703947"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-500">
                          Service Required
                        </FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="bg-white border-b-2 border-gray-200 focus:border-primary-black rounded-none border-x-0 border-t-0 px-2 text-primary-black focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0">
                              <SelectValue placeholder="Choose your service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-50 border-white/20">
                            <SelectItem value="custom-software">
                              Custom Software Development
                            </SelectItem>
                            <SelectItem value="web-development">
                              Web Development
                            </SelectItem>
                            <SelectItem value="mobile-development">
                              Mobile Development
                            </SelectItem>
                            <SelectItem value="backend-services">
                              Backend Services
                            </SelectItem>
                            <SelectItem value="cloud-deployment">
                              Cloud Deployment
                            </SelectItem>
                            <SelectItem value="technical-consulting">
                              Technical Consulting
                            </SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-500">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={6}
                            className="bg-white border-b-2 border-gray-200 focus:border-primary-black rounded-none border-x-0 border-t-0 px-2 text-primary-black resize-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 placeholder:text-black/45 caret-black/45"
                            placeholder="Share your project details..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-primary-black text-white py-4 rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                  >
                    {/* @khatrichanges <Mail className="mr-2" size={20} /> */}
                    <Send className="mr-2" size={20} />
                    {contactMutation.isPending ? "Sending..." : "Get a Quote"}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary-black">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin
                    className="text-xl text-red-600 mr-4 w-6"
                    size={24}
                  />
                  <div>
                    <p className="font-semibold text-primary-black">Address</p>
                    <p className="text-gray-600">
                      A-41, Pandav Nagar, East Delhi
                      <br />
                      Delhi - 110092, India
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="text-xl text-gray-600 mr-4 w-6" size={24} />
                  <div>
                    <p className="font-semibold text-primary-black">Phone</p>
                    <p className="text-gray-600">+91 (720) 970-3947</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaWhatsapp className="text-xl text-green-500 mr-4 w-6" size={24} />
                  <a
                    href="https://wa.me/917209703947?text=Hello, I would like to inquire about your services."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p className="font-semibold text-primary-black hover:text-green-600 transition-all duration-300 flex items-center">Chat on WhatsApp</p></a>
                </div>
                <div className="flex items-center">
                  <Mail className="text-xl text-[#00BFFF] mr-4 w-6" size={24} />
                  <div>
                    <p className="font-semibold text-primary-black">Email</p>
                    <p className="text-gray-600">softwarekhatri@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            {/* @khatrichanges  */}
            {/* <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
              <h4 className="text-xl font-semibold mb-4 text-primary-black">Find Us</h4>
              <div className="bg-gray-300 h-64 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto mb-2 text-gray-500" size={48} />
                  <p className="text-gray-600">Google Maps Integration</p>
                  <p className="text-sm text-gray-500">Interactive map will be embedded here</p>
                </div>
              </div>
            </div> */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
              <h4 className="text-xl font-semibold mb-4 text-primary-black">
                Find Us
              </h4>
              <div className="bg-gray-300 h-60 rounded-xl overflow-hidden">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d194.9549539549592!2d77.2849835!3d28.6193111!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3f87b225607%3A0xcd2d8f6b6f8b635b!2sKhatri%20Software!5e1!3m2!1sen!2sin!4v1755170016003!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-60 rounded-xl"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div >
      </div >
    </section >
  );
}
