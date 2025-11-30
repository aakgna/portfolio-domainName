'use client';

import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCard from '@/components/AnimatedCard';

interface ContactLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

const contacts: ContactLink[] = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/aakgna/',
    icon: <Linkedin className="w-6 h-6" />,
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/aakgna/',
    icon: <Github className="w-6 h-6" />,
    color: 'from-gray-700 to-gray-900',
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/aakgna',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: 'from-black to-gray-800',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@aakashg_1',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
    color: 'from-pink-500 to-red-500',
  },
  {
    name: 'App Store',
    url: 'https://apps.apple.com/us/developer/aakash-gnanakumar/id1793862845',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C1.79 15.25 2.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
    ),
    color: 'from-gray-800 to-black',
  },
  {
    name: 'Email',
    url: 'mailto:aakashappiah@gmail.com',
    icon: <Mail className="w-6 h-6" />,
    color: 'from-red-500 to-pink-500',
  },
];

export default function ContactsSection() {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <AnimatedSection>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact, index) => (
              <AnimatedCard
                key={contact.name}
                delay={index * 0.1}
                className="group"
              >
                <Link
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 group-hover:border-transparent"
                >
                  <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${contact.color} rounded-lg flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                    {contact.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {contact.name}
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                </Link>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
