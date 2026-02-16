'use client';

import { motion } from 'framer-motion';
import { PortfolioItem } from '@/lib/firestore';
import { normalizeImagePath } from '@/lib/imageUtils';
import { Briefcase, MapPin, Calendar, Code, ExternalLink } from 'lucide-react';
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
    <section id="experiences" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <AnimatedSection>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Experience</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-600 to-blue-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="space-y-8">
            {experiences.map((item, index) => (
              <AnimatedCard
                key={item.id}
                delay={index * 0.1}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  {item.imageUrl ? (
                    <div className="md:w-1/3 relative overflow-hidden flex items-center justify-center p-4">
                      <ImageWithBackground
                        src={item.imageUrl}
                        alt={item.company || item.role || "Experience"}
                        className="w-auto h-auto max-w-full max-h-full object-contain"
                        containerClassName="w-full h-full flex items-center justify-center"
                      />
                    </div>
                  ) : (
                    <div className="md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <Briefcase className="w-16 h-16 text-white opacity-80" />
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
                            className="w-12 h-12 rounded-xl object-cover shadow-lg"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Briefcase className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      )}

                      <div className="flex-grow">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {item.role || item.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-green-600" />
                            {item.link ? (
                              <Link
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-green-600 transition-colors font-medium"
                              >
                                {item.company}
                              </Link>
                            ) : (
                              <span className="font-medium">{item.company}</span>
                            )}
                          </div>

                          {item.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-green-600" />
                              <span>{item.location}</span>
                            </div>
                          )}

                          {item.startDate && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-green-600" />
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
                          <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                            {item.description.replace(/<br\s*\/?>/gi, '\n')}
                          </p>
                        )}

                        {item.technologies && item.technologies.length > 0 && (
                          <div className="flex items-start gap-2 mb-4">
                            <Code className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                            <div className="flex flex-wrap gap-2">
                              {item.technologies.map((tech, index) => (
                                <motion.span
                                  key={index}
                                  className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-xs rounded-full font-medium"
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
                            className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors text-sm font-medium group"
                          >
                            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            Visit Company Website
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
