'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/CherL01',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/cherry-yi-lian/',
    icon: Linkedin,
  },
  {
    name: 'Portfolio',
    href: 'https://cherrylian01.wixsite.com/engineeringportfolio',
    icon: ExternalLink,
  },
  {
    name: 'Email',
    href: 'mailto:cherry.lian@gatech.edu',
    icon: Mail,
  },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Yi (Cherry) Lian. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.name !== 'Email' ? '_blank' : undefined}
                  rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-center text-xs text-gray-500">
            Built with Next.js, Tailwind CSS, and Framer Motion. 
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> • </span>
            Hosted on Vercel.
          </div>
        </div>
      </div>
    </footer>
  );
} 