import React from 'react';
import { motion } from 'framer-motion';

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Wraps any section with a scroll-triggered fade-in + slide-up animation.
 * Uses framer-motion's `whileInView` so the animation plays once when
 * the section enters the viewport.
 */
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1], // custom cubic-bezier for premium feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
