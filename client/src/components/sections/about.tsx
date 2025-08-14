import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref);

  return (
    <section id="about" className="py-20 bg-secondary-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Professional software development team"
              className="rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-5xl font-thin mb-6">
                About <span className="font-bold">Khatri Software</span>
              </h2>
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                Founded on the principles of innovation and excellence, Khatri Software has been at the forefront of digital transformation,
                crafting bespoke software solutions that empower businesses to thrive in the digital age.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Our mission is to bridge the gap between complex business challenges and elegant technological solutions,
                delivering software that not only meets today's needs but anticipates tomorrow's opportunities.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              <motion.div
                className="glassmorphism p-6 rounded-xl hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-2xl font-semibold mb-3">Mission</h3>
                <p className="text-white/70">
                  Empowering businesses through innovative software solutions that drive growth and efficiency.
                </p>
              </motion.div>

              <motion.div
                className="glassmorphism p-6 rounded-xl hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-2xl font-semibold mb-3">Vision</h3>
                <p className="text-white/70">
                  To be the global leader with a local impact, driving cutting-edge software development and shaping the future of technology.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
