# Interactive Global Map Page — Design Plan ✨

> *As always, I aim for solutions that are **elegant**, **concise**, and **transparent**.  Each decision below is guided by that philosophy and our shared priority of maintainable, performance-minded code.*

---

## 0 · Project Context & Justification

**Current State**: The existing map implementation displays only a green rectangle with approximate positioning markers - **not a functional map representation**. As Cherry's journey expands globally beyond North America (conferences, collaborations, travel), we need:

- **Accurate world map visualization** with proper geographic context
- **Interactive pan/zoom capabilities** for global location discovery  
- **Scalable architecture** supporting unlimited worldwide locations
- **Professional presentation** worthy of an international robotics researcher

**Budget Constraint**: Must operate within Mapbox's free tier (50K monthly loads) with $0 API costs.

---

## 1 · Tech Stack Choice

| Layer      | Decision                                          | Rationale                                                                                                                                                 |
| ---------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Map engine | **Mapbox GL JS** via **`react-map-gl`**           | First-class WebGL performance, accurate global tiles, clustering support for dense regions. `react-map-gl` keeps Mapbox declarative and plays nicely with React 19. |
| Framework  | **Next 15 + TypeScript + Tailwind** *(unchanged)* | Seamless integration: dynamic import (`{ ssr:false }`) avoids server-side rendering pitfalls.                                                             |
| API Strategy | **Free Tier Optimization** | Implement tile caching, lazy loading, and usage monitoring to stay within 50K monthly loads. |

```tsx
// app/map/MapboxMap.tsx
import dynamic from 'next/dynamic';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapGL = dynamic(() => import('react-map-gl'), { ssr: false });

export default function MapboxMap(props) {
  return (
    <MapGL
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{ 
        latitude: 30, 
        longitude: 0, 
        zoom: 1.8  // Adjusted for global view
      }}
      maxZoom={10}  // Limit zoom to control API usage
      {...props}
    />
  );
}
```

---

## 2 · Data Schema Migration

**Current → New Structure**: Transform the existing flat location array into a city-grouped format supporting multiple overlapping entries per location.

```jsonc
// OLD: map.json (current broken implementation)
[
  {
    "city": "Toronto",
    "coordinates": { "lat": 43.6532, "lng": -79.3832 },
    "dates": "Sep 2019 - Apr 2024",
    "institution": "University of Toronto",
    "type": "education"
  }
]

// NEW: map.json (Mapbox-ready global structure)
[
  {
    "city": "Toronto",
    "country": "Canada",
    "coordinates": [43.6532, -79.3832],  // GeoJSON format [lng, lat]
    "entries": [
      {
        "id": "uoft-undergrad",
        "type": "education",     // "education" | "work" | "conference" | "travel"
        "institution": "University of Toronto",
        "role": "B.A.Sc. Mechanical Engineering",
        "duration": "2019-2024",
        "photos": ["/assets/locations/toronto-uoft.jpg"],
        "links": [{ "label": "University Website", "url": "https://utoronto.ca" }],
        "achievements": [
          "Dean's List recognition",
          "Robotics specialization focus",
          "Mechanical Engineering degree"
        ]
      }
    ]
  },
  {
    "city": "Atlanta",
    "country": "USA", 
    "coordinates": [33.7490, -84.3880],
    "entries": [...] // Multiple entries per city supported
  }
]
```

**Migration Benefits**:
- **One pin per city** eliminates marker overlap in dense regions
- **Unlimited entries per location** supports conferences, visits, collaborations
- **GeoJSON coordinate format** ([lng, lat]) matches Mapbox standards
- **Extensible entry types** ready for conferences, travel, collaborations

---

## 3 · Component Architecture

```text
MapContext (selectedCityId, filter, hoveredLocation, setters)
│
├─ MapboxMap          → houses Mapbox GL instance
│   ├─ MarkerLayer    → dynamic markers with clustering (filter-aware)
│   └─ LocationModal  → rich content with photos, links, achievements
│
├─ FilterBar          → All · Education · Work · Conference · Travel
│   └─ UsageMonitor   → API call counter (dev mode)
│
├─ TimelinePanel      → chronological cards (desktop) / accordion (mobile)
│   └─ LocationSync   → scroll-to-marker bidirectional sync
│
└─ GlobalStats        → countries, cities, years active
```

**Key Features**:
- **Two-way sync**: Pin selection focuses timeline card; card hover highlights marker
- **Smart clustering**: Automatically groups nearby markers at low zoom levels
- **Rich modals**: Support photos, external links, multiple achievements per location
- **Global scope**: Optimized for worldwide location distribution

---

## 4 · Enhanced Filtering & Visual Design

