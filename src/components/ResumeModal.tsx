'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="max-w-6xl w-full max-h-[95vh] relative"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Floating Close Button - Outside the PDF viewer */}
          <button
            onClick={onClose}
            className="absolute top-2 -right-12 z-20 bg-white text-gray-600 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-full shadow-lg transition-all duration-200"
          >
            <X size={20} />
          </button>

          {/* PDF Viewer */}
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden h-[95vh]">
            <iframe
              src="/assets/Yi_Lian_Resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
              className="w-full h-full border-0 rounded-lg"
              title="Yi Lian Resume"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 