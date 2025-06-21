import { MapLocation } from '@/types/map';

interface ClusterPoint {
  coordinates: [number, number];
  locations: MapLocation[];
  id: string;
}

// Simple distance calculation (in degrees)
function distance(coord1: [number, number], coord2: [number, number]): number {
  const [lng1, lat1] = coord1;
  const [lng2, lat2] = coord2;
  return Math.sqrt(Math.pow(lng2 - lng1, 2) + Math.pow(lat2 - lat1, 2));
}

// Simple clustering algorithm - groups locations within a threshold distance
export function clusterLocations(
  locations: MapLocation[], 
  threshold: number = 2.0 // degrees - adjust based on zoom level
): ClusterPoint[] {
  const clusters: ClusterPoint[] = [];
  const processed = new Set<string>();

  locations.forEach(location => {
    const locationId = `${location.city}-${location.country}`;
    
    if (processed.has(locationId)) return;

    // Find nearby locations
    const nearbyLocations = locations.filter(otherLocation => {
      const otherLocationId = `${otherLocation.city}-${otherLocation.country}`;
      if (processed.has(otherLocationId) || locationId === otherLocationId) return false;
      
      return distance(location.coordinates, otherLocation.coordinates) <= threshold;
    });

    // Create cluster
    const clusterLocations = [location, ...nearbyLocations];
    const clusterId = clusterLocations.map(l => `${l.city}-${l.country}`).join('|');
    
    // Calculate center point (simple average)
    const centerLng = clusterLocations.reduce((sum, l) => sum + l.coordinates[0], 0) / clusterLocations.length;
    const centerLat = clusterLocations.reduce((sum, l) => sum + l.coordinates[1], 0) / clusterLocations.length;

    clusters.push({
      id: clusterId,
      coordinates: [centerLng, centerLat],
      locations: clusterLocations,
    });

    // Mark all locations in this cluster as processed
    clusterLocations.forEach(l => {
      processed.add(`${l.city}-${l.country}`);
    });
  });

  return clusters;
}

// Determine if clustering should be enabled based on zoom level
export function shouldCluster(zoom: number): boolean {
  return zoom < 4; // Enable clustering at low zoom levels
}

// Get clustering threshold based on zoom level
export function getClusteringThreshold(zoom: number): number {
  if (zoom < 2) return 5.0;  // Very wide clustering
  if (zoom < 3) return 3.0;  // Wide clustering
  if (zoom < 4) return 2.0;  // Moderate clustering
  return 1.0;                // Tight clustering
} 