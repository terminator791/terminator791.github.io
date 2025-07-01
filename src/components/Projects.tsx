// components/Projects.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Calendar, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  X, 
  ZoomIn,
  Download,
  Maximize2
} from 'lucide-react';

type ProjectType = {
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  demoLink: string;
  githubLink: string;
  featured: boolean;
  date: string;
  category: string;
  shortDescription?: string;
  highlights?: string[];
  status?: 'completed' | 'in-progress' | 'maintained' | 'inactive';
};

// Component Lightbox terpisah untuk reusability
const ImageLightbox: React.FC<{
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  projectTitle: string;
}> = ({ images, currentIndex, isOpen, onClose, onPrevious, onNext, projectTitle }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  // Close lightbox dengan ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case ' ':
          e.preventDefault();
          setIsZoomed(!isZoomed);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrevious, onNext, isZoomed]);

  // Prevent body scroll saat lightbox open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle mouse move untuk zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isZoomed || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setImagePosition({ x, y });
  };

  // Download image function
  const downloadImage = async () => {
    try {
      const response = await fetch(images[currentIndex]);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectTitle}-image-${currentIndex + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Header Controls */}
        <motion.div
          className="absolute top-4 left-4 right-4 flex justify-between items-center z-10"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-white">
            <h3 className="text-lg font-semibold">{projectTitle}</h3>
            <p className="text-sm text-gray-300">
              {currentIndex + 1} of {images.length}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Zoom toggle */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(!isZoomed);
              }}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isZoomed ? <Maximize2 size={20} /> : <ZoomIn size={20} />}
            </motion.button>

            {/* Download button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                downloadImage();
              }}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Download size={20} />
            </motion.button>

            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </>
        )}

        {/* Main Image */}
        <motion.div
          className="relative max-w-[90vw] max-h-[80vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <motion.img
            ref={imageRef}
            src={images[currentIndex]}
            alt={`${projectTitle} - Image ${currentIndex + 1}`}
            className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-${isZoomed ? 'zoom-out' : 'zoom-in'}`}
            style={isZoomed ? {
              transformOrigin: `${imagePosition.x}% ${imagePosition.y}%`,
              transform: 'scale(2)',
              transition: 'transform 0.3s ease'
            } : {}}
            onClick={() => setIsZoomed(!isZoomed)}
            onMouseMove={handleMouseMove}
            drag={isZoomed}
            dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
          />
        </motion.div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-2 rounded-lg backdrop-blur-sm"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {images.map((image, index) => (
              <motion.button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  // Update current index - ini akan di-handle di parent component
                }}
                className={`w-12 h-12 rounded overflow-hidden border-2 transition-all ${
                  index === currentIndex 
                    ? 'border-white scale-110' 
                    : 'border-white/30 hover:border-white/60'
                }`}
                whileHover={{ scale: index === currentIndex ? 1.1 : 1.05 }}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Instructions */}
        <motion.div
          className="absolute bottom-4 right-4 text-white/60 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>ESC to close • ← → to navigate • Space to zoom</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'featured' | 'web' | 'others'>('featured');
  
  const projects: ProjectType[] = [
    // PROJEK 1
    {
      title: "Sistem Kependudukan RW.13 Tegalsari (Inactive) | 2024",
      description: "Sistem manajemen data penduduk yang komprehensif dengan fitur entry data, pelaporan, dan analitik. Sistem ini memungkinkan pengelolaan data penduduk secara digital dengan interface yang user-friendly dan dashboard analytics yang informatif. Termasuk entri kos dan warga kos, warga asli, dan pendatang, sampai pengelolaan ketua RT dan RW",
      shortDescription: "Sistem manajemen data penduduk berbasis web dengan analytics. Termasuk entri kos dan warga kos, warga asli, dan pendatang, sampai pengelolaan ketua RT dan RW.",
      images: [
        "/images/population1.png",
        "/images/population2.png",
        "/images/population3.png",
        "/images/population4.png",
        "/images/population5.png",
      ],
      technologies: ["PHP", "Laravel", "MySQL", "Bootstrap", "Chart.js", "MySQL"],
      demoLink: "#",
      githubLink: "https://github.com/terminator791/pbl-sistem-penduduk",
      featured: true,
      date: "2024",
      category: "Web Development",
      highlights: ["Multi-user Management", "Data Export Features"],
      status: 'inactive'
    },
    // PROJEK 2
    {
      title: "Palmer Jateng Platform (Web) | 2024",
      description: "Platform digital untuk Palmer Jateng dengan interface web dan mobile. Platform ini menyediakan layanan informasi, reservasi, dan berbagai fitur untuk mendukung aktivitas Palmer di Jawa Tengah. Termasuk system booking, pengecekan kamar, integrasi payment dengan midtrans, dll.",
      shortDescription: "Platform digital PMI Jateng multi-platform. Termasuk system booking, pengecekan kamar, serta kami mengintegrasikan payment dengan midtrans, dll.",
      images: [
        "/images/palmer1.png",
        "/images/palmer2.png",
        "/images/palmer3.png",
        "/images/palmer4.png",
        "/images/palmer5.png",
        "/images/palmer6.png",
      ],
      technologies: ["PHP", "Laravel", "Filament", "MySQL", "Flutter", "midtrans"],
      demoLink: "https://palmerinjateng.id/",
      githubLink: "#",
      featured: true,
      date: "2024",
      category: "Full Stack",
      highlights: ["Cross-platform", "Login System", "Booking System"],
      status: 'maintained'
    },
    // PROJEK 3
    {
      title: "Inventory & Admin Panel Pusdiklat PMI Booking System (web) | 2024",
      description: "Membangun system inventoris dan admin panel responsif menggunakan filament untuk memonitor inventory booking, termasuk autentikasi berbasis JWT, mendesain API, dll.",
      shortDescription: "Membangun system inventoris dan admin panel responsif menggunakan filament untuk memonitor inventory booking, termasuk autentikasi berbasis JWT, mendesain API, dll.",
      images: [
        "/images/adminpalmer1.png",
        "/images/adminpalmer2.png",
        "/images/adminpalmer3.png",
        "/images/adminpalmer4.png",
        "/images/adminpalmer5.png",
        "/images/adminpalmer6.png",
      ],
      technologies: ["PHP", "Laravel", "Filament", "MySQL", "Flutter", "midtrans"],
      demoLink: "https://palmerinjateng.id/",
      githubLink: "#",
      featured: true,
      date: "2024",
      category: "Full Stack",
      highlights: ["Cross-platform", "Login System", "Booking System"],
      status: 'maintained'
    },
    // PROJEK 4
    {
      title: "Matching Fund Floodsense 2024 (web) | 2024",
      description: "Platform digital untuk Palmer Jateng dengan interface web dan mobile. Platform ini menyediakan layanan informasi, reservasi, dan berbagai fitur untuk mendukung aktivitas Palmer di Jawa Tengah. Termasuk system booking, pengecekan kamar, integrasi payment dengan midtrans, dll.",
      shortDescription: "Platform digital PMI Jateng multi-platform. Termasuk system booking, pengecekan kamar, serta kami mengintegrasikan payment dengan midtrans, dll.",
      images: [
        "/images/floodsense1.png",
        "/images/floodsense2.png",
        "/images/floodsense3.png",
        "/images/floodsense4.png",
        "/images/floodsense5.png",
        "/images/floodsense6.png",
      ],
      technologies: ["PHP", "Laravel", "Filament", "MySQL", "Flutter", "midtrans"],
      demoLink: "https://palmerinjateng.id/",
      githubLink: "#",
      featured: true,
      date: "2024",
      category: "Full Stack",
      highlights: ["Cross-platform", "Login System", "Booking System"],
      status: 'maintained'
    },
  ];

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'featured') return project.featured;
    return project.category.toLowerCase().includes(filter);
  });

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900" id="projects">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Portfolio Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Kumpulan project yang telah saya kerjakan dengan fokus pada user experience dan teknologi modern
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            {['featured', 'all', 'web', 'others'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption as any)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  filter === filterOption
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {filterOption === 'featured' ? 'Featured' : 
                 filterOption === 'all' ? 'Semua' :
                 filterOption === 'web' ? 'Web Dev' : 'Others'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-8"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

type ProjectCardProps = {
  project: ProjectType;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play carousel saat hover
  useEffect(() => {
    if (isHovered && project.images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImg((prev) => (prev + 1) % project.images.length);
      }, 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, project.images.length]);

  const nextImage = () => {
    setCurrentImg((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImg((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'maintained': return 'bg-blue-500';
      case 'inactive': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 group"
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Enhanced Image Carousel */}
        <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700">
          <div className="relative h-72">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImg}
                src={project.images[currentImg]}
                alt={`${project.title} - Image ${currentImg + 1}`}
                className="w-full h-full object-cover cursor-pointer"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                onLoad={() => setIsImageLoading(false)}
                onLoadStart={() => setIsImageLoading(true)}
                onClick={() => openLightbox(currentImg)}
              />
            </AnimatePresence>

            {/* Loading skeleton */}
            {isImageLoading && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-600 animate-pulse" />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Fullscreen button */}
            <motion.button
              onClick={() => openLightbox(currentImg)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Maximize2 size={16} />
            </motion.button>

            {/* Navigation buttons */}
            {project.images.length > 1 && (
              <>
                <motion.button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft size={20} />
                </motion.button>
                <motion.button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight size={20} />
                </motion.button>
              </>
            )}

            {/* Image indicators */}
            {project.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImg(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImg 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                {project.category}
              </div>
              <div className={`${getStatusColor(project.status || 'completed')} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                {project.status === 'completed' ? 'Selesai' :
                 project.status === 'in-progress' ? 'Progress' :
                 project.status === 'maintained' ? 'Maintained' :
                 project.status === 'inactive' ? 'Inactive' : 'Unknown'}
              </div>
            </div>

            {project.featured && (
              <div className="absolute top-4 right-16 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Star size={14} fill="currentColor" /> Featured
              </div>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
              {currentImg + 1}/{project.images.length}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
              <Calendar size={14} />
              {project.date}
            </div>
          </div>

          {/* Highlights */}
          {project.highlights && (
            <div className="flex flex-wrap gap-1 mb-3">
              {project.highlights.map((highlight, i) => (
                <span
                  key={i}
                  className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md text-xs font-medium"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}

          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
            {project.shortDescription || project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, i) => (
              <motion.span
                key={i}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-3">
            <motion.button
              onClick={() => openLightbox(0)}
              className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye size={16} />
              Lihat Gambar
            </motion.button>
            <motion.a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl flex-1 text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink size={16} />
              Live Demo
            </motion.a>
            <motion.a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github size={16} />
              Code
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <ImageLightbox
        images={project.images}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onPrevious={prevLightboxImage}
        onNext={nextLightboxImage}
        projectTitle={project.title}
      />
    </>
  );
};

export default Projects;