'use client';

import { useMemo, memo, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, GraduationCap, Briefcase, Mic, Plane, ExternalLink } from 'lucide-react';
import { MapLocation, FilterType } from '@/types/map';
import { useMapContext } from '@/contexts/MapContext';

interface TimelinePanelProps {
  locations: MapLocation[];
  filter: FilterType;
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
    case 'home':
      return <MapPin size={20} className="text-rose-500" />;
    default:
      return <MapPin size={20} className="text-gray-500" />;
  }
};

const getEntryColors = (type: string) => {
  switch (type) {
    case 'education':
      return {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        accent: 'bg-blue-500',
        text: 'text-blue-700'
      };
    case 'work':
      return {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        accent: 'bg-emerald-500',
        text: 'text-emerald-700'
      };
    case 'conference':
      return {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        accent: 'bg-purple-500',
        text: 'text-purple-700'
      };
    case 'travel':
      return {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        accent: 'bg-amber-500',
        text: 'text-amber-700'
      };
    case 'home':
      return {
        bg: 'bg-rose-50',
        border: 'border-rose-200',
        accent: 'bg-rose-500',
        text: 'text-rose-700'
      };
    default:
      return {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        accent: 'bg-gray-500',
        text: 'text-gray-700'
      };
  }
};

const TimelinePanel = memo(function TimelinePanel({ locations, filter }: TimelinePanelProps) {
  const {
    selectedLocationId,
    selectedEntryId,
    hoveredLocationId,
    setSelectedLocation,
    setHoveredLocation
  } = useMapContext();

  // Local state for tracking which timeline entry is being hovered for expansion
  const [hoveredEntryId, setHoveredEntryId] = useState<string | null>(null);

  // Memoize event handlers
  const handleEntryClick = useCallback((locationId: string, entryId: string) => {
    setSelectedLocation(locationId, entryId);
  }, [setSelectedLocation]);

  const handleEntryHover = useCallback((locationId: string | null) => {
    setHoveredLocation(locationId);
  }, [setHoveredLocation]);

  // Create chronological timeline of all entries
  const timelineEntries = useMemo(() => {
    const allEntries = locations.flatMap(location =>
      location.entries.map(entry => ({
        ...entry,
        locationId: `${location.city}-${location.country}`,
        city: location.city,
        country: location.country,
        coordinates: location.coordinates,
      }))
    );

    // Filter by current filter
    const filteredEntries = filter === 'all' 
      ? allEntries 
      : allEntries.filter(entry => entry.type === filter);

    // Sort chronologically
    return filteredEntries.sort((a, b) => {
      const parseDate = (duration: string) => {
        const match = duration.match(/(\w+)\s+(\d{4})/);
        if (!match) return new Date();
        
        const [, month, year] = match;
        const monthMap: Record<string, number> = {
          'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
          'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
        };
        
        return new Date(parseInt(year), monthMap[month] || 0);
      };
      
      return parseDate(a.duration).getTime() - parseDate(b.duration).getTime();
    });
  }, [locations, filter]);



  if (timelineEntries.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          No entries found
        </h3>
        <p className="text-gray-600">
          Try adjusting your filter or add more locations to see the timeline.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Chronological Timeline
        </h2>
        <p className="text-gray-600">
          {timelineEntries.length} experience{timelineEntries.length !== 1 ? 's' : ''} 
          {filter !== 'all' && ` in ${filter}`}
        </p>
      </div>

      <div className="space-y-4">
        {timelineEntries.map((entry, index) => {
          const colors = getEntryColors(entry.type);
          const isSelected = selectedLocationId === entry.locationId && selectedEntryId === entry.id;
          const isHovered = hoveredLocationId === entry.locationId;
          const isExpanded = hoveredEntryId === entry.id; // Use local hover state for expansion
          const isActive = isSelected || isHovered;

          return (
            <motion.div
              key={`${entry.locationId}-${entry.id}`}
              className={`
                card cursor-pointer transition-all duration-200
                ${isActive ? 'ring-2 ring-blue-500/50 shadow-lg' : 'hover:shadow-md'}
                ${isSelected ? colors.bg : ''}
              `}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 5 }}
              onClick={() => handleEntryClick(entry.locationId, entry.id)}
              onMouseEnter={() => {
                handleEntryHover(entry.locationId);
                setHoveredEntryId(entry.id); // Set local hover for expansion
              }}
              onMouseLeave={() => {
                handleEntryHover(null);
                setHoveredEntryId(null); // Clear local hover
              }}
            >
              {/* Timeline Connector */}
              <div className="flex">
                {/* Timeline Line */}
                <div className="flex flex-col items-center mr-4">
                  <div className={`
                    w-3 h-3 rounded-full border-2 border-white shadow-md
                    ${colors.accent}
                    ${isActive ? 'ring-2 ring-blue-400' : ''}
                  `} />
                  {index < timelineEntries.length - 1 && (
                    <div className="w-px h-16 bg-gray-200 mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getEntryIcon(entry.type)}
                      <div>
                        <h3 className="font-semibold text-gray-800 leading-tight">
                          {entry.institution}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {entry.role}
                        </p>
                      </div>
                    </div>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-blue-500"
                      >
                        <ExternalLink size={16} />
                      </motion.div>
                    )}
                  </div>

                  {/* Location & Date */}
                  <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {entry.city}, {entry.country}
                    </div>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {entry.duration}
                    </div>
                  </div>

                  {/* Achievements Preview */}
                  {entry.achievements.length > 0 && (
                    <div className="space-y-1">
                      {entry.achievements.slice(0, isExpanded ? entry.achievements.length : 2).map((achievement, idx) => (
                        <div key={idx} className="flex items-baseline text-sm">
                          <span className="text-primary-500 mr-2 flex-shrink-0">•</span>
                          <span className="text-gray-700 leading-relaxed">{achievement}</span>
                        </div>
                      ))}
                      {!isExpanded && entry.achievements.length > 2 && (
                        <p className="text-xs text-gray-500 ml-4">
                          +{entry.achievements.length - 2} more achievements
                        </p>
                      )}
                    </div>
                  )}

                  {/* Links */}
                  {isExpanded && entry.links.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 pt-3 border-t border-gray-200"
                    >
                      <div className="flex flex-wrap gap-2">
                        {entry.links.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs hover:bg-blue-100 transition-colors"
                          >
                            <ExternalLink size={10} className="mr-1" />
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Timeline Summary */}
      <motion.div
        className="mt-8 p-4 bg-gray-50 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: timelineEntries.length * 0.1 + 0.3 }}
      >
        <div className="text-center text-sm text-gray-600">
          <p>
            Journey spanning <strong>{timelineEntries.length}</strong> experiences
            across <strong>{new Set(timelineEntries.map(e => e.country)).size}</strong> countries
          </p>
        </div>
      </motion.div>
    </div>
  );
});

export default TimelinePanel; 