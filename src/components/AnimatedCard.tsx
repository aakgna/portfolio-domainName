'use client';

import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export default function AnimatedCard({ 
  children, 
  className = '', 
  delay = 0,
  hover = true 
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={className}
    >
      {children}
    </motion.div>
  );
}

