# Detailed Page & Component Specifications

## 🏠 Home Page (`/`)

### Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVIGATION BAR                           │
│ Cherry Lian    [About] [Projects] [Publications] [Map] [Contact] │
├─────────────────────────────────────────────────────────────────┤
│                         HERO SECTION                           │
│ ┌─────────────┐  Welcome! I'm Cherry Lian                      │
│ │  [Photo]    │  Robotics Engineer & ML Researcher             │
│ │ Cherry.jpg  │                                                 │
│ │ (circular)  │  [Download Resume] [View Projects]              │
│ └─────────────┘                                                 │
├─────────────────────────────────────────────────────────────────┤
│                     FEATURED PROJECTS                          │
│ ┌─────────────────────────┐ ┌─────────────────────────────┐     │
│ │ 🤖 HINTeract Framework  │ │ 🕷️ SpooderMan Robot        │     │
│ │ Interactive Learning    │ │ Autonomous Follower         │     │
│ │ [Python] [PyTorch] [ML] │ │ [ROS2] [OpenCV] [Python]    │     │
│ │         Learn More →    │ │         Learn More →        │     │
│ └─────────────────────────┘ └─────────────────────────────┘     │
├─────────────────────────────────────────────────────────────────┤
│                           FOOTER                               │
│        © 2025 Cherry Lian | [GitHub] [LinkedIn] [Email]        │
└─────────────────────────────────────────────────────────────────┘
```

### Components Detail

**Navigation Bar (`Navbar.tsx`)**:
- Fixed header with responsive design
- Desktop: Horizontal navigation links
- Mobile: Hamburger menu with slide-out navigation
- Active page highlighting
- Smooth hover transitions

**Hero Section**:
- Left: Profile photo (`Cherry.jpg`) - circular crop with border
- Right: Professional tagline and introduction
- Two CTA buttons: "Download Resume" (primary) and "View Projects" (secondary)
- Subtle background animations

**Featured Projects Grid**:
- Data source: `resume.json` → projects array (first 2 items)
- Project cards with emoji placeholders (🤖, 🕷️)
- Technology tags from project.technologies array
- "Learn More" links to `/projects/[slug]`
- Responsive: 2 columns desktop, 1 column mobile

**Footer (`Footer.tsx`)**:
- Social media icons with external links
- Copyright notice
- Consistent across all pages

---

## 🗺️ Interactive Map Page (`/map`) - **FULLY IMPLEMENTED**

### Layout Structure (Two-Column Desktop)
```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVIGATION BAR                           │
│ Cherry Lian    [About] [Projects] [Publications] [Map*] [Contact]│
├─────────────────────────────────────────────────────────────────┤
│                      PAGE HEADER                               │
│                    Interactive Journey Map                      │
│               Explore Cherry's Academic & Professional Path     │
├─────────────────────────────────────────────────────────────────┤
│              FILTER CONTROLS                                   │
│ [All] [🎓 Education] [💼 Work] [📋 Conference] [✈️ Travel]      │
│                                                    4 locations  │
├─────────────────────────────────────────────────────────────────┤
│ MAP VIEW (66.67%)            │ TIMELINE PANEL (33.33%)          │
│                              │                                  │
│  ┌─────────────────────────┐ │ ┌─────────────────────────────┐  │
│  │                         │ │ │ 📅 Timeline Overview        │  │
│  │    🌍 MAPBOX MAP        │ │ │                             │  │
│  │                         │ │ │ ● 2025 Robotics Engineer   │⭐│
│  │  📍 San Diego (1)       │ │ │   Advanced Mechatronics     │  │
│  │                         │ │ │   Solutions, San Diego      │  │
│  │      📍 Atlanta (1)     │ │ │                             │  │
│  │                         │ │ │ ● 2024 MS Robotics         │  │
│  │                         │ │ │   Georgia Tech, Atlanta     │  │
│  │                         │ │ │                             │  │
│  │                         │ │ │ ● 2023 ML Engineer         │  │
│  │   📍 Toronto (1)        │ │ │   Huawei Canada, Markham   │  │
│  │                         │ │ │                             │  │
│  │       📍 Markham (1)    │ │ │ ● 2019 Bachelor's Degree   │  │
│  │                         │ │ │   University of Toronto    │  │
│  │                         │ │ │                             │  │
│  │   [Zoom Controls]       │ │ │                             │  │
│  └─────────────────────────┘ │ └─────────────────────────────┘  │
│                              │                                  │
└──────────────────────────────┴──────────────────────────────────┘
```

### Mobile Layout (Stacked)
```
┌─────────────────────────────────────┐
│         NAVIGATION BAR              │
├─────────────────────────────────────┤
│         PAGE HEADER                 │
│    Interactive Journey Map          │
├─────────────────────────────────────┤
│       FILTER CONTROLS               │
│ [All] [🎓] [💼] [📋] [✈️]           │
├─────────────────────────────────────┤
│                                     │
│        🌍 MAPBOX MAP                │
│                                     │
│     📍 Markers with counts          │
│                                     │
│      [Zoom Controls]                │
├─────────────────────────────────────┤
│       TIMELINE PANEL                │
│                                     │
│ ● 2025 Robotics Engineer           │
│   Advanced Mechatronics            │
│                                     │
│ ● 2024 MS Robotics                 │
│   Georgia Tech                      │
│                                     │
│ (Scrollable list)                   │
└─────────────────────────────────────┘
```

### Core Components Architecture

#### 1. **MapboxMap.tsx** - Core Map Engine
```typescript
// Features:
- Mapbox GL JS v3 integration via react-map-gl v8.0.4
- Global world map with performance optimizations
- Graceful token validation and error handling
- Responsive viewport management
- Max zoom: 10 for performance
- Custom map styling and controls

