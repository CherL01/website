'use client';

import { useMemo, memo, useCallback } from 'react';
import { Marker } from 'react-map-gl/mapbox';
import { motion } from 'framer-motion';
import { MapLocation, FilterType } from '@/types/map';

interface MarkerLayerProps {
  locations: MapLocation[];
  filter: FilterType;
  selectedLocationId: string | null;
  hoveredLocationId: string | null;
  onMarkerClick: (locationId: string) => void;
  onMarkerHover: (locationId: string | null) => void;
}

const getMarkerColor = (types: string[]): string => {
  // If multiple entry types, use a gradient or mixed color
  if (types.length > 1) {
    return 'bg-gradient-to-r from-blue-500 to-emerald-500';
  }
  
  const type = types[0];
  switch (type) {
    case 'education':
      return 'bg-blue-500';
    case 'work':
      return 'bg-emerald-500';
    case 'conference':
      return 'bg-purple-500';
    case 'travel':
      return 'bg-amber-500';
    default:
      return 'bg-gray-500';
  }
};

const getMarkerIcon = (types: string[]): string => {
  // Priority: education > work > conference > travel
  if (types.includes('education')) return '🎓';
  if (types.includes('work')) return '💼';
  if (types.includes('conference')) return '🎤';
  if (types.includes('travel')) return '✈️';
  return '📍';
};

const MarkerLayer = memo(function MarkerLayer({
  locations,
  filter,
  selectedLocationId,
  hoveredLocationId,
  onMarkerClick,
  onMarkerHover
}: MarkerLayerProps) {
  // Filter locations based on the current filter
  const filteredLocations = useMemo(() => {
    if (filter === 'all') return locations;
    
    return locations.filter(location => 
      location.entries.some(entry => entry.type === filter)
    );
  }, [locations, filter]);

  // Memoize click and hover handlers
  const handleMarkerClick = useCallback((locationId: string) => {
    onMarkerClick(locationId);
  }, [onMarkerClick]);

  const handleMarkerHover = useCallback((locationId: string | null) => {
    onMarkerHover(locationId);
  }, [onMarkerHover]);

  return (
    <>
      {filteredLocations.map((location) => {
        const [lng, lat] = location.coordinates;
        const locationId = `${location.city}-${location.country}`;
        const isSelected = selectedLocationId === locationId;
        const isHovered = hoveredLocationId === locationId;
        
        // Get unique entry types for this location
        const entryTypes = [...new Set(location.entries.map(entry => entry.type))];
        const markerColor = getMarkerColor(entryTypes);
        const markerIcon = getMarkerIcon(entryTypes);

        return (
          <Marker
            key={locationId}
            longitude={lng}
            latitude={lat}
            anchor="bottom"
          >
            <motion.button
              className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: isSelected ? 1.2 : isHovered ? 1.1 : 1,
                zIndex: isSelected ? 50 : isHovered ? 40 : 30
              }}
              onClick={() => handleMarkerClick(locationId)}
              onMouseEnter={() => handleMarkerHover(locationId)}
              onMouseLeave={() => handleMarkerHover(null)}
              onFocus={() => handleMarkerHover(locationId)}
              onBlur={() => handleMarkerHover(null)}
              aria-label={`${location.city}, ${location.country} - ${location.entries.length} experience${location.entries.length > 1 ? 's' : ''} (${entryTypes.join(', ')})`}
              title={`${location.city}, ${location.country}`}
            >
              {/* Marker Container */}
              <div className="relative">
                {/* Selection Ring */}
                {(isSelected || isHovered) && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-white/80 shadow-lg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    style={{
                      borderColor: isSelected ? '#3B82F6' : '#6B7280',
                      transform: 'translate(-50%, -50%)',
                      left: '50%',
                      top: '50%',
                      width: '60px',
                      height: '60px',
                    }}
                  />
                )}

                {/* Main Marker */}
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg 
                  border-2 border-white transition-all duration-200
                  ${markerColor}
                  ${isSelected ? 'ring-4 ring-blue-500/50' : ''}
                  ${isHovered ? 'ring-2 ring-gray-400/50' : ''}
                `}>
                  <span className="drop-shadow-sm">{markerIcon}</span>
                </div>

                {/* Multiple Entries Indicator */}
                {location.entries.length > 1 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white">
                    {location.entries.length}
                  </div>
                )}
              </div>

              {/* City Label */}
              <motion.div
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2"
                initial={{ opacity: 0, y: -5 }}
                animate={{ 
                  opacity: isSelected || isHovered ? 1 : 0.8,
                  y: 0,
                  scale: isSelected || isHovered ? 1.05 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                <div className={`
                  bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md shadow-md 
                  text-sm font-medium text-gray-800 whitespace-nowrap border
                  ${isSelected ? 'border-blue-200 bg-blue-50/95' : 'border-gray-200'}
                `}>
                  {location.city}
                  {location.entries.length > 1 && (
                    <span className="ml-2 text-xs text-gray-500">
                      ({location.entries.length})
                    </span>
                  )}
                </div>
              </motion.div>
            </motion.button>
          </Marker>
        );
      })}
    </>
  );
});

export default MarkerLayer; 