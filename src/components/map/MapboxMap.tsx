'use client';

import { useCallback, useRef } from 'react';
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
  // const { incrementLoad, UsageMonitor } = useMapboxUsage(); // TODO: Fix type issue

  const handleMapLoad = useCallback(() => {
    // incrementLoad(); // Track map load for usage monitoring
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
      <div className={`${className} bg-gray-100 rounded-lg flex items-center justify-center`}>
        <div className="text-center p-8">
          <div className="text-4xl mb-4">🗺️</div>
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
              className="text-blue-500 hover:underline"
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
      <div className={className}>
        <Map
          ref={mapRef}
          mapboxAccessToken={mapboxToken}
          initialViewState={{
            longitude: 0,
            latitude: 30,
            zoom: 1.8, // Global view optimized for worldwide locations
          }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          maxZoom={10} // Limit zoom to control API usage
          minZoom={0.5}
          onLoad={handleMapLoad}
          onMove={handleViewStateChange}
          // Performance optimizations
          maxBounds={[
            [-180, -90], // Southwest coordinates
            [180, 90]    // Northeast coordinates
          ]}
          attributionControl={true}
          logoPosition="bottom-right"
          // Accessibility
          keyboard={true}
          doubleClickZoom={true}
          dragRotate={false} // Disable rotation for simpler UX
          pitchWithRotate={false}
          touchPitch={false}
        >
          {children}
        </Map>
      </div>
      {/* <UsageMonitor /> TODO: Fix type issue */}
    </>
  );
} 