// Props Interface:
interface MapboxMapProps {
  locations: Location[]
  selectedLocation: Location | null
  hoveredLocation: Location | null
  onLocationSelect: (location: Location | null) => void
  onLocationHover: (location: Location | null) => void
  filteredType: FilterType
}
```

#### 2. **MarkerLayer.tsx** - Smart Marker System
```typescript
// Features:
- Color-coded markers by entry type:
  🎓 Education: #3B82F6 (blue)
  💼 Work: #10B981 (green) 
  📋 Conference: #F59E0B (orange)
  ✈️ Travel: #8B5CF6 (purple)
- Entry count badges on markers
- Hover effects and smooth transitions
- Click interactions for selection
- React.memo optimization for performance

// Marker States:
- Default: Small marker with count badge
- Hovered: Enlarged with glow effect
- Selected: Highlighted with distinct styling
- Filtered: Dimmed when not matching filter
```

#### 3. **LocationModal.tsx** - Rich Content Display
```typescript
// Features:
- Modal popup triggered by marker clicks
- Comprehensive location information display
- Photo gallery support (currently placeholders)
- External links with proper styling
- Achievement lists with bullet points
- Responsive modal sizing
- Close on backdrop click or ESC key

// Content Structure:
interface LocationEntry {
  id: string
  type: 'education' | 'work' | 'conference' | 'travel'
  institution: string
  role: string
  duration: string
  photos: string[]
  links: { label: string; url: string }[]
  achievements: string[]
}
```

#### 4. **TimelinePanel.tsx** - Chronological Navigation
```typescript
// Features:
- Chronological timeline sorted by start date (newest first)
- Two-way sync with map markers:
  • Click timeline → select map marker
  • Hover timeline → highlight map marker
- Entry type icons and color coding
- Smooth scrolling and animations
- Responsive design (collapses on mobile)
- React.memo optimization

// Timeline Item Structure:
┌─────────────────────────────────────┐
│ 🎓 2024-Present                    │⭐ Selected indicator
│ MS Robotics                         │
│ Georgia Tech, Atlanta               │
│ Duration: Aug 2024 - Present        │
│ ─────────────────────────────────── │
│ 💼 2022-2023                       │
│ ML Engineer                         │
│ Huawei Canada, Markham             │
└─────────────────────────────────────┘
```

#### 5. **MapContext.tsx** - State Management
```typescript
// Features:
- Centralized state management using useReducer
- Actions: SELECT_LOCATION, HOVER_LOCATION, SET_FILTER, LOAD_DATA
- Type-safe action dispatching
- Global state sharing across components
- Performance optimized with React.memo dependencies

