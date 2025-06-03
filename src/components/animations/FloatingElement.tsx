
import React from 'react';
import { motion } from 'framer-motion';

interface FloatingElementProps {
  children: React.ReactNode;
  intensity?: number;
  duration?: number;
  className?: string;
}

const FloatingElement = ({ 
  children, 
  intensity = 10, 
  duration = 6,
  className = ''
}: FloatingElementProps) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-intensity, intensity, -intensity],
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
