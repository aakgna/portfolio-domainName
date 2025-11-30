'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';

interface ObjectiveSectionProps {
  content: string;
}

export default function ObjectiveSection({ content }: ObjectiveSectionProps) {
  const formattedContent = content.replace(/<br\s*\/?>/gi, '\n');
  
  return (
    <section id="objective" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <AnimatedSection>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Me
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto whitespace-pre-line">
              {formattedContent}
            </p>
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  );
}
