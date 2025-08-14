import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "John Anderson",
    position: "CEO, TechCorp",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    text: "Khatri Software delivered exceptional results beyond our expectations. Their technical expertise and attention to detail transformed our business operations completely."
  },
  {
    name: "Sarah Mitchell",
    position: "CTO, InnovateHub",
    image: "https://images.unsplash.com/photo-1494790108755-2616b332e234?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    text: "Working with Khatri Software was a game-changer. They understood our vision and delivered a robust, scalable solution that exceeded all our requirements."
  },
  {
    name: "Michael Chen",
    position: "Founder, StartupLabs",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    text: "The professionalism and technical prowess of Khatri Software impressed us from day one. They delivered our project on time and within budget."
  }
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref);

  return (
    <section id="testimonials" className="py-20 bg-primary-black" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-thin mb-6">
            Client <span className="font-bold">Testimonials</span>
          </h2>
          <p className="text-xl text-white/70">What our clients say about working with us</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="glassmorphism p-8 rounded-2xl hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full grayscale border-2 border-white/20 mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-white/60 text-sm">{testimonial.position}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-white/80 leading-relaxed">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
