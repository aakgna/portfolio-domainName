'use client';

import { motion } from 'framer-motion';
import { Zap, Sparkles } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

interface SkillsSectionProps {
  skills: string[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  if (skills.length === 0) return null;

  const skillCategories = [
    { color: 'from-green-400 to-emerald-500', icon: '🌱' },
    { color: 'from-teal-400 to-cyan-500', icon: '💻' },
    { color: 'from-lime-400 to-green-500', icon: '🎨' },
    { color: 'from-emerald-400 to-teal-500', icon: '🚀' },
    { color: 'from-green-500 to-lime-500', icon: '🔥' },
    { color: 'from-cyan-400 to-teal-500', icon: '✨' },
  ];

  return (
    <section id="skills" className="py-32 relative">
      <AnimatedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">Technologies</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => {
              const category = skillCategories[index % skillCategories.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -8, rotate: [0, -5, 5, -5, 0] }}
                  className="group relative"
                >
                  <motion.div
                    className={`glass-strong px-6 py-4 rounded-2xl flex items-center gap-3 cursor-default relative overflow-hidden`}
                    whileHover={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)' }}
                  >
                    {/* Animated background gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    
                    <span className="text-2xl relative z-10">{category.icon}</span>
                    <span className="text-white font-semibold relative z-10">{skill}</span>
                    
                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      style={{
                        boxShadow: `0 0 20px rgba(34, 197, 94, 0.6)`,
                      }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
