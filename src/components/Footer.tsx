'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const socialLinks = [
  {
    name: 'Email',
    href: 'mailto:cherry.lian@gatech.edu',
    icon: Mail,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/cherry-yi-lian/',
    icon: Linkedin,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/CherL01',
    icon: Github,
  },
  {
    name: 'Portfolio',
    href: 'https://cherrylian01.wixsite.com/engineeringportfolio',
    icon: ExternalLink,
  },
];

function TypingAnimation() {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const getCurrentMonth = () => {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const now = new Date();
      return `${months[now.getMonth()]} ${now.getFullYear()}`;
    };

    const texts = [
      'Built with Next.js, Tailwind CSS, and Framer Motion.',
      `Last updated in ${getCurrentMonth()}.`
    ];

    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < texts[currentIndex].length) {
        timeoutId = setTimeout(() => {
          setDisplayText(texts[currentIndex].slice(0, displayText.length + 1));
        }, 50); // Typing speed
      } else {
        // Pause at end of text, then start erasing
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 2000); // Pause duration
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30); // Erasing speed
      } else {
        // Move to next text and start typing
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, currentIndex, isTyping]);

  return (
    <span>
      {displayText}
      <motion.span
        className="inline-block ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
      >
        |
      </motion.span>
    </span>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Layout */}
        <div className="flex flex-col items-center space-y-4 lg:hidden">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Yi (Cherry) Lian. All rights reserved.
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 min-h-[1.5rem] flex items-center justify-center">
            <TypingAnimation />
          </div>
          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.name !== 'Email' ? '_blank' : undefined}
                  rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
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

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:items-center lg:gap-8">
          {/* Copyright - Left */}
          <div className="text-sm text-gray-600 dark:text-gray-400 justify-self-start">
            © {new Date().getFullYear()} Yi (Cherry) Lian. All rights reserved.
          </div>

          {/* Animated Footnote - Center */}
          <div className="text-xs text-gray-500 dark:text-gray-400 min-h-[1.5rem] flex items-center justify-center justify-self-center">
            <TypingAnimation />
          </div>

          {/* Social Links - Right */}
          <div className="flex items-center space-x-6 justify-self-end">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.name !== 'Email' ? '_blank' : undefined}
                  rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
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
      </div>
    </footer>
  );
} 