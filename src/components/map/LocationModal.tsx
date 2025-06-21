'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Building, Award, ExternalLink, GraduationCap, Briefcase, Mic, Plane } from 'lucide-react';
import { MapLocation } from '@/types/map';

interface LocationModalProps {
  location: MapLocation | null;
  selectedEntryId: string | null;
  onClose: () => void;
  onEntrySelect: (entryId: string) => void;
}

const getEntryIcon = (type: string) => {
  switch (type) {
    case 'education':
      return <GraduationCap size={20} className="text-blue-500" />;
    case 'work':
      return <Briefcase size={20} className="text-emerald-500" />;
    case 'conference':
      return <Mic size={20} className="text-purple-500" />;
    case 'travel':
      return <Plane size={20} className="text-amber-500" />;
    default:
      return <MapPin size={20} className="text-gray-500" />;
  }
};

const getEntryColor = (type: string) => {
  switch (type) {
    case 'education':
      return 'border-blue-200 bg-blue-50';
    case 'work':
      return 'border-emerald-200 bg-emerald-50';
    case 'conference':
      return 'border-purple-200 bg-purple-50';
    case 'travel':
      return 'border-amber-200 bg-amber-50';
    default:
      return 'border-gray-200 bg-gray-50';
  }
};

export default function LocationModal({
  location,
  selectedEntryId,
  onClose,
  onEntrySelect
}: LocationModalProps) {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (location) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [location, onClose]);

  if (!location) return null;

  const selectedEntry = selectedEntryId 
    ? location.entries.find(entry => entry.id === selectedEntryId) 
    : location.entries[0];

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
          className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
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
                  🌍
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {location.city}
                  </h3>
                  <p className="text-gray-600 flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {location.country}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            {/* Entry Selector */}
            {location.entries.length > 1 && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Select Experience ({location.entries.length} total)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {location.entries.map((entry) => (
                    <button
                      key={entry.id}
                      onClick={() => onEntrySelect(entry.id)}
                      className={`
                        flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all
                        ${selectedEntry?.id === entry.id 
                          ? `${getEntryColor(entry.type)} border-2` 
                          : 'bg-gray-100 border-2 border-transparent hover:bg-gray-200'
                        }
                      `}
                    >
                      {getEntryIcon(entry.type)}
                      <span>{entry.institution}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Content - Scrollable */}
          <div className="max-h-[60vh] overflow-y-auto">
            {selectedEntry && (
              <div className="p-6 space-y-6">
                {/* Institution & Role */}
                <div>
                  <div className="flex items-center text-primary-600 font-semibold mb-2 text-lg">
                    <Building size={20} className="mr-2" />
                    {selectedEntry.institution}
                  </div>
                  <div className="flex items-center text-gray-700 mb-2">
                    {getEntryIcon(selectedEntry.type)}
                    <span className="ml-2 font-medium">{selectedEntry.role}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar size={16} className="mr-2" />
                    {selectedEntry.duration}
                  </div>
                </div>

                {/* Achievements */}
                {selectedEntry.achievements.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Award size={18} className="mr-2" />
                      Key Achievements & Highlights
                    </h4>
                    <div className="space-y-2">
                      {selectedEntry.achievements.map((achievement, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="text-primary-500 mr-3 mt-1 flex-shrink-0">•</span>
                          <p className="text-gray-700 text-sm leading-relaxed">{achievement}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links */}
                {selectedEntry.links.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <ExternalLink size={18} className="mr-2" />
                      Related Links
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedEntry.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                        >
                          <ExternalLink size={14} className="mr-2" />
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Photos Placeholder */}
                {selectedEntry.photos.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Photos & Media
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedEntry.photos.map((photo, index) => (
                        <div key={index} className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-sm">Photo placeholder</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Coordinates Reference */}
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 flex items-center">
                    <MapPin size={12} className="mr-1" />
                    {location.coordinates[1].toFixed(4)}°N, {Math.abs(location.coordinates[0]).toFixed(4)}°{location.coordinates[0] < 0 ? 'W' : 'E'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 