'use client';

import { motion } from 'framer-motion';
import { PortfolioItem } from '@/lib/firestore';
import { normalizeImagePath } from '@/lib/imageUtils';
import { ExternalLink, Code, Github, Sparkles } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import ImageWithBackground from '@/components/ImageWithBackground';

interface ProjectsSectionProps {
  projects: PortfolioItem[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="py-32 relative">
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
              <Code className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-gray-300">My Work</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 via-teal-500 to-emerald-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((item, index) => (
              <AnimatedCard
                key={item.id}
                delay={index * 0.1}
                className="group"
              >
                <motion.div
                  className="glass-strong rounded-3xl overflow-hidden h-full flex flex-col hover:scale-105 transition-all duration-300"
                  whileHover={{ y: -10 }}
                >
                  {/* Project Image */}
                  {item.imageUrl ? (
                    <div className="w-full h-48 relative overflow-hidden">
                      <ImageWithBackground
                        src={item.imageUrl}
                        alt={item.title || "Project"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        containerClassName="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-green-500 via-teal-500 to-emerald-600 flex items-center justify-center relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      />
                      <Code className="w-16 h-16 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors flex-1">
                        {item.title}
                      </h3>
                    </div>

                    {item.description && (
                      <p className="text-gray-300 mb-4 leading-relaxed whitespace-pre-line text-sm flex-1">
                        {item.description.replace(/<br\s*\/?>/gi, '\n')}
                      </p>
                    )}

                    {item.technologies && item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className="px-3 py-1 glass text-green-300 text-xs rounded-full font-medium"
                            whileHover={{ scale: 1.1 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    )}

                    {item.link && (
                      <Link
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors font-medium group/link mt-auto"
                      >
                        {item.link.includes('github.com') ? (
                          <>
                            <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                            View on GitHub
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            View Project
                          </>
                        )}
                      </Link>
                    )}
                  </div>
                </motion.div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