// State Interface:
interface MapState {
  locations: Location[]
  selectedLocation: Location | null
  hoveredLocation: Location | null
  filteredType: FilterType
  isLoading: boolean
  error: string | null
}
```

### Interactive Features

#### Filter System
```
┌─────────────────────────────────────────────────────────────────┐
│ FILTER CONTROLS                                                 │
│ [All*] [🎓 Education] [💼 Work] [📋 Conference] [✈️ Travel]      │
│                                                    4 locations  │
└─────────────────────────────────────────────────────────────────┘

Filter Behavior:
- All: Shows all location types (default)
- Education: Shows only university/academic locations  
- Work: Shows only professional employment
- Conference: Shows only conference/event locations
- Travel: Shows only travel/personal locations
- Count updates dynamically based on filter
```

#### Bidirectional Sync System
```
MAP ←→ TIMELINE SYNCHRONIZATION

User Action               Map Response            Timeline Response
─────────────────────────────────────────────────────────────────
Click map marker    →     Select marker          Highlight timeline item
Click timeline item →     Select marker          Highlight timeline item  
Hover map marker    →     Show hover state       Highlight timeline item
Hover timeline item →     Highlight marker       Show hover state
Filter change       →     Show/hide markers      Filter timeline items
```

### Data Structure (GeoJSON Format)

#### Location Data Schema (map.json)
```json
{
  "locations": [
    {
      "city": "Toronto",
      "country": "Canada",
      "coordinates": [-79.3832, 43.6532], // [lng, lat] GeoJSON format
      "entries": [
        {
          "id": "uoft-undergrad",
          "type": "education",
          "institution": "University of Toronto",
          "role": "Bachelor of Applied Science",
          "duration": "Sep 2019 - Apr 2024",
          "startDate": "2019-09-01",
          "endDate": "2024-04-30",
          "photos": [], // Future: Array of photo URLs
          "links": [
            {
              "label": "University Website",
              "url": "https://utoronto.ca"
            }
          ],
          "achievements": [
            "Mechanical Engineering degree",
            "Focus on AI and Robotics",
            "Dean's List recognition"
          ]
        }
      ]
    }
  ]
}
```

#### TypeScript Interfaces (src/types/map.ts)
```typescript
export interface Location {
  city: string
  country: string
  coordinates: [number, number] // [lng, lat]
  entries: LocationEntry[]
}

export interface LocationEntry {
  id: string
  type: 'education' | 'work' | 'conference' | 'travel'
  institution: string
  role: string
  duration: string
  startDate: string
  endDate: string | null
  photos: string[]
  links: Array<{ label: string; url: string }>
  achievements: string[]
}

export type FilterType = 'all' | 'education' | 'work' | 'conference' | 'travel'
```

### Performance Optimizations

#### React Performance
```typescript
// Component memoization
export const MarkerLayer = React.memo(MarkerLayerComponent)
export const TimelinePanel = React.memo(TimelinePanelComponent)

// Callback memoization
const handleLocationSelect = useCallback((location: Location | null) => {
  dispatch({ type: 'SELECT_LOCATION', payload: location })
}, [dispatch])

// Expensive computation memoization  
const filteredLocations = useMemo(() => {
  return locations.filter(location => 
    filterType === 'all' || location.entries.some(entry => entry.type === filterType)
  )
}, [locations, filterType])
```

#### Bundle Optimization
- Dynamic imports for heavy components
- Tree shaking for unused Mapbox features
- Optimized bundle size: 22.2kB for map page
- Lazy loading for modal content

#### Mapbox Performance
- maxZoom: 10 to prevent excessive detail loading
- Optimized marker rendering cycles
- Efficient coordinate transformations
- Graceful degradation without token

### Error Handling & Validation

#### Mapbox Token Validation
```typescript
// Graceful handling of missing/invalid tokens
if (!mapboxToken) {
  return (
    <div className="map-error">
      <h3>Map Unavailable</h3>
      <p>Mapbox token not configured for development</p>
      <p>The interactive map will be available in production</p>
    </div>
  )
}
```

#### Data Validation (Zod Schemas)
```typescript
// Runtime type checking with Zod
const LocationSchema = z.object({
  city: z.string(),
  country: z.string(),
  coordinates: z.tuple([z.number(), z.number()]),
  entries: z.array(LocationEntrySchema)
})

