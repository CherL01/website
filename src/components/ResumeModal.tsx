'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download, ExternalLink } from 'lucide-react';

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
          className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">
                  📄
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Resume - Yi (Cherry) Lian
                  </h3>
                  <p className="text-gray-600 flex items-center">
                    <FileText size={16} className="mr-1" />
                    Robotics Engineer & ML Researcher
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {/* Download Button */}
                <a
                  href="/assets/Yi_Lian_Resume.pdf"
                  download
                  className="inline-flex items-center px-3 py-2 bg-primary-200 text-gray-800 rounded-lg hover:bg-primary-300 transition-colors text-sm font-medium"
                >
                  <Download size={16} className="mr-2" />
                  Download
                </a>
                {/* Open in New Tab Button */}
                <a
                  href="/assets/Yi_Lian_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                >
                  <ExternalLink size={16} className="mr-2" />
                  Open
                </a>
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="h-[80vh]">
            <iframe
              src="/assets/Yi_Lian_Resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
              className="w-full h-full border-0"
              title="Yi Lian Resume"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 