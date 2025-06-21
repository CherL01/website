'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { MapContextType, MapContextState, FilterType } from '@/types/map';

// Initial state
const initialState: MapContextState = {
  selectedLocationId: null,
  selectedEntryId: null,
  filter: 'all',
  hoveredLocationId: null,
};

// Actions
type MapAction =
  | { type: 'SET_SELECTED_LOCATION'; payload: { locationId: string | null; entryId?: string | null } }
  | { type: 'SET_FILTER'; payload: FilterType }
  | { type: 'SET_HOVERED_LOCATION'; payload: string | null }
  | { type: 'CLEAR_SELECTION' };

// Reducer
function mapReducer(state: MapContextState, action: MapAction): MapContextState {
  switch (action.type) {
    case 'SET_SELECTED_LOCATION':
      return {
        ...state,
        selectedLocationId: action.payload.locationId,
        selectedEntryId: action.payload.entryId || null,
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
        // Clear selection when filter changes
        selectedLocationId: null,
        selectedEntryId: null,
      };
    case 'SET_HOVERED_LOCATION':
      return {
        ...state,
        hoveredLocationId: action.payload,
      };
    case 'CLEAR_SELECTION':
      return {
        ...state,
        selectedLocationId: null,
        selectedEntryId: null,
        hoveredLocationId: null,
      };
    default:
      return state;
  }
}

// Context
const MapContext = createContext<MapContextType | undefined>(undefined);

// Provider component
interface MapProviderProps {
  children: ReactNode;
}

export function MapProvider({ children }: MapProviderProps) {
  const [state, dispatch] = useReducer(mapReducer, initialState);

  const contextValue: MapContextType = {
    ...state,
    setSelectedLocation: (locationId: string | null, entryId?: string | null) => {
      dispatch({ 
        type: 'SET_SELECTED_LOCATION', 
        payload: { locationId, entryId } 
      });
    },
    setFilter: (filter: FilterType) => {
      dispatch({ type: 'SET_FILTER', payload: filter });
    },
    setHoveredLocation: (locationId: string | null) => {
      dispatch({ type: 'SET_HOVERED_LOCATION', payload: locationId });
    },
    clearSelection: () => {
      dispatch({ type: 'CLEAR_SELECTION' });
    },
  };

  return (
    <MapContext.Provider value={contextValue}>
      {children}
    </MapContext.Provider>
  );
}

// Hook for using the context
export function useMapContext() {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
}

// Utility hook for map statistics
export function useMapStats() {
  const { filter } = useMapContext();
  
  // This would typically calculate stats from the actual data
  // For now, we'll return a placeholder that components can use
  return {
    currentFilter: filter,
    // Add more stats as needed
  };
} 