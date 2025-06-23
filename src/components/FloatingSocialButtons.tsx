'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';

const socialLinks = [
  {
    name: 'Email',
    href: 'mailto:cherry.lian@gatech.edu',
    icon: Mail,
    color: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/cherry-yi-lian/',
    icon: Linkedin,
    color: 'bg-blue-700 hover:bg-blue-800',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/CherL01',
    icon: Github,
    color: 'bg-gray-800 hover:bg-gray-900',
  },
];

export function FloatingSocialButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const pathname = usePathname();

  // Trigger re-animation when page changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Show floating buttons when footer is not visible (footer top is below viewport)
        const footerVisible = footerRect.top < windowHeight;
        setIsVisible(!footerVisible);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={animationKey} // Force re-render and animation on page change
          className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3"
          initial={{ opacity: 0, x: 50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.8 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.name !== 'Email' ? '_blank' : undefined}
                rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                className={`w-12 h-12 rounded-full ${link.color} text-white flex items-center justify-center shadow-lg transition-all duration-200 group`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeInOut" }}
                aria-label={link.name}
                title={link.name}
              >
                <Icon size={20} className="group-hover:scale-110 transition-transform duration-200" />
              </motion.a>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
} 