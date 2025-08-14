import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";
import { Linkedin, Twitter, Github, Instagram } from "lucide-react";

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-primary-black py-16 border-t border-white/10" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">Khatri Software</h3>
            <p className="text-white/70 mb-6 max-w-md">
              Innovating the Future, One Solution at a Time. Your trusted partner in digital transformation and software excellence.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://www.linkedin.com/company/khatrisoftware/"
                target="_blank"
                className="text-white/60 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                href="https://x.com/khatrisoftware"
                target="_blank"
                className="text-white/60 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter size={24} />
              </motion.a>
              <motion.a
                href="https://github.com/softwarekhatri"
                target="_blank"
                className="text-white/60 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/khatrisoftware"
                target="_blank"
                className="text-white/60 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram size={24} />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavClick('#about')}
                  className="text-white/60 hover:text-white transition-colors duration-300"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#services')}
                  className="text-white/60 hover:text-white transition-colors duration-300"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#projects')}
                  className="text-white/60 hover:text-white transition-colors duration-300"
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="text-white/60 hover:text-white transition-colors duration-300"
                >
                  Contact
                </button>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-white/60 hover:text-white transition-colors duration-300">Custom Development</li>
              <li className="text-white/60 hover:text-white transition-colors duration-300">Web Development</li>
              <li className="text-white/60 hover:text-white transition-colors duration-300">Mobile Apps</li>
              <li className="text-white/60 hover:text-white transition-colors duration-300">Cloud Solutions</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-white/10 pt-8"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2025 Khatri Software. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-300">
                Terms of Service
              </a>
              {/* <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-300">
                Cookies
              </a> */}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