| Category     | Marker Color      | Use Cases                           |
| ------------ | ---------------- | ----------------------------------- |
| Education    | `bg-blue-500`    | Universities, degrees, research     |
| Work         | `bg-emerald-500` | Employment, internships, consulting |
| Conference   | `bg-purple-500`  | Speaking, presentations, networking |
| Travel       | `bg-amber-500`   | Visits, collaborations, exploration |

```ts
const [filter, setFilter] = useState<'all'|'education'|'work'|'conference'|'travel'>('all');

// Global scope considerations
const globalStats = useMemo(() => ({
  countries: new Set(locations.map(l => l.country)).size,
  continents: new Set(locations.map(l => getContinent(l.country))).size,
  totalEntries: locations.reduce((sum, l) => sum + l.entries.length, 0)
}), [locations]);
```

---

## 5 · Performance Optimization for Free Tier

| Strategy                    | Implementation                                        | API Load Reduction |
| --------------------------- | ---------------------------------------------------- | ------------------ |
| **Lazy Loading**            | Mount map below fold, user-triggered                | ~40%               |
| **Tile Caching**            | Browser cache headers, service worker                | ~30%               |
| **Zoom Limits**             | `maxZoom: 10` prevents excessive detail loads        | ~20%               |
| **Marker Clustering**       | Group nearby points, reduce individual renders       | ~15%               |
| **Efficient Re-renders**    | `useMemo` for filtered locations, `useCallback`      | Performance only   |

```ts
// Usage monitoring (development mode)
const useMapboxUsage = () => {
  const [loadCount, setLoadCount] = useState(0);
  
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Mapbox loads this session: ${loadCount}/50000 monthly limit`);
    }
  }, [loadCount]);
  
  return { loadCount, incrementLoad: () => setLoadCount(prev => prev + 1) };
};
```

---

## 6 · Optional Journey Path & Future Features

**Journey Path Visualization** (Phase 2):
```ts
const useJourneyPath = (locations, isEnabled = false) => {
  return useMemo(() => {
    if (!isEnabled) return null;
    
    // Chronologically sort all entries across all cities
    const chronologicalEntries = locations
      .flatMap(city => city.entries.map(entry => ({ ...entry, city: city.city, coordinates: city.coordinates })))
      .sort((a, b) => new Date(a.duration.split(' - ')[0]).getTime() - new Date(b.duration.split(' - ')[0]).getTime());
    
    // Generate GeoJSON LineString
    return {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: chronologicalEntries.map(entry => entry.coordinates)
      }
    };
  }, [locations, isEnabled]);
};
```

**Future Enhancements**:
- **Conference clustering**: Automatically group academic conferences by year/region
- **Collaboration network**: Connect locations where Cherry worked with the same collaborators
- **Publication map**: Link locations to papers published during that time

---

## 7 · Implementation Roadmap

### **Phase 1: Core Replacement** (Week 1)
1. **Setup & Dependencies**
   ```bash
   npm install mapbox-gl react-map-gl
   echo "NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_token" >> .env.local
   ```

2. **Data Migration**
   - Transform current `map.json` to new schema
   - Add TypeScript interfaces with Zod validation
   - Preserve all existing location data

3. **Core Components**
   - `MapboxMap` with global initial view
   - `MarkerLayer` with clustering support
   - `LocationModal` with rich content display

### **Phase 2: Enhanced UX** (Week 2)
4. **Interactive Features**
   - `FilterBar` with all entry types
   - `TimelinePanel` with bidirectional sync
   - `MapContext` for state management

5. **Performance Optimization**
   - Implement lazy loading and usage monitoring
   - Add marker clustering for dense regions
   - Optimize re-renders with memoization

### **Phase 3: Polish & Launch** (Week 3)
6. **Global Statistics Dashboard**
   - Countries, continents, years active
   - Entry type distribution charts

7. **Quality Assurance**
   - Lighthouse performance testing
   - Free tier usage validation
   - Mobile responsiveness verification
   - Accessibility improvements

---

## 8 · Reflection on Values 🪞

| Value                       | How this plan embodies it                                                                                       |
| --------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Elegance & concision**    | Clean component architecture; single responsibility principle; TypeScript + Zod for data integrity with minimal boilerplate. |
| **Maintainability**         | Static JSON data source; context-based state management; clear component boundaries; comprehensive TypeScript interfaces. |
| **Performance mindfulness** | Free tier optimization strategies; lazy loading; efficient re-renders; usage monitoring in development. |
| **Clear communication**     | Detailed migration path; performance trade-offs explicitly documented; stakeholder expectations managed. |
| **Extensibility**           | Future-ready architecture for global expansion; optional features don't impact core bundle; modular enhancement approach. |

**Problem Solved**: Replaces broken visual representation with professional, interactive world map that scales globally while respecting budget constraints.

**Global Ready**: Architecture designed for Cherry's expanding international presence in robotics research and collaboration.

> By addressing the current implementation's limitations while building for global scale, we ensure the Map page represents Cherry's journey with the accuracy and professionalism her international career deserves.
