import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Simplified GalleryItem type
type GalleryItem = {
  id: string;
  image: string;
  description: string;
  date: string;
  location?: string;
};

const Gallery: React.FC = () => {
  const [ref] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      image: '/gallery/pmi1.jpeg',
      description: 'PMI Team discussion on platform planning with Client',
      date: '2024-10-10',
      location: 'Semarang'
    },
    {
      id: '2',
      image: '/gallery/pmi2.jpeg',
      description: 'PMI Team discussion',
      date: '2024-10-20'
    },
    {
      id: '3',
      image: '/gallery/floodsense1.jpeg',
      description: 'Floodsense Team Meeting',
      date: '2024-10-10',
      location: 'Semarang'
    },
    {
      id: '4',
      image: '/gallery/floodsense2.jpeg',
      description: 'Floodsense Team Presentation',
      date: '2024-10-20'
    },
    {
      id: '5',
      image: '/gallery/floodsense3.jpeg',
      description: 'Floodsense Team On Location',
      date: '2024-03-15',
      location: 'Semarang'
    },
    {
      id: '6',
      image: '/gallery/mitkam1.jpeg',
      description: 'Presentation of Odoo system for Mitkam',
      date: '2025-06-20'
    },
    {
      id: '7',
      image: '/gallery/wordpress1.jpeg',
      description: 'Mulyo Utomo On Location',
      date: '2024-06-10',
      location: 'Rembang'
    },
    {
      id: '8',
      image: '/gallery/wordpress2.jpeg',
      description: 'Presentation of Landing Page for TB Mulyo Utomo',
      date: '2024-07-20'
    }
  ];

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item);
    const index = galleryItems.findIndex(i => i.id === item.id);
    setLightboxIndex(index);
  };

  const closeLightbox = () => setSelectedImage(null);

  const nextImage = () => {
    const next = (lightboxIndex + 1) % galleryItems.length;
    setLightboxIndex(next);
    setSelectedImage(galleryItems[next]);
  };

  const prevImage = () => {
    const prev = (lightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    setLightboxIndex(prev);
    setSelectedImage(galleryItems[prev]);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [selectedImage, lightboxIndex]);

  return (
    <section ref={ref} className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-200">Gallery</h2>
      <div className="max-w-5xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item) => (
          <motion.div
            key={item.id}
            className="cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
            onClick={() => openLightbox(item)}
            whileHover={{ scale: 1.02 }}
          >
            <img src={item.image} alt="gallery" className="w-full h-64 object-cover" />
            <div className="p-4 text-sm text-gray-600 dark:text-gray-400">
              <p className="mb-2 line-clamp-2">{item.description}</p>
              <div className="flex items-center gap-2 text-xs">
                <Calendar size={12} /> {new Date(item.date).toLocaleDateString()}
                {item.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {item.location}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-[90vw] max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <img
                src={selectedImage.image}
                alt="selected"
                className="max-w-full max-h-full object-contain rounded shadow-xl"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/60 p-3 text-sm text-white rounded">
                <p>{selectedImage.description}</p>
                <div className="flex items-center gap-4 text-xs mt-2">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} /> {new Date(selectedImage.date).toLocaleDateString()}
                  </div>
                  {selectedImage.location && (
                    <div className="flex items-center gap-1">
                      <MapPin size={12} /> {selectedImage.location}
                    </div>
                  )}
                </div>
              </div>
              <button onClick={closeLightbox} className="absolute top-4 right-4 text-white">
                <X size={20} />
              </button>
            </motion.div>

            {galleryItems.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white">
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;