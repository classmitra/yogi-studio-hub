
import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  className?: string;
  duration?: number;
}

const ScrollReveal = ({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = '',
  duration = 0.8
}: ScrollRevealProps) => {
  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 60 };
      case 'down':
        return { opacity: 0, y: -60 };
      case 'left':
        return { opacity: 0, x: 60 };
      case 'right':
        return { opacity: 0, x: -60 };
      case 'fade':
        return { opacity: 0 };
      default:
        return { opacity: 0, y: 60 };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      case 'fade':
        return { opacity: 1 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.25, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
