import Navigation from "@/components/ui/navigation";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Services from "@/components/sections/services";
import Projects from "@/components/sections/projects";
import Testimonials from "@/components/sections/testimonials";
// import QuoteForm from "@/components/sections/quote-form";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import ScrollToTop from "@/components/ui/scroll-to-top";

export default function Home() {
  return (
    <div className="font-inter bg-primary-black text-pure-white overflow-x-hidden">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Testimonials />
      {/* @khatrichanges <QuoteForm /> */}
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
