import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef, useState } from "react";
import ProjectModal from "../ui/ProjectModal";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with advanced analytics and inventory management.",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    ],
    technologies: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Corporate Web Platform",
    description:
      "Enterprise-level web platform with real-time data visualization and reporting.",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    ],
    technologies: ["Vue.js", "Python", "PostgreSQL"],
  },
  {
    title: "Mobile App Suite",
    description:
      "Cross-platform mobile application with seamless user experience and offline capabilities.",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    ],
    technologies: ["React Native", "Firebase", "GraphQL"],
  },
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<
    null | (typeof projects)[0]
  >(null);

  const handleOpenModal = (project: (typeof projects)[0]) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

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
            A showcase of our innovative solutions and successful client
            collaborations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="glassmorphism rounded-2xl overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                scale: 1.06,
                y: -8,
                boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)",
                zIndex: 2,
              }}
              whileTap={{ scale: 0.98 }}
              style={{ touchAction: "manipulation" }}
            >
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {project.title}
                </h3>
                <p className="text-white/70 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm px-3 py-2 bg-white/10 rounded font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <button
                  className="text-white/80 hover:text-white transition-colors duration-300 flex items-center"
                  onClick={() => handleOpenModal(project)}
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {selectedProject && (
        <ProjectModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          images={selectedProject.images}
          title={selectedProject.title}
          description={selectedProject.description}
          technologies={selectedProject.technologies}
        />
      )}
    </section>
  );
}
