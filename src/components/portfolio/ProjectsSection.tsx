'use client';

import { motion } from 'framer-motion';
import { PortfolioItem } from '@/lib/firestore';
import { normalizeImagePath } from '@/lib/imageUtils';
import { ExternalLink, Code, Github } from 'lucide-react';
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
    <section id="projects" className="py-24 bg-white">
      <AnimatedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((item, index) => (
              <AnimatedCard
                key={item.id}
                delay={index * 0.1}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              >
                {/* Project Image */}
                {item.imageUrl ? (
                  <div className="w-full relative overflow-hidden flex items-center justify-center p-4">
                    <ImageWithBackground
                      src={item.imageUrl}
                      alt={item.title || "Project"}
                      className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      containerClassName="w-full h-full flex items-center justify-center"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 flex items-center justify-center relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <Code className="w-16 h-16 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="text-gray-700 mb-4 leading-relaxed whitespace-pre-line text-sm">
                      {item.description.replace(/<br\s*\/?>/gi, '\n')}
                    </p>
                  )}

                  {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.technologies.map((tech, index) => (
                        <motion.span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-xs rounded-full font-medium"
                          whileHover={{ scale: 1.05 }}
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
                      className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors font-medium group/link"
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
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
