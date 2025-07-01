import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  link?: string;
  type: 'education' | 'experience' | 'project';
}

interface TimelineProps {
  items: TimelineItem[];
  title: string;
}

const Timeline: React.FC<TimelineProps> = ({ items, title }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'education':
        return 'bg-blue-600';
      case 'experience':
        return 'bg-green-600';
      case 'project':
        return 'bg-purple-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div ref={ref} className="max-w-4xl mx-auto">
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
      >
        {title}
      </motion.h3>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative"
      >
        {/* Timeline line */}
        <motion.div
          initial={{ height: 0 }}
          animate={inView ? { height: '100%' } : { height: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute left-4 top-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"
        />

        {items.map((item, index) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className="relative pl-12 pb-12 last:pb-0"
          >
            {/* Timeline dot */}
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: index * 0.2 + 0.5, type: "spring", stiffness: 200 }}
              className={`absolute left-2 top-2 w-4 h-4 ${getTypeColor(item.type)} rounded-full border-4 border-white dark:border-gray-900 shadow-lg`}
            />

            <motion.div
              whileHover={{ scale: 1.02, x: 5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                    {item.organization}
                  </p>
                </div>
                {item.link && (
                  <motion.a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <ExternalLink size={18} />
                  </motion.a>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {item.period}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  {item.location}
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {item.description}
              </p>

              {item.highlights.length > 0 && (
                <div>
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Key Highlights:
                  </h5>
                  <ul className="space-y-1">
                    {item.highlights.map((highlight, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.2 + idx * 0.1 + 0.8 }}
                        className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Timeline;