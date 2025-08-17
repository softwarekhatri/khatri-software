import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef, useState } from "react";
import ProjectModal from "../ui/ProjectModal";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "We've built a Multi-Vendor E-Commerce Platform which is a scalable and secure marketplace solution built with Python, React.js, and MongoDB, designed to connect multiple sellers across categories like groceries, electronics, clothing, and more. With Razorpay and UPI payment integration, automated email notifications, and a powerful admin panel, it offers vendors seamless product management while ensuring customers enjoy a fast, reliable, and secure shopping experience.",
    images: [
      "/ecomm/p1.png",
      "/ecomm/p2.png",
      "/ecomm/p3.png",
      "/ecomm/p4.png",
      "/ecomm/p5.png",
      "/ecomm/p6.png",
      "/ecomm/p7.png"
    ],
    technologies: ["React", "Python", "Flask", "MongoDB"],
  },
  {
    title: "Smart HR Management Platform",
    description:
      "This platform is a comprehensive HR Management Platform, a scalable and secure workforce solution developed using React, Java Spring Boot, and MySQL. Designed to streamline employee management, it integrates attendance tracking, timesheets, leave requests, payroll processing, tax compliance, and employee profiles into one unified system. With role-based access control, automated email notifications, and real-time reporting, it empowers HR teams to manage operations efficiently while providing employees with a seamless self-service experience. The platform ensures data security, accuracy, and scalability, making it an ideal choice for businesses of all sizes to manage their workforce with ease.",
    images: [
      "/hrm/p1.png",
      "/hrm/p2.png",
      "/hrm/p3.png",
      "/hrm/p4.png",
      "/hrm/p5.png",
      "/hrm/p6.png",
      "/hrm/p7.png",
      "/hrm/p8.png"
    ],
    technologies: ["React.js", "Java", "Spring Boot", "MySQL"],
  },
  {
    title: "Online Learning Platform",
    description:
      "A comprehensive online coaching platform that makes learning simple, engaging, and accessible. From school classes (6–12) to competitive exams like IIT, MBBS, and GRE, it offers online admissions, recorded lectures, interactive quizzes, a dynamic gallery, and direct query support - all in one place. With a student-friendly design and smooth navigation, it ensures a complete learning experience for academic growth and exam success.",
    images: [
      "/occ/p1.png",
      "/occ/p2.png",
      "/occ/p3.png",
      "/occ/p4.png",
      "/occ/p5.png",
      "/occ/p6.png",
      "/occ/p7.png",
      "/occ/p8.png",
      "/occ/p9.png",
      "/occ/p10.png",
      "/occ/p11.png"
    ],
    technologies: ["React", "Node.js", "MongoDB"],
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
              onClick={() => handleOpenModal(project)}
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
