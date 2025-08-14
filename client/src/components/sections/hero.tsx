import { motion } from "framer-motion";
import { Rocket, Eye } from "lucide-react";
import TechnicalBackground from "@/components/ui/technical-background";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden tech-pattern">
      <TechnicalBackground />

      <div className="text-center z-10 px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.h1
          className="text-6xl sm:text-7xl lg:text-8xl font-thin mb-6 tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* @KhatriChanges <span className="font-bold text-white glow-pulse">Khatri</span> */}
          <span className="font-bold text-white">KHATRI</span>
          <br />
          <span className="font-extralight">SOFTWARE</span>
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl font-light mb-4 text-white/80"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Innovating the Future, One Solution at a Time
        </motion.p>

        <motion.p
          className="text-lg text-white/60 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Transforming your digital vision into cutting-edge software solutions with precision, innovation, and unmatched technical expertise.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <motion.button
            className="glassmorphism px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Rocket className="inline mr-2" size={20} />
            Get a Quote
          </motion.button>

          <motion.button
            className="border border-white/30 px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Eye className="inline mr-2" size={20} />
            View Services
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
