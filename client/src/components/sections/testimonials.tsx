import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Chandra",
    position: "Co-Founder, Monkhood Living",
    image: "/rahul.jpeg",
    text: "Khatri Software delivered exceptional results beyond our expectations. Love their attention to detail and commitment to quality."
  },
  {
    name: "Durgesh",
    position: "Founder, Ekwik Solutions",
    website: "https://ekwiksolution.com/",
    image: "/durgesh.enc",
    text: "Get to have your services in future as well. You people are problem solver."
  },
  {
    name: "Arvind Mehta",
    position: "Founder, BuildTrip, Ex-Real Estate Head",
    image: "/arvind.webp",
    text: "Loved working with Khatri Software. Amazing team, great communication especially with Ankit Khatri. Highly recommend!"
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
                {testimonial.website ?
                  (
                    <a href={testimonial.website} target="_blank" rel="noopener noreferrer">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full border-2 border-white/20 mr-4"
                      /></a>) :
                  (<img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-white/20 mr-4"
                  />)
                }
                <div>
                  {testimonial.website ? (<a href={testimonial.website} target="_blank" rel="noopener noreferrer"><h4 className="font-semibold">{testimonial.name}</h4></a>) : (<h4 className="font-semibold">{testimonial.name}</h4>)}
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
    </section >
  );
}
