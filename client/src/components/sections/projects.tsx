import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with advanced analytics and inventory management.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    technologies: ["React", "Node.js", "MongoDB"]
  },
  {
    title: "Corporate Web Platform",
    description: "Enterprise-level web platform with real-time data visualization and reporting.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    technologies: ["Vue.js", "Python", "PostgreSQL"]
  },
  {
    title: "Mobile App Suite",
    description: "Cross-platform mobile application with seamless user experience and offline capabilities.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    technologies: ["React Native", "Firebase", "GraphQL"]
  }
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref);

  return (
    <section id="projects" className="py-20 bg-secondary-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-thin mb-6">
            Featured <span className="font-bold">Projects</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            A showcase of our innovative solutions and successful client collaborations
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="glassmorphism rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 group"
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-white/70 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 bg-white/10 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <button className="text-white/80 hover:text-white transition-colors duration-300 flex items-center">
                  <ExternalLink size={16} className="mr-2" />
                  View Project
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
