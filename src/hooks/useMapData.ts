'use client';

import { useMemo } from 'react';
import { MapData, MapDataSchema, GlobalStats, FilterType } from '@/types/map';
import mapDataJson from '@/data/map.json';

export function useMapData() {
  // Validate and parse the map data
  const mapData = useMemo(() => {
    try {
      const validatedData = MapDataSchema.parse(mapDataJson);
      return validatedData;
    } catch (error) {
      console.error('Invalid map data:', error);
      return [] as MapData;
    }
  }, []);

  // Calculate global statistics
  const globalStats = useMemo((): GlobalStats => {
    const allEntries = mapData.flatMap(location => location.entries);
    const countries = new Set(mapData.map(location => location.country));
    
    // Simple continent mapping
    const getContinent = (country: string): string => {
      const continentMap: Record<string, string> = {
        'Canada': 'North America',
        'USA': 'North America',
        'United States': 'North America',
        // Add more mappings as needed
      };
      return continentMap[country] || 'Unknown';
    };

    const continents = new Set(mapData.map(location => getContinent(location.country)));

    // Count entries by type
    const entryTypes = allEntries.reduce((acc, entry) => {
      acc[entry.type] = (acc[entry.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalLocations: mapData.length,
      totalEntries: allEntries.length,
      countries: countries.size,
      continents: continents.size,
      entryTypes: {
        all: allEntries.length,
        education: entryTypes.education || 0,
        work: entryTypes.work || 0,
        conference: entryTypes.conference || 0,
        travel: entryTypes.travel || 0,
      },
    };
  }, [mapData]);

  // Filter locations based on type
  const getFilteredLocations = useMemo(() => {
    return (filter: FilterType) => {
      if (filter === 'all') return mapData;
      
      return mapData.filter(location => 
        location.entries.some(entry => entry.type === filter)
      );
    };
  }, [mapData]);

  // Find location by ID
  const getLocationById = useMemo(() => {
    return (locationId: string) => {
      return mapData.find(location => {
        const id = `${location.city}-${location.country}`;
        return id === locationId;
      });
    };
  }, [mapData]);

  // Get chronologically sorted entries across all locations
  const getChronologicalEntries = useMemo(() => {
    return mapData
      .flatMap(location => 
        location.entries.map(entry => ({
          ...entry,
          city: location.city,
          country: location.country,
          coordinates: location.coordinates,
        }))
      )
      .sort((a, b) => {
        // Parse duration to get start date
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
  }, [mapData]);

  return {
    mapData,
    globalStats,
    getFilteredLocations,
    getLocationById,
    getChronologicalEntries,
    isLoading: false, // Since we're using static JSON
    error: null,
  };
} 