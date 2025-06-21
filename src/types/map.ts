import { z } from 'zod';

// Zod schemas for runtime validation
export const LinkSchema = z.object({
  label: z.string(),
  url: z.string().url(),
});

export const MapEntrySchema = z.object({
  id: z.string(),
  type: z.enum(['education', 'work', 'conference', 'travel']),
  institution: z.string(),
  role: z.string(),
  duration: z.string(),
  photos: z.array(z.string()),
  links: z.array(LinkSchema),
  achievements: z.array(z.string()),
});

export const MapLocationSchema = z.object({
  city: z.string(),
  country: z.string(),
  coordinates: z.tuple([z.number(), z.number()]), // [lng, lat] GeoJSON format
  entries: z.array(MapEntrySchema),
});

export const MapDataSchema = z.array(MapLocationSchema);

// TypeScript interfaces (inferred from Zod schemas)
export type Link = z.infer<typeof LinkSchema>;
export type MapEntry = z.infer<typeof MapEntrySchema>;
export type MapLocation = z.infer<typeof MapLocationSchema>;
export type MapData = z.infer<typeof MapDataSchema>;

// Filter types
export type FilterType = 'all' | 'education' | 'work' | 'conference' | 'travel';

// Map context state
export interface MapContextState {
  selectedLocationId: string | null;
  selectedEntryId: string | null;
  filter: FilterType;
  hoveredLocationId: string | null;
}

// Map context actions
export interface MapContextActions {
  setSelectedLocation: (locationId: string | null, entryId?: string | null) => void;
  setFilter: (filter: FilterType) => void;
  setHoveredLocation: (locationId: string | null) => void;
  clearSelection: () => void;
}

// Combined context type
export interface MapContextType extends MapContextState, MapContextActions {}

// Utility types for component props
export interface MarkerProps {
  location: MapLocation;
  isSelected: boolean;
  isHovered: boolean;
  onClick: (locationId: string) => void;
  onHover: (locationId: string | null) => void;
}

export interface LocationModalProps {
  location: MapLocation | null;
  selectedEntryId: string | null;
  onClose: () => void;
  onEntrySelect: (entryId: string) => void;
}

// Enhanced global statistics type for Phase 3
export interface GlobalStats {
  totalLocations: number;
  totalEntries: number;
  countries: number;
  continents: number;
  yearsActive: number;
  yearRange: {
    start: number;
    end: number;
  } | null;
  entryTypes: Record<FilterType, number>;
  entryTypePercentages: Record<string, number>;
  countriesList: string[];
  continentsList: string[];
} 