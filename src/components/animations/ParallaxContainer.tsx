
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxContainerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const ParallaxContainer = ({ 
  children, 
  speed = 0.5, 
  className = '',
  direction = 'up'
}: ParallaxContainerProps) => {
  const { scrollY } = useScroll();
  
  const getTransform = () => {
    switch (direction) {
      case 'up':
        return useTransform(scrollY, [0, 1000], [0, -speed * 100]);
      case 'down':
        return useTransform(scrollY, [0, 1000], [0, speed * 100]);
      case 'left':
        return useTransform(scrollY, [0, 1000], [0, -speed * 50]);
      case 'right':
        return useTransform(scrollY, [0, 1000], [0, speed * 50]);
      default:
        return useTransform(scrollY, [0, 1000], [0, -speed * 100]);
    }
  };

  const transform = getTransform();

  return (
    <motion.div
      className={className}
      style={{
        ...(direction === 'left' || direction === 'right' 
          ? { x: transform } 
          : { y: transform }
        )
      }}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxContainer;
