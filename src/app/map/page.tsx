'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Building, Award, GraduationCap, Briefcase } from 'lucide-react';
import mapData from '@/data/map.json';

interface LocationData {
  city: string;
  country: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  dates: string;
  institution: string;
  role: string;
  type: 'education' | 'work';
  notes: string;
  achievements: string[];
}

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            My <span className="text-gradient">Journey</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            An interactive map of my academic and professional journey across North America, 
            from Toronto to Atlanta to San Diego.
          </p>
        </motion.div>

        {/* Visual Map */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="card p-6">
            <div className="h-96 md:h-[500px] rounded-lg overflow-hidden relative bg-gradient-to-br from-blue-50 to-blue-100">
              {/* Simplified Visual Map */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-4xl">
                  {/* North America Shape (Simplified) */}
                  <div className="absolute inset-4 bg-green-100 rounded-lg opacity-60"></div>
                  
                  {/* Location Markers */}
                  {mapData.map((location, index) => {
                    // Calculate position based on approximate coordinates
                    const getPosition = (lat: number, lng: number) => {
                      // Very simplified positioning for North America
                      const leftPercent = ((lng + 130) / 60) * 100; // Longitude mapping
                      const topPercent = ((52 - lat) / 20) * 100; // Latitude mapping
                      return {
                        left: `${Math.max(10, Math.min(90, leftPercent))}%`,
                        top: `${Math.max(10, Math.min(90, topPercent))}%`
                      };
                    };
                    
                    const position = getPosition(location.coordinates.lat, location.coordinates.lng);
                    
                    return (
                      <motion.div
                        key={index}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        style={position}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedLocation(location as LocationData)}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg border-2 ${
                          location.type === 'education' 
                            ? 'bg-blue-500 border-blue-600 text-white' 
                            : 'bg-green-500 border-green-600 text-white'
                        }`}>
                          {location.type === 'education' ? '🎓' : '💼'}
                        </div>
                        
                        {/* City Label */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                          <div className="bg-white px-2 py-1 rounded shadow-md text-xs font-medium text-gray-800 whitespace-nowrap">
                            {location.city}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              
              {/* Map Title */}
              <div className="absolute top-4 left-4">
                <h3 className="text-lg font-bold text-gray-800">Journey Across North America</h3>
              </div>
            </div>
            
            {/* Map Legend */}
            <div className="mt-6 flex flex-wrap gap-6 justify-center">
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-2">🎓</div>
                Education
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-2">💼</div>
                Professional
              </div>
              <p className="text-xs text-gray-500">Click markers to learn more</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline Overview */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Timeline Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mapData
              .sort((a, b) => new Date(a.dates.split(' - ')[0]).getTime() - new Date(b.dates.split(' - ')[0]).getTime())
              .map((location, index) => (
                <motion.div
                  key={index}
                  className="card cursor-pointer"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedLocation(location as LocationData)}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">
                      {location.type === 'education' ? '🎓' : '💼'}
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">
                      {location.city}, {location.state}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {location.dates}
                    </p>
                    <p className="text-sm font-medium text-primary-600">
                      {location.institution}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Location Stats */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {mapData.length}
                </div>
                <div className="text-gray-600">Locations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary-600 mb-2">
                  {mapData.filter(l => l.country === 'Canada').length + mapData.filter(l => l.country === 'USA').length}
                </div>
                <div className="text-gray-600">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent-600 mb-2">
                  {new Set(mapData.map(l => l.state)).size}
                </div>
                <div className="text-gray-600">States/Provinces</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Location Modal */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLocation(null)}
          >
            <motion.div
              className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">
                      {selectedLocation.type === 'education' ? '🎓' : '💼'}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">
                        {selectedLocation.city}, {selectedLocation.state}
                      </h3>
                      <p className="text-gray-600">
                        {selectedLocation.country}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="text-gray-400 hover:text-gray-600 p-2"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Institution & Role */}
                <div>
                  <div className="flex items-center text-primary-600 font-semibold mb-2">
                    <Building size={20} className="mr-2" />
                    {selectedLocation.institution}
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    {selectedLocation.type === 'education' ? (
                      <GraduationCap size={18} className="mr-2" />
                    ) : (
                      <Briefcase size={18} className="mr-2" />
                    )}
                    {selectedLocation.role}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar size={16} className="mr-2" />
                    {selectedLocation.dates}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Overview</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedLocation.notes}
                  </p>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Award size={18} className="mr-2" />
                    Key Achievements
                  </h4>
                  <div className="space-y-2">
                    {selectedLocation.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-primary-500 mr-3 mt-1 flex-shrink-0">•</span>
                        <p className="text-gray-700 text-sm">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coordinates (for reference) */}
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400">
                    <MapPin size={12} className="inline mr-1" />
                    {selectedLocation.coordinates.lat.toFixed(4)}, {selectedLocation.coordinates.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
} 