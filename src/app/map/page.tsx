'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { MapProvider, useMapContext } from '@/contexts/MapContext';
import { useMapData } from '@/hooks/useMapData';
import LocationModal from '@/components/map/LocationModal';

// Dynamically import heavy Mapbox components to avoid SSR issues
const MapboxMap = dynamic(() => import('@/components/map/MapboxMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 md:h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🌍</div>
        <p className="text-gray-600">Loading interactive map...</p>
      </div>
    </div>
  ),
});

const MarkerLayer = dynamic(() => import('@/components/map/MarkerLayer'), {
  ssr: false,
});

const TimelinePanel = dynamic(() => import('@/components/map/TimelinePanel'), {
  ssr: false,
});

// Filter bar component
function FilterBar() {
  const { filter, setFilter } = useMapContext();
  const { globalStats } = useMapData();

  const filters = [
    { key: 'all' as const, label: 'All', count: globalStats.entryTypes.all },
    { key: 'education' as const, label: 'Education', count: globalStats.entryTypes.education },
    { key: 'work' as const, label: 'Work', count: globalStats.entryTypes.work },
    { key: 'conference' as const, label: 'Conference', count: globalStats.entryTypes.conference },
    { key: 'travel' as const, label: 'Travel', count: globalStats.entryTypes.travel },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map(({ key, label, count }) => (
        <button
          key={key}
          onClick={() => setFilter(key)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${filter === key
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          {label} {count > 0 && <span className="ml-1">({count})</span>}
        </button>
      ))}
    </div>
  );
}

// Global stats component
function GlobalStats() {
  const { globalStats } = useMapData();

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="card">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {globalStats.totalLocations}
            </div>
            <div className="text-gray-600 text-sm">Locations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary-600 mb-2">
              {globalStats.countries}
            </div>
            <div className="text-gray-600 text-sm">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-600 mb-2">
              {globalStats.continents}
            </div>
            <div className="text-gray-600 text-sm">Continents</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">
              {globalStats.totalEntries}
            </div>
            <div className="text-gray-600 text-sm">Experiences</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Timeline section component
function TimelineSection() {
  const { filter } = useMapContext();
  const { getFilteredLocations } = useMapData();
  
  const filteredLocations = getFilteredLocations(filter);

  return <TimelinePanel locations={filteredLocations} filter={filter} />;
}

// Main map component
function InteractiveMap() {
  const {
    selectedLocationId,
    selectedEntryId,
    filter,
    hoveredLocationId,
    setSelectedLocation,
    setHoveredLocation,
    clearSelection,
  } = useMapContext();

     const { getFilteredLocations, getLocationById } = useMapData();

  const filteredLocations = getFilteredLocations(filter);
     const selectedLocation = selectedLocationId ? getLocationById(selectedLocationId) || null : null;

  const handleMarkerClick = (locationId: string) => {
    setSelectedLocation(locationId);
  };

  const handleMarkerHover = (locationId: string | null) => {
    setHoveredLocation(locationId);
  };

  const handleEntrySelect = (entryId: string) => {
    setSelectedLocation(selectedLocationId, entryId);
  };

  return (
    <>
      <div className="mb-6">
        <FilterBar />
      </div>

      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="card p-6">
          <div className="h-96 md:h-[500px] rounded-lg overflow-hidden">
            <MapboxMap>
              <MarkerLayer
                locations={filteredLocations}
                filter={filter}
                selectedLocationId={selectedLocationId}
                hoveredLocationId={hoveredLocationId}
                onMarkerClick={handleMarkerClick}
                onMarkerHover={handleMarkerHover}
              />
            </MapboxMap>
          </div>
          
          {/* Map Legend */}
          <div className="mt-6 flex flex-wrap gap-6 justify-center">
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-2">🎓</div>
              Education
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs mr-2">💼</div>
              Work
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mr-2">🎤</div>
              Conference
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs mr-2">✈️</div>
              Travel
            </div>
            <p className="text-xs text-gray-500">Click markers to learn more</p>
          </div>
        </div>
      </motion.div>

      {/* Location Modal */}
      <LocationModal
        location={selectedLocation}
        selectedEntryId={selectedEntryId}
        onClose={clearSelection}
        onEntrySelect={handleEntrySelect}
      />
    </>
  );
}

// Main page component
export default function MapPage() {
  return (
    <MapProvider>
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
              My <span className="text-gradient">Global Journey</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              An interactive map showcasing my academic and professional journey across the world, 
              from Toronto to Atlanta to San Diego and beyond.
            </p>
          </motion.div>

          {/* Global Statistics */}
          <GlobalStats />

          {/* Interactive Map and Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map Section */}
            <div className="lg:col-span-2">
              <InteractiveMap />
            </div>
            
            {/* Timeline Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="card p-6 max-h-[600px] overflow-y-auto"
              >
                <TimelineSection />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </MapProvider>
  );
} 