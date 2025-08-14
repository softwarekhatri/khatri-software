import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertQuoteSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function QuoteForm() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertQuoteSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const quoteMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/quotes", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: data.message,
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    quoteMutation.mutate(data);
  };

  return (
    <section id="quote" className="py-20 bg-secondary-black" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-thin mb-6">
            Get a <span className="font-bold">Quote</span>
          </h2>
          <p className="text-xl text-white/70">
            Ready to transform your ideas into reality? Let's discuss your project.
          </p>
        </motion.div>

        <motion.div
          className="glassmorphism p-8 rounded-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/60">First Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-transparent border-b-2 border-white/20 focus:border-white rounded-none border-x-0 border-t-0 px-0 text-white placeholder:text-white/40"
                          placeholder="Enter your first name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/60">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-transparent border-b-2 border-white/20 focus:border-white rounded-none border-x-0 border-t-0 px-0 text-white placeholder:text-white/40"
                          placeholder="Enter your last name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/60">Email Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="bg-transparent border-b-2 border-white/20 focus:border-white rounded-none border-x-0 border-t-0 px-0 text-white placeholder:text-white/40"
                          placeholder="Enter your email"
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
                      <FormLabel className="text-white/60">Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          className="bg-transparent border-b-2 border-white/20 focus:border-white rounded-none border-x-0 border-t-0 px-0 text-white placeholder:text-white/40"
                          placeholder="Enter your phone number"
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
                    <FormLabel className="text-white/60">Service Required</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-transparent border-b-2 border-white/20 focus:border-white rounded-none border-x-0 border-t-0 px-0 text-white">
                          <SelectValue placeholder="Select service required" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-primary-black border-white/20">
                        <SelectItem value="custom-software">Custom Software Development</SelectItem>
                        <SelectItem value="web-development">Web Development</SelectItem>
                        <SelectItem value="mobile-development">Mobile Development</SelectItem>
                        <SelectItem value="backend-services">Backend Services</SelectItem>
                        <SelectItem value="cloud-deployment">Cloud Deployment</SelectItem>
                        <SelectItem value="technical-consulting">Technical Consulting</SelectItem>
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
                    <FormLabel className="text-white/60">Project Details</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={5}
                        className="bg-transparent border-b-2 border-white/20 focus:border-white rounded-none border-x-0 border-t-0 px-0 text-white placeholder:text-white/40 resize-none"
                        placeholder="Tell us about your project requirements..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-center pt-4">
                <Button
                  type="submit"
                  disabled={quoteMutation.isPending}
                  className="glassmorphism px-12 py-4 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <Send className="mr-2" size={20} />
                  {quoteMutation.isPending ? "Sending..." : "Send Quote Request"}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}
