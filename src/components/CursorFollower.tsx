import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorFollower: React.FC = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Gunakan spring untuk animasi yang lebih smooth dan performa lebih baik
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  // Use ref untuk throttling
  const lastUpdate = useRef(0);
  
  // Throttle mouse movement untuk mengurangi update frequency
  const updateMouse = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastUpdate.current > 16) { // ~60fps
      x.set(e.clientX - 8); // Offset untuk centering
      y.set(e.clientY - 8);
      lastUpdate.current = now;
    }
  }, [x, y]);
  
  // Optimize hover detection dengan useCallback
  const handleMouseEnter = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.closest('button') ||
      target.closest('a') ||
      target.classList.contains('cursor-pointer') ||
      target.style.cursor === 'pointer'
    ) {
      setIsHovering(true);
    }
  }, []);
  
  const handleMouseLeave = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.closest('button') ||
      target.closest('a') ||
      target.classList.contains('cursor-pointer') ||
      target.style.cursor === 'pointer'
    ) {
      setIsHovering(false);
    }
  }, []);
  
  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);
  
  useEffect(() => {
    // Passive event listeners untuk performa lebih baik
    window.addEventListener('mousemove', updateMouse, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseover', handleMouseEnter, { passive: true });
    document.addEventListener('mouseout', handleMouseLeave, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [updateMouse, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave]);
  
  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-blue-600 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          background: isHovering 
            ? 'linear-gradient(45deg, #3B82F6, #8B5CF6)' 
            : isClicking 
            ? '#EF4444' 
            : '#3B82F6'
        }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 25 },
          background: { duration: 0.15 },
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-white-900/30 rounded-full pointer-events-none z-4 mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          scale: isClicking ? 0.6 : isHovering ? 2 : 1,
          opacity: isHovering ? 0.8 : 0.3,
        }}
        transition={{
          scale: { type: "spring", stiffness: 200, damping: 20 },
          opacity: { duration: 0.2 },
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-purple-500 rounded-full pointer-events-none z-30 opacity-60"
        style={{
          x: springX,
          y: springY,
          scale: isHovering ? 1.5 : 0.8,
        }}
        transition={{
          scale: { type: "spring", stiffness: 300, damping: 25 },
        }}
      />
    </>
  );
};

export default CursorFollower;