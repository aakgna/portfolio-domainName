'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import Image from 'next/image';
import { User, Sparkles } from 'lucide-react';

interface ObjectiveSectionProps {
  content: string;
}

const personalPhotos = [
  '/personal/IMG_4484.jpeg',
  '/personal/IMG_4454.jpeg',
];

export default function ObjectiveSection({ content }: ObjectiveSectionProps) {
  const formattedContent = content.replace(/<br\s*\/?>/gi, '\n');
  
  return (
    <section id="objective" className="py-32 relative">
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
              <User className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">About Me</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Who I Am</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              className="glass-strong rounded-3xl p-8 md:p-12"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4">My Story</h3>
                  <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
                    {formattedContent}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: Personal Photos Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {personalPhotos.map((photo, index) => (
                <motion.div
                  key={index}
                  className="glass-strong rounded-2xl overflow-hidden aspect-square relative group"
                  whileHover={{ scale: 1.05, z: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={photo}
                    alt={`Aakash ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
