'use client';

import { motion } from 'framer-motion';
import { PortfolioItem } from '@/lib/firestore';
import { FileText, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';

interface PublicationsSectionProps {
  publications: PortfolioItem[];
}

export default function PublicationsSection({ publications }: PublicationsSectionProps) {
  if (publications.length === 0) return null;

  return (
    <section id="publications" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <AnimatedSection>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Publications</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="space-y-6">
            {publications.map((item, index) => (
              <AnimatedCard
                key={item.id}
                delay={index * 0.1}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  {item.imageUrl ? (
                    <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title || "Publication"}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <FileText className="w-16 h-16 text-white opacity-80" />
                    </div>
                  )}

                  {/* Content Section */}
                  <div className="flex-1 p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      {!item.imageUrl && (
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <FileText className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      )}

                      <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                        {item.description.replace(/<br\s*\/?>/gi, '\n')}
                      </p>
                    )}

                    {item.link && (
                      <Link
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors font-medium group/link"
                      >
                        <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        Read Article
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
