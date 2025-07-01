import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <motion.div
      className="progress-bar"
      style={{ width: `${scrollProgress * 100}%` }}
      initial={{ width: 0 }}
      animate={{ width: `${scrollProgress * 100}%` }}
      transition={{ duration: 0.1 }}
    />
  );
};

export default ProgressBar;