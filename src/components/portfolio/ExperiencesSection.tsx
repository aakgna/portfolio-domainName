'use client';

import { motion } from 'framer-motion';
import { PortfolioItem } from '@/lib/firestore';
import { normalizeImagePath } from '@/lib/imageUtils';
import { Briefcase, MapPin, Calendar, Code, ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';
import ImageWithBackground from '@/components/ImageWithBackground';

interface ExperiencesSectionProps {
  experiences: PortfolioItem[];
}

export default function ExperiencesSection({ experiences }: ExperiencesSectionProps) {
  if (experiences.length === 0) return null;

  return (
    <section id="experiences" className="py-32 relative">
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
              <Briefcase className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">Career Journey</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Experience</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="space-y-8">
            {experiences.map((item, index) => (
              <AnimatedCard
                key={item.id}
                delay={index * 0.1}
                className="group"
              >
                <motion.div
                  className="glass-strong rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    {item.imageUrl ? (
                      <div className="md:w-1/3 relative overflow-hidden flex items-center justify-center p-6">
                        <ImageWithBackground
                          src={item.imageUrl}
                          alt={item.company || item.role || "Experience"}
                          className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                          containerClassName="w-full h-full flex items-center justify-center"
                        />
                      </div>
                    ) : (
                      <div className="md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center relative overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                        <Briefcase className="w-16 h-16 text-white relative z-10 opacity-80" />
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="flex-1 p-6 md:p-8">
                      <div className="flex items-start gap-4">
                        {item.imageUrl ? (
                          <div className="flex-shrink-0">
                            <img
                              src={normalizeImagePath(item.imageUrl)}
                              alt={item.company || item.role || "Experience"}
                              className="w-14 h-14 rounded-xl object-cover shadow-lg"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="flex-shrink-0">
                            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                              <Briefcase className="w-7 h-7 text-white" />
                            </div>
                          </div>
                        )}

                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-5 h-5 text-green-400" />
                            <h3 className="text-2xl font-bold text-white">
                              {item.role || item.title}
                            </h3>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4 text-green-400" />
                              {item.link ? (
                                <Link
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-green-400 transition-colors font-medium"
                                >
                                  {item.company}
                                </Link>
                              ) : (
                                <span className="font-medium">{item.company}</span>
                              )}
                            </div>

                            {item.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-green-400" />
                                <span>{item.location}</span>
                              </div>
                            )}

                            {item.startDate && (
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-green-400" />
                                <span>
                                  {new Date(item.startDate).getFullYear()} - {
                                    item.endDate
                                      ? new Date(item.endDate).getFullYear()
                                      : 'Present'
                                  }
                                </span>
                              </div>
                            )}
                          </div>

                          {item.description && (
                            <p className="text-gray-300 leading-relaxed mb-4 whitespace-pre-line">
                              {item.description.replace(/<br\s*\/?>/gi, '\n')}
                            </p>
                          )}

                          {item.technologies && item.technologies.length > 0 && (
                            <div className="flex items-start gap-2 mb-4">
                              <Code className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <div className="flex flex-wrap gap-2">
                                {item.technologies.map((tech, techIndex) => (
                                  <motion.span
                                    key={techIndex}
                                    className="px-3 py-1 glass text-green-300 text-xs rounded-full font-medium"
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    {tech}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          )}

                          {item.link && (
                            <Link
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors text-sm font-medium group/link"
                            >
                              <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                              Visit Company Website
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
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
