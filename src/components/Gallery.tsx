import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Camera, 
  Users, 
  Calendar, 
  MapPin, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download,
  Maximize2,
  ZoomIn,
  Filter,
  Grid3X3,
  List
} from 'lucide-react';

type GalleryItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'project' | 'meeting' | 'event' | 'workspace';
  date: string;
  location?: string;
  tags: string[];
};

const Gallery: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState<'all' | 'project' | 'meeting' | 'event' | 'workspace'>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');

  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      title: 'Palmer Jateng Development Meeting',
      description: 'Team discussion about platform architecture and feature planning',
      image: '/images/palmer1.png',
      category: 'meeting',
      date: '2024-03-15',
      location: 'Semarang Office',
      tags: ['Laravel', 'Team Meeting', 'Planning']
    },
    {
      id: '2',
      title: 'Population System Dashboard',
      description: 'Final presentation of the population management system',
      image: '/images/population1.png',
      category: 'project',
      date: '2024-02-20',
      tags: ['PHP', 'Laravel', 'Dashboard']
    },
    {
      id: '3',
      title: 'Client Meeting - Floodsense Project',
      description: 'Discussing flood monitoring system requirements with stakeholders',
      image: '/images/floodsense1.png',
      category: 'meeting',
      date: '2024-04-10',
      location: 'Client Office',
      tags: ['Monitoring', 'Client Meeting', 'Requirements']
    },
    {
      id: '4',
      title: 'Odoo Enterprise System Demo',
      description: 'Demonstrating the enterprise system capabilities to the team',
      image: '/images/odoo1.png',
      category: 'project',
      date: '2025-01-05',
      tags: ['Odoo', 'Enterprise', 'Demo']
    },
    {
      id: '5',
      title: 'Development Workspace',
      description: 'My daily development environment setup',
      image: '/images/adminpalmer1.png',
      category: 'workspace',
      date: '2024-05-01',
      tags: ['Workspace', 'Development', 'Setup']
    },
    {
      id: '6',
      title: 'Team Collaboration Session',
      description: 'Working together on the Palmer admin panel features',
      image: '/images/adminpalmer2.png',
      category: 'meeting',
      date: '2024-03-25',
      location: 'Co-working Space',
      tags: ['Collaboration', 'Admin Panel', 'Features']
    },
    {
      id: '7',
      title: 'Game Development Showcase',
      description: 'Presenting the Finley Adventure Game mechanics',
      image: '/images/game1.png',
      category: 'project',
      date: '2024-06-15',
      tags: ['Unity', 'Game Dev', 'Showcase']
    },
    {
      id: '8',
      title: 'IoT Monitoring Setup',
      description: 'Setting up sensor monitoring system for real-time data',
      image: '/images/iot1.png',
      category: 'project',
      date: '2024-07-20',
      tags: ['IoT', 'Sensors', 'Monitoring']
    }
  ];

  const filteredItems = galleryItems.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  const categories = [
    { id: 'all', label: 'All', icon: Grid3X3 },
    { id: 'project', label: 'Projects', icon: Camera },
    { id: 'meeting', label: 'Meetings', icon: Users },
    { id: 'workspace', label: 'Workspace', icon: List }
  ];

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item);
    const index = filteredItems.findIndex(i => i.id === item.id);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (lightboxIndex + 1) % filteredItems.length;
    setLightboxIndex(nextIndex);
    setSelectedImage(filteredItems[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxIndex(prevIndex);
    setSelectedImage(filteredItems[prevIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, lightboxIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Project Gallery
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            A visual journey through my projects, client meetings, and development process
          </motion.p>
        </motion.div>

        {/* Filters and View Toggle */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4"
        >
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={16} />
                  {category.label}
                </motion.button>
              );
            })}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
            <motion.button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Grid3X3 size={16} />
            </motion.button>
            <motion.button
              onClick={() => setViewMode('masonry')}
              className={`p-2 rounded-md transition-all duration-300 ${
                viewMode === 'masonry'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Filter size={16} />
            </motion.button>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'columns-1 md:columns-2 lg:columns-3'
          }`}
        >
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`group cursor-pointer ${viewMode === 'masonry' ? 'break-inside-avoid mb-6' : ''}`}
                onClick={() => openLightbox(item)}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      whileHover={{ scale: 1.05 }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.category === 'project' ? 'bg-blue-600 text-white' :
                        item.category === 'meeting' ? 'bg-green-600 text-white' :
                        item.category === 'workspace' ? 'bg-purple-600 text-white' :
                        'bg-gray-600 text-white'
                      }`}>
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </span>
                    </div>

                    {/* Expand Button */}
                    <motion.button
                      className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Maximize2 size={16} />
                    </motion.button>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                      {item.location && (
                        <div className="flex items-center gap-1">
                          <MapPin size={12} />
                          {item.location}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                          +{item.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No items found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try selecting a different category to see more content.
            </p>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Header */}
            <motion.div
              className="absolute top-4 left-4 right-4 flex justify-between items-center z-10"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-white">
                <h3 className="text-lg font-semibold">{selectedImage.title}</h3>
                <p className="text-sm text-gray-300">
                  {lightboxIndex + 1} of {filteredItems.length}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Download functionality
                  }}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Download size={20} />
                </motion.button>
                <motion.button
                  onClick={closeLightbox}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>
            </motion.div>

            {/* Navigation */}
            {filteredItems.length > 1 && (
              <>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
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
                    nextImage();
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
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </motion.div>

            {/* Image Info */}
            <motion.div
              className="absolute bottom-4 left-4 right-4 bg-black/50 p-4 rounded-lg backdrop-blur-sm"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-white font-semibold mb-2">{selectedImage.title}</h4>
              <p className="text-gray-300 text-sm mb-3">{selectedImage.description}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(selectedImage.date).toLocaleDateString()}
                  </div>
                  {selectedImage.location && (
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      {selectedImage.location}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {selectedImage.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-white/20 text-white rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Instructions */}
            <motion.div
              className="absolute bottom-4 right-4 text-white/60 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p>ESC to close • ← → to navigate</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;