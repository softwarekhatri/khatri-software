import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTouchingContact, setIsTouchingContact] = useState(false);

  const navItems = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Projects" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const contactSection = document.getElementById("contact");

    if (!navbar || !contactSection) return;

    const navbarHeight = navbar.offsetHeight;

    const handleScroll = () => {
      const contactTop = contactSection.getBoundingClientRect().top;
      const contactBottom = contactSection.getBoundingClientRect().bottom;

      if (contactTop <= navbarHeight && contactBottom > navbarHeight) {
        setIsTouchingContact(true);
      } else {
        setIsTouchingContact(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-md border-b ${!isTouchingContact
        ? "bg-primary-black/90 border-white/10"
        : "bg-white/10 text-primary-black"
        }`}
      id="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1
              className={`text-xl font-bold ${!isTouchingContact ? "text-pure-white" : "text-primary-black"
                } cursor-pointer`}
              onClick={() => handleNavClick("#hero")}
            >
              Khatri Software
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`${!isTouchingContact
                    ? "hover:text-white/70"
                    : "hover:text-black/50"
                    } transition-colors duration-300 cursor-pointer`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white/70 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`md:hidden fixed top-16 left-0 w-full h-screen z-40
              ${isTouchingContact ? "bg-white text-primary-black" : "bg-primary-black text-white"}`}
            style={{ backgroundColor: isTouchingContact ? "rgba(255,255,255,1)" : "rgba(10,10,10,1)" }}
          >
            <div className="px-4 pt-8 pb-6 space-y-6">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="block hover:opacity-80 transition-colors duration-300 text-lg"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
