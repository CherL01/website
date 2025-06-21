'use client';

import { useMemo } from 'react';
import { MapData, MapDataSchema, GlobalStats, FilterType } from '@/types/map';
import mapDataJson from '@/data/map.json';

// Enhanced continent mapping for global statistics
const CONTINENT_MAP: Record<string, string> = {
  // North America
  'Canada': 'North America',
  'USA': 'North America',
  'United States': 'North America',
  'Mexico': 'North America',
  
  // Europe
  'United Kingdom': 'Europe',
  'UK': 'Europe',
  'Germany': 'Europe',
  'France': 'Europe',
  'Italy': 'Europe',
  'Spain': 'Europe',
  'Netherlands': 'Europe',
  'Switzerland': 'Europe',
  'Sweden': 'Europe',
  'Norway': 'Europe',
  'Denmark': 'Europe',
  
  // Asia
  'China': 'Asia',
  'Japan': 'Asia',
  'South Korea': 'Asia',
  'Singapore': 'Asia',
  'India': 'Asia',
  'Thailand': 'Asia',
  'Malaysia': 'Asia',
  'Indonesia': 'Asia',
  
  // Oceania
  'Australia': 'Oceania',
  'New Zealand': 'Oceania',
  
  // South America
  'Brazil': 'South America',
  'Argentina': 'South America',
  'Chile': 'South America',
  'Colombia': 'South America',
  
  // Africa
  'South Africa': 'Africa',
  'Egypt': 'Africa',
  'Nigeria': 'Africa',
  'Kenya': 'Africa',
};

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

  // Calculate enhanced global statistics for Phase 3
  const globalStats = useMemo((): GlobalStats => {
    const allEntries = mapData.flatMap(location => location.entries);
    const countries = new Set(mapData.map(location => location.country));
    
    // Enhanced continent detection
    const getContinent = (country: string): string => {
      return CONTINENT_MAP[country] || 'Other';
    };

    const continents = new Set(
      mapData
        .map(location => getContinent(location.country))
        .filter(continent => continent !== 'Other')
    );

    // Calculate years active from all entries
    const yearsActive = new Set<number>();
    allEntries.forEach(entry => {
      const durationMatch = entry.duration.match(/(\d{4})/g);
      if (durationMatch) {
        durationMatch.forEach(year => yearsActive.add(parseInt(year)));
      }
    });

    // Count entries by type
    const entryTypes = allEntries.reduce((acc, entry) => {
      acc[entry.type] = (acc[entry.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate entry type percentages for charts
    const totalEntries = allEntries.length;
    const entryTypePercentages = Object.keys(entryTypes).reduce((acc, type) => {
      acc[type] = totalEntries > 0 ? Math.round((entryTypes[type] / totalEntries) * 100) : 0;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalLocations: mapData.length,
      totalEntries: allEntries.length,
      countries: countries.size,
      continents: continents.size,
      yearsActive: yearsActive.size,
      yearRange: yearsActive.size > 0 ? {
        start: Math.min(...yearsActive),
        end: Math.max(...yearsActive)
      } : null,
      entryTypes: {
        all: allEntries.length,
        education: entryTypes.education || 0,
        work: entryTypes.work || 0,
        conference: entryTypes.conference || 0,
        travel: entryTypes.travel || 0,
      },
      entryTypePercentages,
      countriesList: Array.from(countries).sort(),
      continentsList: Array.from(continents).sort(),
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