export const validateMapData = (data: unknown): Location[] => {
  return LocationSchema.array().parse(data)
}
```

### Accessibility Features

#### Keyboard Navigation
- Tab navigation through timeline items
- Enter/Space to select timeline items
- Escape to close modal
- Focus management for modal open/close

#### Screen Reader Support
- ARIA labels for map markers
- Role attributes for interactive elements
- Alt text for images and icons
- Semantic HTML structure

#### Visual Accessibility
- High contrast marker colors
- Focus indicators on interactive elements
- Sufficient color contrast ratios
- Scalable text and icons

### Browser Compatibility

#### Supported Browsers
- Chrome 88+ (WebGL support required)
- Firefox 85+ (WebGL support required)
- Safari 14+ (WebGL support required)
- Edge 88+ (WebGL support required)

#### Progressive Enhancement
- Fallback error message for unsupported browsers
- Graceful degradation without JavaScript
- Mobile-responsive design for all screen sizes

---

## 🚀 Projects Section

### Projects Overview (`/projects`)

```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVIGATION BAR                           │
├─────────────────────────────────────────────────────────────────┤
│                      PROJECT FILTERS                           │
│ 🔍 [Search projects...] | Technology: [All ▼] [2 Projects]      │
├─────────────────────────────────────────────────────────────────┤
│                      PROJECT CARDS                             │
│ ┌─────────────────────────┐ ┌─────────────────────────────┐     │
│ │ 🤖                      │ │ 🕷️                          │     │
│ │ HINTeract Framework     │ │ SpooderMan Robot            │     │
│ │                         │ │                             │     │
│ │ Interactive robot       │ │ Autonomous person-following │     │
│ │ learning system with    │ │ robot using computer vision │     │
│ │ hint-guided feedback    │ │ and ROS2 architecture       │     │
│ │                         │ │                             │     │
│ │ [Python] [Robosuite]    │ │ [ROS2] [Python] [OpenCV]    │     │
│ │ [PyTorch] [ML]          │ │ [Computer Vision]           │     │
│ │                         │ │                             │     │
│ │ 2024 • Research Project │ │ 2023 • Personal Project     │     │
│ │         Learn More →    │ │         Learn More →        │     │
│ └─────────────────────────┘ └─────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

### Components Detail

**Filter System**:
- Real-time search input with debounced filtering
- Technology dropdown with all unique technologies from projects
- Project counter showing filtered results
- Clear filters functionality

**Project Cards**:
- Data source: `resume.json` → projects array
- Large emoji placeholders (🤖 for HINTeract, 🕷️ for SpooderMan)
- Project title, description, and year
- Technology tags with consistent styling
- "Learn More" links to dynamic detail pages

**Technical Implementation**:
- `useState` for search and filter state management
- `useMemo` for optimized filtering performance
- Responsive grid layout (2 columns desktop, 1 column mobile)
- Smooth hover animations and transitions

### Project Detail Pages (`/projects/[slug]`)

```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVIGATION BAR                           │
├─────────────────────────────────────────────────────────────────┤
│                      HERO BANNER                               │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │           🤖 HINTeract Framework                            │ │
│ │        Interactive Robot Learning System                   │ │
│ │    [Python] [Robosuite] [PyTorch] [Machine Learning]       │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                    PROJECT OVERVIEW                            │
│ 📋 Overview                                                     │
│ Advanced framework for interactive robot learning that enables  │
│ robots to learn complex manipulation tasks through hint-guided  │
│ feedback and reinforcement learning.                            │
│                                                                 │
│ ⭐ Key Features                                                  │
│ • Hint-guided learning with human feedback integration          │
│ • Real-time robot simulation in Robosuite environment          │
│ • Advanced neural network architectures with PyTorch           │
│ • Interactive learning interface for seamless human-robot      │
│                                                                 │
│ 🎯 Technical Challenges                                         │
│ • Balancing exploration vs exploitation in RL algorithms       │
│ • Implementing efficient hint incorporation mechanisms          │
│ • Ensuring stable training across different manipulation tasks │
│                                                                 │
│ 📊 Results & Impact                                             │
│ • 40% improvement in learning efficiency compared to baseline   │
│ • Successfully demonstrated on 5 different manipulation tasks  │
│ • Research paper in preparation for ICRA 2026 submission      │
├─────────────────────────────────────────────────────────────────┤
│                    LINKS & RESOURCES                           │
│ [🔗 GitHub Repository] [📄 Research Paper] [🎥 Demo Video]      │
└─────────────────────────────────────────────────────────────────┘
```

