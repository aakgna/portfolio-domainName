'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

interface SkillsSectionProps {
  skills: string[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  if (skills.length === 0) return null;

  return (
    <section id="skills" className="py-24 bg-white">
      <AnimatedSection>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Skills</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-yellow-200 group cursor-default"
              >
                <Zap className="w-5 h-5 text-yellow-500 group-hover:rotate-12 transition-transform" />
                <span className="text-gray-800 font-semibold">{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
