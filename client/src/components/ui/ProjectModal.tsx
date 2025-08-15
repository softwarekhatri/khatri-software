import { X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./carousel";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title: string;
  description: string;
  technologies: string[];
}

export default function ProjectModal({
  isOpen,
  onClose,
  images,
  title,
  description,
  technologies,
}: ProjectModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-2"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-primary-black rounded-xl shadow-xl w-full max-w-4xl h-[90vh] md:h-[500px] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-black dark:text-white hover:opacity-40 z-10"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={28} />
        </button>
        {/* Carousel */}
        <div className="md:w-1/2 w-full flex flex-col items-center justify-center bg-gray-100 dark:bg-primary-black/80 relative h-48 xs:h-60 sm:h-72 md:h-full min-h-[180px] p-0 md:p-0">
          <Carousel className="w-full h-full">
            <CarouselContent className="h-full">
              {images.map((img, idx) => (
                <CarouselItem
                  key={idx}
                  className="h-full flex items-center justify-center"
                >
                  <div className="w-full h-full flex items-start md:items-center justify-center">
                    <img
                      src={img}
                      alt={title}
                      className="w-full h-full object-cover md:object-contain rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="right-2 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        </div>
        {/* Details */}
        <div className="md:w-1/2 w-full p-4 sm:p-6 flex flex-col justify-start overflow-y-auto max-h-80 md:max-h-full">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-primary-black dark:text-white break-words">
            {title}
          </h2>
          <p className="mb-4 text-gray-700 dark:text-white/80 text-sm sm:text-base break-words">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs sm:text-sm px-3 py-2 bg-primary/10 text-primary rounded font-medium break-words"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