### Components Detail

**Hero Banner**:
- Project-specific gradient backgrounds
- Large emoji identifier
- Project title and subtitle
- Technology tags with consistent styling

**Project Content Sections**:
- **Overview**: Comprehensive project description
- **Key Features**: Bullet-pointed feature list with icons
- **Technical Challenges**: Development obstacles and solutions
- **Results & Impact**: Quantifiable outcomes and achievements

**Links Section**:
- Mock GitHub repository links
- Research paper references (when applicable)
- Demo video links (placeholder ready)
- External resource buttons with icons

**Technical Implementation**:
- Dynamic routing with `[slug]` parameter
- Data fetching from `resume.json` based on slug
- Custom 404 page for invalid project slugs
- SEO-optimized metadata for each project
- Smooth page transitions and animations

**Custom 404 Handling**:
```typescript
// Custom not-found.tsx for invalid project slugs
return (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1>Project Not Found</h1>
      <p>The project you're looking for doesn't exist.</p>
      <Link href="/projects">← Back to Projects</Link>
    </div>
  </div>
);
```

---

## 👩‍💼 About Page (`/about`)

### Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVIGATION BAR                           │
├─────────────────────────────────────────────────────────────────┤
│                      PERSONAL BIO                              │
│ Passionate robotics engineer and ML researcher with expertise   │
│ spanning autonomous systems, computer vision, and intelligent   │
│ robotics. Currently pursuing MS in Robotics at Georgia Tech.    │
│                                                                 │
│ [Download CV] [Email Me] [LinkedIn] [GitHub]                    │
├─────────────────────────────────────────────────────────────────┤
│                    EDUCATION & EXPERIENCE                      │
│                                                                 │
│ 2025 ────●── Robotics Engineer @ Advanced Mechatronics          │
│          │   Solutions, San Diego                              │
│          │   • Leading autonomous robotics projects            │
│          │                                                     │
│ 2024 ────●── MS Robotics @ Georgia Tech (4.0 GPA)              │
│          │   • Research in robot learning and HRI             │
│          │                                                     │
│ 2023 ────●── ML Engineer @ Huawei Canada                       │
│          │   • Published 3 research papers                    │
│          │   • Led ML solutions for network optimization      │
│          │                                                     │
│ 2019 ────●── B.A.Sc. Mechanical Engineering @ UofT            │
│              • Dean's List, robotics specialization           │
├─────────────────────────────────────────────────────────────────┤
│                      SKILLS MATRIX                             │
│ [Python] [ROS2] [PyTorch] [TensorFlow] [OpenCV] [SLAM]          │
│ [Computer Vision] [Machine Learning] [Deep Learning] [NLP]      │
│ [Robotic Manipulation] [Motion Planning] [Control Systems]     │
│ [Linux] [Git] [Docker] [AWS] [C++] [JavaScript] [MATLAB]       │
│ [SolidWorks] [Gazebo] [Robosuite] [Jupyter] [LaTeX]           │
└─────────────────────────────────────────────────────────────────┘
```

### Components Detail

**Personal Bio Section**:
- Introductory paragraph highlighting Cherry's expertise
- Contact action buttons with hover effects
- Download CV button links to `/assets/Yi_Lian_Resume.pdf`

**Interactive Timeline**:
- Data source: Combined `resume.json` → education + experience arrays
- Chronological sorting with visual markers:
  - 🎓 Education (blue markers)  
  - 💼 Work Experience (green markers)
- Each entry shows:
  - Institution/Company name
  - Role/Degree title
  - Duration
  - Key achievements (bullet points)
- Framer Motion staggered animations on scroll

**Skills Matrix**:
- Data source: `resume.json` → technical_skills array (26 skills)
- Interactive skill tags with hover effects
- Organized by categories (Programming, Robotics, ML/AI, Tools)
- Color-coded badges matching site theme
- Click functionality for future filtering enhancement

**Technical Implementation**:
- TypeScript interfaces for timeline and skills data
- `useMemo` optimization for timeline sorting
- Responsive breakpoints for mobile/tablet/desktop
- Smooth scroll animations with Framer Motion

---

## 📚 Publications Page (`/publications`)

### Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVIGATION BAR                           │
├─────────────────────────────────────────────────────────────────┤
│                    PUBLICATION FILTERS                         │
│ Filter by Year: [All ▼] | Type: [All ▼] | 3 Publications       │
├─────────────────────────────────────────────────────────────────┤
│                    PUBLICATIONS LIST                           │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [2025] 🏆 BEST PRESENTATION AWARD                           │ │
│ │ Implicit Behavioral Cues for Enhancing Trust and Comfort   │ │
│ │ in Robot Social Navigation                                  │ │
│ │ ICRA 2025 PTAS Workshop • Yi Lian, John Smith              │ │
│ │ [Conference] [Social Robotics] [DOI] [▼ Abstract]           │ │
│ │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │ │
│ │ This paper explores how implicit behavioral cues can        │ │
│ │ significantly enhance trust and comfort levels in human-    │ │
│ │ robot interactions during social navigation scenarios...    │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [2023] Toward Fair and Efficient Congestion Control        │ │
│ │ APNET '23 • Yi Lian, Jane Doe, Bob Wilson                  │ │
│ │ [Conference] [Networking] [DOI] [▼ Abstract]                │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [2023] OpenData: A Framework to Train and Deploy ML        │ │
│ │ Solutions in Wide-Area Networks                             │ │
│ │ IEEE Network • Yi Lian, Alice Johnson                      │ │
│ │ [Journal] [Machine Learning] [DOI] [▼ Abstract]             │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Components Detail

**Filter System**:
- Year-based filtering dropdown with all publication years
- Publication type filters (Conference, Journal, Workshop)
- Publication counter showing filtered results
- Clear filters functionality

**Publication Cards**:
- Data source: `publications.json` with complete metadata
- **Award Recognition**: Special 🏆 badge for Best Presentation Award
- **Author Highlighting**: "Yi Lian" appears in bold formatting
- **Color-coded Badges**:
  - Conference: Blue badges
  - Journal: Green badges  
  - Workshop: Purple badges
- **Expandable Abstracts**: Click to toggle full abstract display
- **DOI Links**: External links to official publications

**Publication Entry Structure**:
```typescript
interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: 'Conference' | 'Journal' | 'Workshop';
  doi?: string;
  abstract: string;
  tags: string[];
  award?: string; // For special recognition
}
```

**Interactive Features**:
- Smooth expand/collapse animations for abstracts
- Hover effects on publication cards
- External DOI link handling with proper icons
- Mobile-responsive layout with stacked information

**Technical Implementation**:
- `useState` for managing expanded abstracts
- `useMemo` for optimized filtering
- Framer Motion for smooth animations
- SEO-optimized metadata for academic indexing

---

## 📞 Contact Page (`/contact`)

### Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVIGATION BAR                           │
├─────────────────────────────────────────────────────────────────┤
│                      CONTACT HERO                              │
│                    Let's Connect!                              │
│         I'd love to hear about your next project              │
├─────────────────────────────────────────────────────────────────┤
│                   PRIMARY CONTACT                              │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 📧 Email Me                                                 │ │
│ │ cherry.lian@gatech.edu                                      │ │
│ │ I typically respond within 24 hours                        │ │
│ │                                [Send Email]                │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                   SOCIAL MEDIA                                │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│ │ 💼 LinkedIn     │ │ 🐙 GitHub       │ │ 🌐 Portfolio    │   │
│ │ Professional    │ │ Code & Projects │ │ Full Website    │   │
│ │ Network         │ │ Repository      │ │ Overview        │   │
│ │    [Connect]    │ │    [Follow]     │ │    [Visit]      │   │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                   QUICK ACTIONS                               │
│        [📄 Download Resume]  [👩‍💼 Learn About Me]                │
└─────────────────────────────────────────────────────────────────┘
```

