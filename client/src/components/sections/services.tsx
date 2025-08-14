import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";
import { Code, Globe, Server, Cloud, Wrench, Smartphone } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Custom Software Development",
    description: "Bespoke software solutions designed and developed to meet your specific business objectives and requirements."
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Modern, responsive websites and web applications built with cutting-edge technologies and best practices."
  },
  {
    icon: Server,
    title: "Backend Services",
    description: "Robust, scalable backend infrastructure and API development to power your applications seamlessly."
  },
  {
    icon: Cloud,
    title: "Cloud Deployment",
    description: "Seamless cloud deployment and DevOps services ensuring your applications are always available and performing optimally."
  },
  {
    icon: Wrench,
    title: "Technical Consulting",
    description: "Expert technical guidance and consulting to help you make informed decisions about your technology stack."
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications that deliver exceptional user experiences across all devices."
  }
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref);

  return (
    <section id="services" className="py-20 bg-primary-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-thin mb-6">
            Our <span className="font-bold">Services</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Comprehensive software solutions tailored to your unique business requirements
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="glassmorphism p-8 rounded-2xl hover:scale-105 hover:bg-white/15 transition-all duration-300 group"
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-white/70 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
