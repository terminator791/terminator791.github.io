import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Trophy, Target } from 'lucide-react';

interface AchievementBadgeProps {
  title: string;
  description: string;
  type: 'award' | 'star' | 'trophy' | 'target';
  unlocked?: boolean;
  delay?: number;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  title,
  description,
  type,
  unlocked = true,
  delay = 0
}) => {
  const icons = {
    award: Award,
    star: Star,
    trophy: Trophy,
    target: Target
  };

  const Icon = icons[type];

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        delay,
        type: "spring",
        stiffness: 200,
        damping: 10
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      className={`achievement-badge ${
        unlocked 
          ? 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700' 
          : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 border-gray-200 dark:border-gray-700'
      } cursor-pointer group relative`}
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <Icon size={16} />
      </motion.div>
      <span className="font-medium">{title}</span>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
        {description}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
      </div>
    </motion.div>
  );
};

export default AchievementBadge;