### Components Detail

**Contact Hero Section**:
- Welcoming headline with professional tone
- Subtitle encouraging project discussions
- Consistent with site branding and theming

**Primary Contact Card**:
- **Email Address**: cherry.lian@gatech.edu (clickable mailto link)
- **Response Time**: Professional expectation setting
- **Send Email Button**: Pre-filled mailto with subject line
- **Mailto Template**: 
  ```
  mailto:cherry.lian@gatech.edu?subject=Project Inquiry&body=Hi Cherry,

  I'd like to discuss...
  ```

**Social Media Cards**:
- **LinkedIn Card**:
  - Professional networking focus
  - Link to LinkedIn profile
  - "Connect" CTA button
  
- **GitHub Card**:
  - Code repository showcase
  - Link to GitHub profile  
  - "Follow" CTA button
  
- **Portfolio Card**:
  - Website overview reference
  - Self-referential link to home page
  - "Visit" CTA button

**Quick Actions Section**:
- **Download Resume**: Direct link to `/assets/Yi_Lian_Resume.pdf`
- **Learn About Me**: Internal link to `/about` page
- Prominent button styling with hover effects

**Technical Implementation**:
- Pre-filled mailto links with professional templates
- External link handling with `target="_blank"` and `rel="noopener"`
- Hover animations on all interactive elements
- Responsive card layout for mobile devices
- Icon integration consistent with site design

