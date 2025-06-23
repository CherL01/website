'use client';

import { useCallback, useRef, useState } from 'react';
import Map, { MapRef, ViewStateChangeEvent } from 'react-map-gl/mapbox';
// import { useMapboxUsage } from '@/hooks/useMapboxUsage'; // TODO: Fix type issue
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapboxMapProps {
  children?: React.ReactNode;
  onMapLoad?: () => void;
  onViewStateChange?: (viewState: ViewStateChangeEvent) => void;
  className?: string;
}

export default function MapboxMap({ 
  children, 
  onMapLoad, 
  onViewStateChange,
  className = "w-full h-full"
}: MapboxMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  // const { incrementLoad, UsageMonitor } = useMapboxUsage(); // TODO: Fix type issue

  const handleMapLoad = useCallback(() => {
    // incrementLoad(); // Track map load for usage monitoring
    setIsMapLoaded(true);
    if (process.env.NODE_ENV === 'development') {
      console.log('🗺️ Mapbox map loaded');
    }
    onMapLoad?.();
  }, [onMapLoad]);

  const handleViewStateChange = useCallback((evt: ViewStateChangeEvent) => {
    if (process.env.NODE_ENV === 'development') {
      const { longitude, latitude, zoom } = evt.viewState;
      console.log(`🔍 Map view: ${latitude.toFixed(2)}, ${longitude.toFixed(2)} @ ${zoom.toFixed(1)}x`);
    }
    onViewStateChange?.(evt);
  }, [onViewStateChange]);

  // Check for Mapbox token
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  
  if (!mapboxToken || mapboxToken === 'pk.your_mapbox_token_here') {
    return (
      <div 
        className={`${className} bg-gray-100 rounded-lg flex items-center justify-center`}
        role="img"
        aria-label="Map placeholder - Mapbox token required"
      >
        <div className="text-center p-8">
          <div className="text-4xl mb-4" aria-hidden="true">🗺️</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Mapbox Token Required
          </h3>
          <p className="text-sm text-gray-600 max-w-md">
            Please add your Mapbox token to <code className="bg-gray-200 px-1 rounded">.env.local</code>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Get your token at{' '}
            <a 
              href="https://account.mapbox.com/access-tokens/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              aria-label="Get Mapbox token (opens in new tab)"
            >
              mapbox.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div 
        className={className}
        role="application"
        aria-label="Interactive world map showing Cherry's global journey and experiences"
      >
        <Map
          ref={mapRef}
          mapboxAccessToken={mapboxToken}
          initialViewState={{
            longitude: -95, // Center of North America
            latitude: 45,   // Center of North America
            zoom: 2.5,      // Closer zoom to focus on North America
          }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          maxZoom={10} // Limit zoom to control API usage
          minZoom={0.5}
          onLoad={handleMapLoad}
          onMove={handleViewStateChange}
          // Performance optimizations - allow unlimited panning
          maxBounds={undefined}
          attributionControl={true}
          logoPosition="bottom-right"
          // Enhanced accessibility for Phase 3
          keyboard={true}
          doubleClickZoom={true}
          dragRotate={false} // Disable rotation for simpler UX
          pitchWithRotate={false}
          touchPitch={false}
        >
          {isMapLoaded && children}
        </Map>
      </div>
      
      {/* Screen reader instructions */}
      <div className="sr-only">
        <p>
          Interactive world map displaying Cherry Lian&apos;s global journey including education, work experiences, conferences, and travel. 
          Use the filter buttons above to focus on specific types of experiences. 
          Click on map markers to view detailed information about each location.
        </p>
        <p>
          Keyboard navigation: Use arrow keys to pan the map, plus and minus keys to zoom in and out. 
          Tab to navigate between interactive elements.
        </p>
      </div>
      
      {/* <UsageMonitor /> TODO: Fix type issue */}
    </>
  );
} 