**Email Template Structure**:
```typescript
const emailTemplate = {
  to: 'cherry.lian@gatech.edu',
  subject: 'Project Inquiry',
  body: `Hi Cherry,

I'd like to discuss a potential collaboration opportunity.

Project Details:
- 

Timeline:
- 

Budget Range:
- 

Looking forward to hearing from you!

Best regards,
[Your Name]`
};
```

---

## 🎨 Design System Specifications

### Color Palette
```css
:root {
  /* Primary Colors */
  --primary: #FFDCDC;      /* Soft pink - main brand color */
  --secondary: #FFF2EB;    /* Warm cream - secondary brand */
  --accent: #FFE8CD;       /* Light peach - accent elements */
  --highlight: #FFD6BA;    /* Warm beige - highlights */
  
  /* Map-specific Colors */
  --education: #3B82F6;    /* Blue - education markers */
  --work: #10B981;         /* Green - work markers */
  --conference: #F59E0B;   /* Orange - conference markers */
  --travel: #8B5CF6;       /* Purple - travel markers */
  
  /* Semantic Colors */
  --error: #EF4444;        /* Red - errors and warnings */
  --success: #10B981;      /* Green - success states */
  --warning: #F59E0B;      /* Orange - warning states */
  --info: #3B82F6;         /* Blue - info states */
}
```

### Typography Scale
```css
/* Font Families */
font-family: ui-sans-serif, system-ui, sans-serif;

/* Scale */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### Component Classes
```css
/* Card System */
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200 p-6;
}

.card-hover {
  @apply card transition-all duration-300 hover:shadow-md hover:-translate-y-1;
}

/* Button System */
.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors;
}

/* Map-specific Classes */
.map-marker {
  @apply w-4 h-4 rounded-full border-2 border-white shadow-md cursor-pointer transition-all;
}

.map-marker-selected {
  @apply ring-4 ring-blue-200 scale-125;
}

.timeline-item {
  @apply p-4 border-l-4 border-gray-200 hover:border-blue-400 transition-colors cursor-pointer;
}
```

### Responsive Breakpoints
```css
/* Tailwind CSS Breakpoints */
sm: '640px',   /* Small devices */
md: '768px',   /* Medium devices */
lg: '1024px',  /* Large devices */
xl: '1280px',  /* Extra large devices */
2xl: '1536px'  /* 2X Extra large devices */

/* Map-specific Responsive Behavior */
@media (max-width: 768px) {
  /* Stack map and timeline vertically */
  .map-container {
    flex-direction: column;
  }
  
  .map-view {
    width: 100%;
    height: 400px;
  }
  
  .timeline-panel {
    width: 100%;
    max-height: 300px;
    overflow-y: auto;
  }
}
```

---

## 🔧 Technical Implementation Notes

### Build System
- **Next.js 15.3.4** with App Router
- **TypeScript** strict mode enabled
- **ESLint** with custom rules
- **Tailwind CSS** with custom configuration
- **Vercel deployment** ready

### Performance Targets
- **Map page bundle**: 22.2kB (current)
- **First contentful paint**: < 1.5s
- **Largest contentful paint**: < 2.5s
- **Cumulative layout shift**: < 0.1

### Browser Support
- **Modern browsers** with WebGL support
- **Progressive enhancement** for older browsers
- **Mobile-first** responsive design
- **Accessibility** WCAG 2.1 AA compliance

---

**Last Updated**: January 2025  
**Status**: Interactive Map (Phases 1-2) Complete ✅  
**Next**: Phase 3 - Enhanced statistics and accessibility

